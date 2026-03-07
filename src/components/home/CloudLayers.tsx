"use client";

import { motion, type MotionValue } from "framer-motion";
import Image from "next/image";

interface CloudLayersProps {
  c2f5X: MotionValue<number>;
  sc2b2Y: MotionValue<number>;
  c2f5MY: MotionValue<number>;
  c2b2X: MotionValue<number>;
  sc1f1Y: MotionValue<number>;
  c2b2MY: MotionValue<number>;
  c1m2X: MotionValue<number>;
  sc1m2Y: MotionValue<number>;
  c1m2MY: MotionValue<number>;
  c1f1X: MotionValue<number>;
  sc2f5Y: MotionValue<number>;
  c1f1MY: MotionValue<number>;
}

export function CloudLayers({
  c2f5X, sc2b2Y, c2f5MY,
  c2b2X, sc1f1Y, c2b2MY,
  c1m2X, sc1m2Y, c1m2MY,
  c1f1X, sc2f5Y, c1f1MY,
}: CloudLayersProps) {
  return (
    <>
      {/* z-10: Back v2 5 — small, bottom-left */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        style={{ left: "-5%", bottom: "29%", width: "28%", x: c2f5X, y: sc2b2Y }}
      >
        <motion.div style={{ y: c2f5MY }}>
          <Image src="/parallax/Cloud Right 2 (Back) v2 5.png" alt="" width={950} height={550} className="w-full h-auto" priority />
        </motion.div>
      </motion.div>

      {/* z-20: Back v2 2 — right edge */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ right: "-5%", bottom: "8%", width: "30%", x: c2b2X, y: sc1f1Y }}
      >
        <motion.div style={{ y: c2b2MY }}>
          <Image src="/parallax/Cloud Right 2 (Back) v2 2.png" alt="" width={950} height={550} className="w-full h-auto" priority />
        </motion.div>
      </motion.div>

      {/* z-50: Mid 2 — centre-left */}
      <motion.div
        className="absolute z-50 pointer-events-none"
        style={{ right: "62%", bottom: "-5%", width: "50%", x: c1m2X, y: sc1m2Y }}
      >
        <motion.div style={{ y: c1m2MY }}>
          <Image src="/parallax/Cloud Right 1 (Mid) 2.png" alt="" width={950} height={550} className="w-full h-auto" priority />
        </motion.div>
      </motion.div>

      {/* z-40: Front 1 — left edge */}
      <motion.div
        className="absolute z-40 pointer-events-none"
        style={{ left: "-2%", bottom: "5%", width: "58%", x: c1f1X, y: sc2f5Y }}
      >
        <motion.div style={{ y: c1f1MY }}>
          <Image src="/parallax/Cloud Right 1 (Front) 1.png" alt="" width={950} height={550} className="w-full h-auto" priority />
        </motion.div>
      </motion.div>
    </>
  );
}
