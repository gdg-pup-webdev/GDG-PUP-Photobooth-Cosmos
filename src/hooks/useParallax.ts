"use client";

import { useEffect } from "react";
import { useMotionValue, useTransform, useScroll } from "framer-motion";

export function useParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use window scroll — gives the browser its normal scrollbar
  const { scrollY } = useScroll();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // Scroll Y transforms
  const sc2b2Y = useTransform(scrollY, [0, 800], [0, -55]);
  const sc1f1Y = useTransform(scrollY, [0, 800], [0, -90]);
  const sc1m2Y = useTransform(scrollY, [0, 800], [0, -120]);
  const sc2f5Y = useTransform(scrollY, [0, 800], [0, -170]);
  const scirbyY = useTransform(scrollY, [0, 800], [0, -75]);
  const ssparkyY = useTransform(scrollY, [0, 800], [0, -85]);

  // Mouse X/Y transforms — clouds
  const c2b2X = useTransform(mouseX, [-1, 1], [-10, 10]);
  const c2b2MY = useTransform(mouseY, [-1, 1], [-5, 5]);
  const c1f1X = useTransform(mouseX, [-1, 1], [-18, 18]);
  const c1f1MY = useTransform(mouseY, [-1, 1], [-9, 9]);
  const c1m2X = useTransform(mouseX, [-1, 1], [-26, 26]);
  const c1m2MY = useTransform(mouseY, [-1, 1], [-13, 13]);
  const c2f5X = useTransform(mouseX, [-1, 1], [-36, 36]);
  const c2f5MY = useTransform(mouseY, [-1, 1], [-18, 18]);

  // Mouse X/Y transforms — mascots
  const cirbyX = useTransform(mouseX, [-1, 1], [-14, 14]);
  const cirbyMY = useTransform(mouseY, [-1, 1], [-7, 7]);
  const sparkyX = useTransform(mouseX, [-1, 1], [-16, 16]);
  const sparkyMY = useTransform(mouseY, [-1, 1], [-9, 9]);

  return {
    sc2b2Y, sc1f1Y, sc1m2Y, sc2f5Y, scirbyY, ssparkyY,
    c2b2X, c2b2MY,
    c1f1X, c1f1MY,
    c1m2X, c1m2MY,
    c2f5X, c2f5MY,
    cirbyX, cirbyMY,
    sparkyX, sparkyMY,
  };
}
