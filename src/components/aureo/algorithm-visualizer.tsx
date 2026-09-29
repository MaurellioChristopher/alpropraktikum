"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";

export function AlgorithmVisualizer() {
  const [activeStep, setActiveStep] = useState(2);
  const [isSimulating, setIsSimulating] = useState(true);

  // Left input nodes
  const leftNodes = [
    { id: "L1", val: 10, y: 15 },
    { id: "L2", val: 25, y: 29 },
    { id: "L3", val: 44, y: 44, highlight: true },
    { id: "L4", val: 15, y: 58 },
    { id: "L5", val: 50, y: 72 },
    { id: "L6", val: 35, y: 86 },
  ];

  // Middle layer nodes
  const midNodesTop = [
    { id: "M1", val: 10, y: 12 },
    { id: "M2", val: 22, y: 20 },
    { id: "M3", val: 76, y: 28 },
    { id: "M4", val: 29, y: 36 },
    { id: "M5", val: 87, y: 44 },
    { id: "M6", val: 81, y: 52 },
    { id: "M7", val: 83, y: 60 },
  ];

  const midNodesBottom = [
    { id: "M8", val: 19, y: 68 },
    { id: "M9", val: 26, y: 74 },
    { id: "M10", val: 37, y: 80 },
    { id: "M11", val: 38, y: 86 },
    { id: "M12", val: 59, y: 91 },
    { id: "M13", val: 90, y: 95 },
    { id: "M14", val: 83, y: 99 },
  ];

  // Right cluster target nodes
  const rightClusters = [
    { id: "R1", label: "TK08", y: 35, color: "#BE123C" },
    { id: "R2", label: "2008", y: 65, color: "#7C3AED" },
  ];

  // Auto-pulse simulation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-xl lg:max-w-[620px] select-none group">
      {/* Glow aura under the card */}
      <div className="absolute -inset-3.5 bg-gradient-to-r from-purple-600/30 via-rose-600/25 to-indigo-600/25 rounded-[2.2rem] blur-xl opacity-65 group-hover:opacity-90 transition-opacity pointer-events-none" />

      {/* Double Bezel Outer Shell with Frosted Rim */}
      <div className="relative z-10 rounded-[1.85rem] p-1.5 bg-gradient-to-b from-white/40 via-white/15 to-white/10 backdrop-blur-2xl border border-white/40 shadow-[0_20px_45px_-12px_rgba(20,5,35,0.22)]">
        <div className="bg-[#0C081D]/95 text-white rounded-[1.55rem] p-3.5 sm:p-4.5 border border-purple-500/25 space-y-2.5">
          
          {/* Card Header Bar - Minimalist & Alive */}
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <h3 className="font-sans font-bold text-xs sm:text-[13px] tracking-wider text-slate-200 uppercase whitespace-nowrap">
                Simulasi Algoritma & Flow Data
              </h3>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/70 px-2 py-0.5 rounded-md border border-purple-800/40 shrink-0">
                O(n log n)
              </span>
            </div>

            {/* Step Progress & Interactive Toggle */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <span>Step</span>
                <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"
                    animate={{ width: `${(activeStep / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-purple-300 font-semibold">{activeStep}/3</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev >= 3 ? 1 : prev + 1))}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-[10px] font-mono transition-colors cursor-pointer active:scale-95"
                title="Next Step"
              >
                <RotateCcw size={10} />
                <span>Next</span>
              </button>
            </div>
          </div>

          {/* Visualizer Canvas Area: Bipartite Bezier Network (Larger & Taller) */}
          <div className="relative w-full h-[140px] sm:h-[155px] bg-[#070510]/95 rounded-2xl border border-white/5 overflow-hidden p-2.5">
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 480 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E11D48" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#A855F7" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="curveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9E1B32" stopOpacity="0.75" />
                  <stop offset="70%" stopColor="#C084FC" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#BE123C" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Connecting Bezier Ribbons from Left to Middle */}
              {leftNodes.map((ln) => {
                const startX = 55;
                const startY = (ln.y / 100) * 240;
                return midNodesTop.slice(0, 4).map((mn) => {
                  const endX = 220;
                  const endY = (mn.y / 100) * 240;
                  const cp1X = startX + 70;
                  const cp1Y = startY;
                  const cp2X = endX - 70;
                  const cp2Y = endY;
                  const isPrimary = ln.id === "L3";

                  return (
                    <path
                      key={`conn-${ln.id}-${mn.id}`}
                      d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                      fill="none"
                      stroke={isPrimary ? "url(#curveGrad1)" : "rgba(168, 85, 247, 0.15)"}
                      strokeWidth={isPrimary ? 2 : 0.9}
                      className="transition-all duration-700"
                    />
                  );
                });
              })}

              {/* Connecting Bezier Ribbons from Left to Middle Bottom */}
              {leftNodes.slice(2).map((ln) => {
                const startX = 55;
                const startY = (ln.y / 100) * 240;
                return midNodesBottom.slice(0, 4).map((mn) => {
                  const endX = 220;
                  const endY = (mn.y / 100) * 240;
                  const cp1X = startX + 70;
                  const cp1Y = startY;
                  const cp2X = endX - 70;
                  const cp2Y = endY;
                  return (
                    <path
                      key={`conn-bot-${ln.id}-${mn.id}`}
                      d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                      fill="none"
                      stroke="rgba(225, 29, 72, 0.18)"
                      strokeWidth={0.9}
                    />
                  );
                });
              })}

              {/* Connecting Ribbons from Mid to Right Clusters (TK08 and 2008) */}
              {midNodesTop.map((mn) => {
                const startX = 230;
                const startY = (mn.y / 100) * 240;
                const endX = 390;
                const endY = 85; // TK08
                return (
                  <path
                    key={`mid-tk-${mn.id}`}
                    d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${endX - 60} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke="rgba(192, 132, 252, 0.25)"
                    strokeWidth={1}
                  />
                );
              })}

              {midNodesBottom.map((mn) => {
                const startX = 230;
                const startY = (mn.y / 100) * 240;
                const endX = 390;
                const endY = 160; // 2008
                return (
                  <path
                    key={`mid-2008-${mn.id}`}
                    d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${endX - 60} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke="rgba(225, 29, 72, 0.3)"
                    strokeWidth={1}
                  />
                );
              })}

              {/* Animated Pulses flowing continuously into TK08 and 2008 */}
              <motion.circle
                r="3"
                fill="#E11D48"
                animate={{
                  cx: [55, 135, 225, 390],
                  cy: [105, 105, 75, 85],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                r="3"
                fill="#C084FC"
                animate={{
                  cx: [55, 140, 225, 390],
                  cy: [105, 120, 190, 160],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              />
              <motion.circle
                r="2.5"
                fill="#38BDF8"
                animate={{
                  cx: [55, 140, 225, 390],
                  cy: [40, 60, 130, 85],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
              />
            </svg>

            {/* Left Column Nodes */}
            <div className="absolute left-3 sm:left-4 top-2 bottom-2 flex flex-col justify-between py-1 z-10">
              {leftNodes.map((n) => (
                <div key={n.id} className="flex items-center gap-2 group cursor-pointer">
                  <span className={`text-[10px] sm:text-xs font-mono w-4 text-right transition-colors ${n.highlight ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                    {n.val}
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full transition-transform ${n.highlight ? 'bg-rose-500 ring-4 ring-rose-500/35 scale-125' : 'bg-slate-700 group-hover:bg-slate-500'}`} />
                </div>
              ))}
            </div>

            {/* Middle Column Nodes */}
            <div className="absolute left-[44%] sm:left-[46%] top-2 bottom-2 flex flex-col justify-between py-1 z-10 pointer-events-none">
              <div className="flex flex-col gap-1">
                {midNodesTop.slice(0, 5).map((m) => (
                  <span key={m.id} className="text-[10px] font-mono text-purple-300/80">
                    {m.val}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {midNodesBottom.slice(0, 5).map((m) => (
                  <span key={m.id} className="text-[10px] font-mono text-rose-300/80">
                    {m.val}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Clusters: TK08 & 2008 with Animated Ripple Rings */}
            <div className="absolute right-4 sm:right-6 top-0 bottom-0 flex flex-col justify-around z-10">
              {rightClusters.map((c) => (
                <motion.div
                  key={c.id}
                  whileHover={{ scale: 1.1 }}
                  className="relative flex items-center gap-2 group cursor-pointer"
                >
                  {/* Radar Ripple Ping Animation */}
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-40 pointer-events-none"
                    style={{ backgroundColor: c.color }}
                  />
                  <div 
                    className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-bold font-mono text-white shadow-lg"
                    style={{
                      backgroundColor: c.color,
                      boxShadow: `0 0 20px ${c.color}70`,
                    }}
                  >
                    {c.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Micro Telemetry Bar at Card Bottom */}
          <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Telemetry: 15 Kelas SI&apos;50 Connected</span>
            </div>
            <span className="text-purple-300/90 font-medium">Sync: Real-Time</span>
          </div>

        </div>
      </div>
    </div>
  );
}
