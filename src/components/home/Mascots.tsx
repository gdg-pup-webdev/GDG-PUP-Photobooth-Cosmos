"use client";

import { motion, type Easing } from "framer-motion";
import Image from "next/image";
import Magnet from "@/components/ui/Magnet";

export function Mascots() {
  return (
    <>
      {/* Cirby — left side */}
      <div
        className="absolute"
        style={{ zIndex: 55, left: "4%", bottom: "52%", width: "clamp(130px, 17vw, 280px)" }}
      >
        <Magnet magnetStrength={2} padding={80} wrapperClassName="w-full">
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as Easing }}
          >
            <Image
              src="/parallax/Cirby.png"
              alt="Cirby"
              width={600}
              height={800}
              className="w-full h-auto pointer-events-none"
            />
          </motion.div>
        </Magnet>
      </div>

      {/* Sparky — right side */}
      <div
        className="absolute"
        style={{ zIndex: 55, right: "4%", bottom: "32%", width: "clamp(130px, 17vw, 280px)" }}
      >
        <Magnet magnetStrength={2} padding={80} wrapperClassName="w-full">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as Easing, delay: 1.5 }}
          >
            <Image
              src="/parallax/Sparky.png"
              alt="Sparky"
              width={300}
              height={400}
              className="w-full h-auto pointer-events-none"
            />
          </motion.div>
        </Magnet>
      </div>
    </>
  );
}
