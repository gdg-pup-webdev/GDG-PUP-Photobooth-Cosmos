"use client";

import { useRef } from "react";
import { motion, useInView, type Easing } from "framer-motion";
import { STATS } from "@/lib/constants";

export function FunFactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full px-6 md:px-16 py-24 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #031430 0%, #061c4a 50%, #0b2660 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(66,133,244,0.13) 0%, transparent 65%)",
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
            By the Numbers
          </p>
          <h2
            className="font-black text-white"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              letterSpacing: "0.02em",
              textShadow: "0 0 60px rgba(87,202,255,0.22)",
            }}
          >
            Fun Fact
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-3xl"
          style={{
            border: "1px solid rgba(87,202,255,0.14)",
            boxShadow: "0 8px 60px rgba(0,20,80,0.5)",
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 * i, ease: "easeOut" as Easing }}
              whileHover={{ background: "rgba(87,202,255,0.08)" }}
              className="flex flex-col gap-3 p-9 text-center"
              style={{
                background: "linear-gradient(180deg, rgba(11,38,96,0.9), rgba(6,28,74,0.95))",
                borderRight: i < 3 ? "1px solid rgba(87,202,255,0.10)" : undefined,
                borderBottom: "1px solid rgba(87,202,255,0.10)",
              }}
            >
              <p
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "#57CAFF",
                  textShadow: "0 0 40px rgba(87,202,255,0.5)",
                }}
              >
                {s.value}
              </p>
              <p
                className="font-bold uppercase text-white"
                style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}
              >
                {s.label}
              </p>
              <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: "rgba(180,210,255,0.52)" }}>
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
