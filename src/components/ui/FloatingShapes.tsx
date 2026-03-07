"use client";

import React, { useState, useEffect } from "react";
import { colors } from "./GDGColors";

// Twinkling star SVG
const CosmicStar = ({ size, color, style }: { size: number; color: string; style: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style} className="absolute">
    <path d="M12 2L13.5 9H21L15 13.5L17.5 21L12 16.5L6.5 21L9 13.5L3 9H10.5L12 2Z" />
  </svg>
);

export default function FloatingShapes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  const starParticles = [...Array(40)].map(() => ({
    delay: Math.random() * 12,
    duration: 6 + Math.random() * 8,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    opacity: 0.4 + Math.random() * 0.5,
  }));

  const cosmicStars = [...Array(10)].map(() => ({
    size: Math.random() * 16 + 8,
    opacity: 0.25 + Math.random() * 0.3,
    top: Math.random() * 100,
    left: Math.random() * 100,
    twinkleDuration: 2 + Math.random() * 3,
    delay: Math.random() * 3,
  }));

  const starColors = [colors.cyan, colors.blue, colors.white];

  const glowDots = [...Array(14)].map((_, i) => ({
    width: 3 + Math.random() * 5,
    height: 3 + Math.random() * 5,
    colorIdx: i % 3,
    opacity: 0.4 + Math.random() * 0.4,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 1.5 + Math.random() * 2.5,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style jsx>{`
        @keyframes cosmicDrift {
          0%   { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.7; }
          90%  { opacity: 0.7; }
          100% { transform: translateY(100vh) translateX(15px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* Drifting star particles */}
      {starParticles.map((p, i) => (
        <div
          key={`sp-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: -8,
            opacity: p.opacity,
            animation: `cosmicDrift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Nebula glow orbs */}
      <div
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colors.cyan}25, transparent)`,
          top: "-8%",
          right: "-5%",
          animation: "float 10s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute w-56 h-56 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colors.blue}30, transparent)`,
          bottom: "5%",
          left: "-5%",
          animation: "float 8s ease-in-out infinite reverse",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute w-40 h-40 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(168,85,247,0.18), transparent)`,
          top: "45%",
          right: "10%",
          animation: "float 7s ease-in-out infinite",
          filter: "blur(32px)",
        }}
      />

      {/* Twinkling star shapes */}
      {cosmicStars.map((s, i) => (
        <CosmicStar
          key={`cs-${i}`}
          size={s.size}
          color={starColors[i % 3]}
          style={{
            opacity: s.opacity,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animation: `twinkle ${s.twinkleDuration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Small twinkling glow dots */}
      {glowDots.map((dot, i) => (
        <div
          key={`gd-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${dot.width}px`,
            height: `${dot.height}px`,
            background: starColors[dot.colorIdx],
            opacity: dot.opacity,
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            animation: `twinkle ${dot.duration}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
            boxShadow: `0 0 ${dot.width * 3}px ${starColors[dot.colorIdx]}80`,
          }}
        />
      ))}
    </div>
  );
}
