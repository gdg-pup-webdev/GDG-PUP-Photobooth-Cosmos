"use client";

import Image from "next/image";
import { motion, type Easing } from "framer-motion";
import { ShinyButton } from "@/components/ui/ShinyButton";

export function Navbar() {
  return (
    <motion.nav
      className="absolute top-0 inset-x-0 flex items-center justify-between px-6 md:px-12 py-5"
      style={{ zIndex: 60 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" as Easing }}
    >
      <div className="flex items-center gap-3">
        {/* <Image
          src="/parallax/test logo 1.png"
          alt="GDG PUP Cosmos"
          width={42}
          height={42}
          className="h-10 w-auto"
        /> */}
        <span className="text-white/75 font-semibold text-xs tracking-widest hidden sm:block uppercase">
          GDG on Campus PUP
        </span>
      </div>
      <ShinyButton href="/photobooth">Open Booth</ShinyButton>
    </motion.nav>
  );
}
