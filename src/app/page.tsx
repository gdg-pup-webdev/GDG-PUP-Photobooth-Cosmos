"use client";

import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import { Starfield } from "@/components/home/Starfield";
import { CloudLayers } from "@/components/home/CloudLayers";
import { Mascots } from "@/components/home/Mascots";
import { Navbar } from "@/components/home/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PhotoGallerySection } from "@/components/home/PhotoGallerySection";
import { FunFactSection } from "@/components/home/FunFactSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  const parallax = useParallax();

  return (
    <div className="relative overflow-x-hidden">
      <Starfield />

      <main className="relative w-full">
        {/* ── Hero viewport ── */}
        <div className="relative w-full" style={{ height: "100vh" }}>
          {/* Background atmosphere image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
            <Image
              src="/parallax/background.jpg"
              alt=""
              fill
              className="object-cover"
              style={{ opacity: 0.28 }}
              priority
            />
          </div>

          {/* Bottom bleed — feathers hero into sections below */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              zIndex: 58,
              height: "22vh",
              background: "linear-gradient(to bottom, transparent 0%, #000614 100%)",
            }}
          />

          <CloudLayers
            c2f5X={parallax.c2f5X}
            sc2b2Y={parallax.sc2b2Y}
            c2f5MY={parallax.c2f5MY}
            c2b2X={parallax.c2b2X}
            sc1f1Y={parallax.sc1f1Y}
            c2b2MY={parallax.c2b2MY}
            c1m2X={parallax.c1m2X}
            sc1m2Y={parallax.sc1m2Y}
            c1m2MY={parallax.c1m2MY}
            c1f1X={parallax.c1f1X}
            sc2f5Y={parallax.sc2f5Y}
            c1f1MY={parallax.c1f1MY}
          />

          <Mascots />

          <Navbar />
          <HeroSection />
        </div>

        {/* ── Below-hero sections ── */}
        <div className="relative w-full" style={{ zIndex: 50 }}>
          <HowItWorksSection />
          <PhotoGallerySection />
          <FunFactSection />
          <CtaSection />

          <footer
            className="relative text-center py-6 border-t w-full"
            style={{
              borderColor: "rgba(87,202,255,0.12)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              color: "rgba(180,210,255,0.32)",
              background: "#000614",
            }}
          >
            &copy; 2026 GDG ON CAMPUS PUP
          </footer>
        </div>
      </main>
    </div>
  );
}
