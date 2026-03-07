"use client";

import { STARS, SHOOTING_STARS } from "@/lib/constants";

export function Starfield() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundColor: "#000614",
        backgroundImage:
          "linear-gradient(180deg, rgba(0,20,80,0.15) 0%, rgba(0,40,130,0.55) 100%)",
      }}
    >
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.5); }
        }
        @keyframes shootingStar {
          0%   { transform: translateX(0) translateY(0); opacity: 0; width: 0px; }
          8%   { opacity: 0.9; }
          100% { transform: translateX(-420px) translateY(86px); opacity: 0; width: 130px; }
        }
        @keyframes horizonPulse {
          0%, 100% { opacity: 0.18; }
          50%       { opacity: 0.42; }
        }
      `}</style>

      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      {SHOOTING_STARS.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            top: s.top,
            right: "6%",
            height: "1px",
            width: 0,
            background:
              "linear-gradient(to left, transparent 0%, rgba(255,255,255,0.85) 100%)",
            animation: `shootingStar ${s.duration} ease-in ${s.delay} infinite`,
          }}
        />
      ))}

      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: "60%",
          height: "26%",
          background:
            "radial-gradient(ellipse 90% 50% at 50% 50%, rgba(0,220,255,0.20) 0%, transparent 100%)",
          animation: "horizonPulse 7s ease-in-out infinite",
        }}
      />
    </div>
  );
}
