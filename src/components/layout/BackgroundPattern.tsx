import React from "react";

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40 mix-blend-multiply">
      {/* 
        Simple SVG noise pattern for texture. 
        Moved from data URI to static asset for better caching and maintainability.
      */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: "url('/noise-pattern.svg')",
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
