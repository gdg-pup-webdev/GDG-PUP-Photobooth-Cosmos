"use client";

import React, { useRef } from "react";

interface GlareHoverProps {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  /** Degrees of 3-D tilt on mouse-move */
  tiltDegrees?: number;
  className?: string;
  style?: React.CSSProperties;
}

const GlareHover: React.FC<GlareHoverProps> = ({
  width = "500px",
  height = "500px",
  background = "#000",
  borderRadius = "10px",
  borderColor = "#333",
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  tiltDegrees = 12,
  className = "",
  style = {},
}) => {
  // Convert hex glare colour to rgba
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width: w, height: h } = el.getBoundingClientRect();
    const x = (e.clientX - left) / w - 0.5;
    const y = -((e.clientY - top) / h - 0.5);
    el.style.transform = `perspective(700px) rotateX(${y * tiltDegrees}deg) rotateY(${x * tiltDegrees}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseEnter = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.backgroundPosition = "-100% -100%, 0 0";
    // Force reflow so the transition-none takes effect before re-enabling
    requestAnimationFrame(() => {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = "100% 100%, 0 0";
    });
  };

  const handleMouseLeave = () => {
    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (overlay) {
      if (playOnce) {
        overlay.style.transition = "none";
        overlay.style.backgroundPosition = "-100% -100%, 0 0";
      } else {
        overlay.style.transition = `${transitionDuration}ms ease`;
        overlay.style.backgroundPosition = "-100% -100%, 0 0";
      }
    }
    if (card) {
      card.style.transform =
        "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      card.style.transition = "transform 0.5s ease-in-out";
    }
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 10,
    background: `linear-gradient(${glareAngle}deg,
      hsla(0,0%,0%,0) 60%,
      ${rgba} 70%,
      hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100% -100%, 0 0",
    pointerEvents: "none",
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden border cursor-pointer ${className}`}
      style={{ width, height, background, borderRadius, borderColor, ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  );
};

export default GlareHover;
