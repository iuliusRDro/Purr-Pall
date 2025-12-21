import React from "react";

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40 mix-blend-multiply">
      {/* 
        Simple SVG noise pattern for texture. 
        Using a data URI for performance and simplicity to avoid external asset dependency immediately.
      */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
