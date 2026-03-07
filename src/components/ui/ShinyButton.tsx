"use client";

import React from "react";
import Link from "next/link";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 } as MotionProps["initial"],
  animate: { "--x": "-100%", scale: 1 } as MotionProps["animate"],
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop" as const,
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} satisfies MotionProps;

const shinyBase =
  "relative cursor-pointer rounded-full border px-8 py-3 font-semibold backdrop-blur-xl transition-shadow duration-300 ease-in-out";

function ShinyContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="relative block size-full text-sm tracking-[0.2em] text-white font-semibold uppercase"
        style={{
          maskImage:
            "linear-gradient(-75deg, var(--primary) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--primary) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          backgroundImage:
            "linear-gradient(-75deg, rgba(87,202,255,0.1) calc(var(--x)+20%), rgba(87,202,255,0.5) calc(var(--x)+25%), rgba(87,202,255,0.1) calc(var(--x)+100%))",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] p-px"
      />
    </>
  );
}

const cosmosStyle = {
  "--primary": "#57caff",
  borderColor: "rgba(87,202,255,0.3)",
  background:
    "radial-gradient(circle at 50% 0%, rgba(87,202,255,0.12) 0%, transparent 60%)",
} as React.CSSProperties;

interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode;
  className?: string;
  /** When provided, renders inside a Next.js Link */
  href?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, href, ...props }, ref) => {
    if (href) {
      return (
        <Link href={href}>
          <motion.span
            className={cn(
              shinyBase,
              "inline-flex items-center justify-center hover:shadow-[0_0_24px_rgba(87,202,255,0.28)]",
              className
            )}
            style={cosmosStyle}
            {...animationProps}
          >
            <ShinyContent>{children}</ShinyContent>
          </motion.span>
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          shinyBase,
          "hover:shadow-[0_0_24px_rgba(87,202,255,0.28)]",
          className
        )}
        style={cosmosStyle}
        {...animationProps}
        {...(props as MotionProps)}
      >
        <ShinyContent>{children}</ShinyContent>
      </motion.button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";
