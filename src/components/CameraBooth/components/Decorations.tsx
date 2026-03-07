"use client";
import Image from "next/image";
import Magnet from "../../ui/Magnet";

export default function Decorations() {
  return (
    <>
      {/* Full-viewport cosmos background */}
      <div
        className="fixed inset-0 pointer-events-none z-1"
        style={{
          background:
            "linear-gradient(180deg, #000208 0%, #000614 40%, #010d26 70%, #020f30 100%)",
        }}
      />

      {/* background.jpg */}
      <div
        className="fixed inset-0 pointer-events-none z-2"
        style={{ opacity: 0.22 }}
      >
        <Image
          src="/parallax/background.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Back clouds */}
      <div
        className="fixed bottom-0 left-0 w-96 h-96 pointer-events-none z-3 opacity-30"
        style={{ transform: "translateX(-15%)" }}
      >
        <Image
          src="/parallax/Cloud Right 2 (Back) v2 2.png"
          alt=""
          fill
          className="object-contain object-bottom"
          sizes="384px"
        />
      </div>
      <div
        className="fixed bottom-0 right-0 w-96 h-96 pointer-events-none z-3 opacity-30"
        style={{ transform: "translateX(15%) scaleX(-1)" }}
      >
        <Image
          src="/parallax/Cloud Right 2 (Back) v2 5.png"
          alt=""
          fill
          className="object-contain object-bottom"
          sizes="384px"
        />
      </div>

      {/* Mid clouds */}
      <div
        className="fixed bottom-0 left-0 w-80 h-80 pointer-events-none z-4 opacity-50"
        style={{ transform: "translateX(-8%)" }}
      >
        <Image
          src="/parallax/Cloud Right 1 (Mid) 2.png"
          alt=""
          fill
          className="object-contain object-bottom"
          sizes="320px"
        />
      </div>
      <div
        className="fixed bottom-0 right-0 w-80 h-80 pointer-events-none z-4 opacity-50"
        style={{ transform: "translateX(8%) scaleX(-1)" }}
      >
        <Image
          src="/parallax/Cloud Right 1 (Mid) 2.png"
          alt=""
          fill
          className="object-contain object-bottom"
          sizes="320px"
        />
      </div>

      {/* Photobooth edge clouds — no hover */}
      {/* Left cloud */}
      <div className="fixed bottom-0 left-0 z-20 pointer-events-none">
        <div
          className="w-48 md:w-64 h-48 md:h-64 relative"
          style={{ transform: "translate(-10%, 5%)" }}
        >
          <Image
            src="/photobooth/photobooth-cloud-left-element.png"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 192px, 256px"
          />
        </div>
      </div>
      {/* Right cloud */}
      <div className="fixed bottom-0 right-0 z-20 pointer-events-none">
        <div className="w-48 md:w-64 h-48 md:h-64 relative">
          <Image
            src="/photobooth/photobooth-cloud-right-element.png"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 192px, 256px"
          />
        </div>
      </div>

      {/* Cirby mascot - top left with Magnet */}
      <div className="fixed top-0 left-0 z-20">
        <Magnet padding={80} magnetStrength={4}>
          <div
            className="w-32 md:w-44 h-48 md:h-64 relative opacity-80"
            style={{
              transform: "translate(-8%, 15%)",
              animation: "float 8s ease-in-out infinite",
            }}
          >
            <Image
              src="/photobooth/photobooth-cirby-element.png"
              alt=""
              fill
              className="object-contain object-top"
              sizes="(max-width: 768px) 128px, 176px"
            />
          </div>
        </Magnet>
      </div>

      {/* Sparky mascot - top right with Magnet */}
      <div className="fixed top-0 right-0 z-20">
        <Magnet padding={80} magnetStrength={4}>
          <div
            className="w-40 md:w-56 h-52 md:h-72 relative opacity-80"
            style={{
              transform: "translate(8%, 15%)",
              animation: "float 10s ease-in-out infinite 1s",
            }}
          >
            <Image
              src="/photobooth/photobooth-sparky-element.png"
              alt=""
              fill
              className="object-contain object-top"
              sizes="(max-width: 768px) 160px, 224px"
            />
          </div>
        </Magnet>
      </div>
    </>
  );
}

