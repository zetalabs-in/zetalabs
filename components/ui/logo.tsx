"use client";

import React from "react";

interface LogoProps {
  variant?: "text" | "tagline" | "full";
  className?: string;
  glow?: boolean;
}

export function Logo({ variant = "full", className = "", glow = false }: LogoProps) {
  // Bounding box calculations from a 1024x1024 base image:
  // 1. variant = "text" (logo text "zetalabs" only)
  //    Target: x = [159, 869] (width 710px), y = [448, 569] (height 122px)
  //    Aspect ratio = 710 / 122 = 5.8196
  // 2. variant = "tagline" (green tagline text only)
  //    Target: x = [160, 867] (width 707px), y = [639, 663] (height 24px)
  //    Aspect ratio = 707 / 24 = 29.458
  // 3. variant = "full" (logo + tagline together)
  //    Target: x = [159, 869] (width 710px), y = [448, 663] (height 215px)
  //    Aspect ratio = 710 / 215 = 3.2977

  const config = {
    text: {
      aspectRatio: "710/122",
      width: "144.225%",
      height: "839.344%",
      left: "-22.394%",
      top: "-367.213%",
      alt: "ZetaLabs Logo Text",
    },
    tagline: {
      aspectRatio: "707/24",
      width: "144.837%",
      height: "4266.667%",
      left: "-22.631%",
      top: "-2662.5%",
      alt: "ZetaLabs Tagline",
    },
    full: {
      aspectRatio: "710/215",
      width: "144.225%",
      height: "476.279%",
      left: "-22.394%",
      top: "-208.372%",
      alt: "ZetaLabs Logo and Tagline",
    },
  }[variant];

  return (
    <div
      className={`relative overflow-hidden select-none ${className} ${
        glow && variant === "tagline"
          ? "drop-shadow-[0_0_8px_#00ff66]"
          : glow
          ? "drop-shadow-[0_0_12px_rgba(0,245,255,0.4)]"
          : ""
      }`}
      style={{ width: "100%", aspectRatio: config.aspectRatio }}
    >
      <img
        src="/logo.png"
        alt={config.alt}
        className="absolute max-w-none pointer-events-none"
        style={{
          width: config.width,
          height: config.height,
          left: config.left,
          top: config.top,
          imageRendering: "pixelated", // Maintain sharp glitch pixels
        }}
      />
    </div>
  );
}
