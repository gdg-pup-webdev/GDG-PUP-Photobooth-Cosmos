"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Easing } from "framer-motion";
import GlareHover from "@/components/ui/GlareHover";

const GALLERY = [1, 2, 3, 4, 5, 6, 7, 8];

export function PhotoGallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full px-6 md:px-16 py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020d28 0%, #031430 100%)" }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          right: "-5%",
          width: "55vw",
          height: "55vh",
          background:
            "radial-gradient(ellipse at center, rgba(66,133,244,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" as Easing }}
        >
          <p
            className="uppercase font-semibold mb-3"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#57CAFF" }}
          >
            Highlights
          </p>
          <h2
            className="font-black text-white"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              letterSpacing: "0.02em",
              textShadow: "0 0 60px rgba(87,202,255,0.22)",
            }}
          >
            Photo Gallery
          </h2>
          <p
            className="mt-4 mx-auto"
            style={{
              maxWidth: "38ch",
              fontSize: "0.88rem",
              lineHeight: 1.9,
              color: "rgba(180,210,255,0.52)",
            }}
          >
            Moments captured at GDG — every frame a memory.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY.map((n, i) => (
            <motion.div
              key={n}
              className="rounded-2xl overflow-hidden"
              style={{ aspectRatio: "2 / 3" }}
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.07 * i, ease: "easeOut" as Easing }}
            >
              <GlareHover
                width="100%"
                height="100%"
                background="transparent"
                borderRadius="0"
                borderColor="rgba(87,202,255,0.08)"
                glareColor="#87D3FF"
                glareOpacity={0.35}
                glareAngle={-45}
                glareSize={280}
                tiltDegrees={10}
              >
                <div className="absolute inset-0">
                  <Image
                    src={`/sample/sample${n}.webp`}
                    alt={`Sample photo ${n}`}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,6,20,0.55) 0%, transparent 55%)",
                    }}
                  />
                </div>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
