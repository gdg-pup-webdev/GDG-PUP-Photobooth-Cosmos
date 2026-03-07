"use client";

import { useRef } from "react";
import { motion, useInView, type Easing } from "framer-motion";
import { STEPS } from "@/lib/constants";

export function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full px-6 md:px-16 py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000614 0%, #020d28 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 30%, rgba(87,202,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" as Easing }}
        >
          <p
            className="uppercase font-semibold mb-3"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#57CAFF" }}
          >
            GDG on Campus PUP
          </p>
          <h2
            className="font-black text-white"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              letterSpacing: "0.02em",
              textShadow: "0 0 60px rgba(87,202,255,0.25)",
            }}
          >
            How It Works
          </h2>
          <p
            className="mt-4 mx-auto"
            style={{
              maxWidth: "44ch",
              fontSize: "0.88rem",
              lineHeight: 1.9,
              color: "rgba(180,210,255,0.58)",
            }}
          >
            From filter to download in under a minute — here&apos;s what happens inside the booth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 48 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.16 * i, ease: "easeOut" as Easing }}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 12px 56px rgba(0,30,100,0.6), 0 0 0 1px rgba(87,202,255,0.25)",
              }}
              className="flex flex-col gap-5 rounded-3xl p-8"
              style={{
                background:
                  "linear-gradient(145deg, rgba(87,202,255,0.07), rgba(66,133,244,0.04))",
                border: "1px solid rgba(87,202,255,0.14)",
                boxShadow:
                  "0 4px 40px rgba(0,20,80,0.45), inset 0 1px 0 rgba(87,202,255,0.08)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-black shrink-0"
                style={{
                  background: "linear-gradient(135deg, #4285F4, #57CAFF)",
                  color: "#fff",
                  fontSize: "0.82rem",
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 20px rgba(66,133,244,0.5)",
                }}
              >
                {s.number}
              </div>
              <div>
                <p style={{ fontSize: "1.8rem", lineHeight: 1, marginBottom: "0.5rem" }}>{s.icon}</p>
                <p className="font-bold text-white" style={{ fontSize: "1.08rem" }}>
                  {s.title}
                </p>
              </div>
              <p style={{ fontSize: "0.83rem", lineHeight: 1.8, color: "rgba(180,210,255,0.58)" }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
