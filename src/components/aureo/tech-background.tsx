"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";

export function TechBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate dot matrix grid wave coordinates for particle field with deterministic rounding
  const dots = useMemo(() => {
    const list = [];
    const rows = 14;
    const cols = 28;
    const round = (n: number) => Math.round(n * 100) / 100;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // sinusoidal wave elevation
        const wave = Math.sin((c / cols) * Math.PI * 2.5) * Math.cos((r / rows) * Math.PI);
        const x = round((c / cols) * 100);
        const y = round(30 + (r / rows) * 60 + wave * 8);
        const size = round(Math.max(1, 2.5 + wave * 1.8) * 0.16);
        const opacity = round(Math.max(0.08, 0.45 + wave * 0.35));
        const isHighlight = (r * cols + c) % 17 === 0;
        list.push({ id: `${r}-${c}`, x, y, size, opacity, isHighlight });
      }
    }
    return list;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Soft Ambient Floating Animated Radial Lights (Ethereal Aurora Drift) */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[5%] w-[48vw] h-[48vw] rounded-full bg-gradient-to-br from-purple-300/30 via-rose-200/25 to-transparent blur-[130px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 25, -20, 0],
          scale: [1, 1.15, 0.92, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[25%] -right-[8%] w-[58vw] h-[58vw] rounded-full bg-gradient-to-bl from-rose-300/25 via-purple-200/25 to-indigo-200/20 blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, 20, -15, 0],
          y: [0, 20, -25, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -bottom-[15%] left-[25%] w-[42vw] h-[42vw] rounded-full bg-gradient-to-tr from-indigo-200/30 via-rose-100/20 to-transparent blur-[120px]"
      />

      {/* SVG PCB Circuit Micro-traces (Right-side signature matching reference) */}
      <svg
        className="absolute top-0 right-0 w-[55vw] h-full min-w-[500px] opacity-50 overflow-visible"
        viewBox="0 0 800 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9E1B32" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#7C3AED" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="pulseDotGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
          <linearGradient id="pulseDotGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>

        {/* Traces originating from right side */}
        <g stroke="url(#traceGrad)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          {/* Main bus 1 */}
          <path d="M 800 240 L 640 240 L 580 300 L 420 300 L 360 360 L 220 360 L 180 400 L 60 400" />
          {/* Main bus 2 */}
          <path d="M 800 280 L 680 280 L 620 340 L 490 340 L 440 390 L 320 390 L 280 430 L 140 430" />
          {/* Branch 3 */}
          <path d="M 800 360 L 720 360 L 670 410 L 560 410 L 510 460 L 400 460 L 360 500 L 250 500" />
          {/* Branch 4 */}
          <path d="M 800 480 L 740 480 L 700 520 L 580 520 L 540 560 L 420 560 L 380 600 L 290 600" />
          {/* Secondary lower branches */}
          <path d="M 800 580 L 710 580 L 660 630 L 530 630 L 490 670 L 390 670" />
          <path d="M 800 660 L 750 660 L 710 700 L 600 700 L 560 740 L 480 740" />

          {/* Vertical drops and interconnects */}
          <path d="M 580 300 L 580 360 L 550 390" strokeDasharray="3 3" opacity="0.6" />
          <path d="M 420 300 L 420 220 L 380 180" />
          <path d="M 490 340 L 490 280 L 450 240" />
          <path d="M 320 390 L 320 330 L 280 290" />
        </g>

        {/* Via Pads */}
        {[
          { cx: 60, cy: 400 },
          { cx: 140, cy: 430 },
          { cx: 250, cy: 500 },
          { cx: 290, cy: 600 },
          { cx: 390, cy: 670 },
          { cx: 480, cy: 740 },
          { cx: 380, cy: 180 },
          { cx: 450, cy: 240 },
          { cx: 280, cy: 290 },
          { cx: 420, cy: 300 },
          { cx: 580, cy: 300 },
          { cx: 440, cy: 390 },
          { cx: 560, cy: 410 },
        ].map((via, i) => (
          <g key={i}>
            <circle cx={via.cx} cy={via.cy} r="4" fill="#FFFFFF" stroke="#9E1B32" strokeWidth="1.5" />
            <circle cx={via.cx} cy={via.cy} r="1.5" fill="#9E1B32" />
          </g>
        ))}

        {/* Animated Data Packets / Pulses traveling through traces (Multiple Waves) */}
        <motion.circle
          r="3.5"
          fill="url(#pulseDotGrad1)"
          initial={{ cx: 800, cy: 240, opacity: 0 }}
          animate={{
            cx: [800, 640, 580, 420, 360, 220, 180, 60],
            cy: [240, 240, 300, 300, 360, 360, 400, 400],
            opacity: [0, 1, 1, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />

        <motion.circle
          r="3"
          fill="url(#pulseDotGrad2)"
          initial={{ cx: 800, cy: 280, opacity: 0 }}
          animate={{
            cx: [800, 680, 620, 490, 440, 320, 280, 140],
            cy: [280, 280, 340, 340, 390, 390, 430, 430],
            opacity: [0, 1, 1, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8,
          }}
        />

        <motion.circle
          r="3.5"
          fill="url(#pulseDotGrad1)"
          initial={{ cx: 800, cy: 360, opacity: 0 }}
          animate={{
            cx: [800, 720, 670, 560, 510, 400, 360, 250],
            cy: [360, 360, 410, 410, 460, 460, 500, 500],
            opacity: [0, 1, 1, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.2,
          }}
        />

        <motion.circle
          r="3"
          fill="url(#pulseDotGrad2)"
          initial={{ cx: 800, cy: 480, opacity: 0 }}
          animate={{
            cx: [800, 740, 700, 580, 540, 420, 380, 290],
            cy: [480, 480, 520, 520, 560, 560, 600, 600],
            opacity: [0, 1, 1, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: 6.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4.5,
          }}
        />
      </svg>

      {/* Dynamic Particle Wave Field (SVG Sine Matrix matching reference style) */}
      <svg
        className="absolute top-1/4 -left-1/4 w-[150vw] h-[70vh] opacity-40 overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="dotGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4C1D95" stopOpacity="0.2" />
            <stop offset="35%" stopColor="#9E1B32" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#6366F1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {mounted &&
          dots.map((d) => (
            <circle
              key={d.id}
              cx={d.x}
              cy={d.y}
              r={d.size}
              fill={d.isHighlight ? "#9E1B32" : "url(#dotGrad)"}
              opacity={d.opacity}
            />
          ))}
      </svg>

      {/* Subtle Grid Lines Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#1E293B 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
