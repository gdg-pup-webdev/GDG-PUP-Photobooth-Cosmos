"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Easing } from "framer-motion";
import { sr } from "@/lib/constants";

export function CtaSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            className="relative w-full px-6 md:px-16 overflow-hidden"
            style={{
                paddingTop: "8rem",
                paddingBottom: "9rem",
                background:
                    "linear-gradient(180deg, #0b2660 0%, #1a56a8 28%, #4285F4 56%, #57CAFF 80%, #b8e4ff 100%)",
            }}
        >
            {/* Scattered stars */}
            <div className="absolute inset-x-0 top-0 h-48 pointer-events-none overflow-hidden">
                {[...Array(18)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${(sr(i * 31 + 7) * 90 + 5).toFixed(1)}%`,
                            top: `${(sr(i * 13 + 2) * 80 + 5).toFixed(1)}%`,
                            width: sr(i * 5 + 1) > 0.7 ? 2 : 1,
                            height: sr(i * 5 + 1) > 0.7 ? 2 : 1,
                            opacity: parseFloat((0.3 + sr(i * 17) * 0.5).toFixed(2)),
                        }}
                    />
                ))}
            </div>

            {/* Radial glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: "8%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60vw",
                    height: "60vh",
                    background:
                        "radial-gradient(ellipse at center, rgba(255,255,255,0.10) 0%, transparent 65%)",
                }}
            />

            {/* Bottom fade */}
            <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                    height: "40%",
                    background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.75))",
                }}
            />

            <div className="relative max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" as Easing }}
                >
                    <p
                        className="uppercase font-semibold mb-4"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.85)" }}
                    >
                        GDG on Campus PUP
                    </p>
                    <h2
                        className="font-black text-white mb-5"
                        style={{
                            fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
                            lineHeight: 1.08,
                            textShadow: "0 0 80px rgba(255,255,255,0.22)",
                        }}
                    >
                        Ready to Strike
                        <br />a Pose?
                    </h2>
                    <p
                        className="mb-10 mx-auto"
                        style={{
                            maxWidth: "40ch",
                            fontSize: "0.92rem",
                            lineHeight: 1.9,
                            color: "rgba(255,255,255,0.72)",
                        }}
                    >
                        Jump into the booth and create your perfect photo strip.
                        <br />
                        It only takes a minute!
                    </p>
                    <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} className="inline-block">
                        <Link
                            href="/photobooth"
                            className="inline-flex items-center gap-3 font-bold uppercase"
                            style={{
                                padding: "1rem 3rem",
                                borderRadius: 250,
                                fontSize: "0.84rem",
                                letterSpacing: "0.18em",
                                color: "#ffffff",
                                background: "#000614",
                                border: "1.5px solid rgba(255,255,255,0.22)",
                                boxShadow: "0 8px 40px rgba(0,20,80,0.45), inset 0 1px 0 rgba(255,255,255,0.10)",
                            }}
                        >
                            Start Photo Booth &rarr;
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
