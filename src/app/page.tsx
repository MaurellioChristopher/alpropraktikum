"use client";

import { useState } from "react";
import Image from "next/image";
import { EdmLogo } from "@/components/aureo/edm-logo";
import { TechBackground } from "@/components/aureo/tech-background";
import { AlgorithmVisualizer } from "@/components/aureo/algorithm-visualizer";
import { LoginForm } from "@/components/aureo/login-console";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Trophy, Info, X, ExternalLink, Code2, Database, Network, ArrowRight } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [activeModal, setActiveModal] = useState<"modul" | "tentang" | null>(null);

  const modules = [
    { no: "01", title: "Pointer, Pointer Arithmetics & Memory Layout", icon: Code2, diff: "Fundamental" },
    { no: "02", title: "Singly & Doubly Linked List Implementation", icon: Network, diff: "Intermediate" },
    { no: "03", title: "Stack & Queue: Buffer Management & Simulation", icon: Database, diff: "Intermediate" },
    { no: "04", title: "Binary Search Tree (BST) & Self-Balancing AVL", icon: Network, diff: "Advanced" },
    { no: "05", title: "Graph Representations & Traversal (BFS & DFS)", icon: Network, diff: "Advanced" },
    { no: "06", title: "Divide & Conquer: QuickSort & MergeSort O(n log n)", icon: Code2, diff: "Advanced" },
    { no: "07", title: "Hash Table, Collision Resolution & Map Structures", icon: Database, diff: "Advanced" },
    { no: "08", title: "Final Practicum Project & Big Data Engine Challenge", icon: Trophy, diff: "Mastery" },
  ];

  return (
    <main className="h-screen max-h-screen overflow-hidden relative bg-white dark:bg-[#06020E] text-slate-900 dark:text-white flex flex-col justify-between selection:bg-purple-600 selection:text-white transition-colors duration-300">
      {/* Background Micro-Circuitry & Ambient Particles (Dynamic moving elements) */}
      <TechBackground />

      {/* Ambient Ethereal Radial Lights for High-End Depth */}
      <div className="absolute top-[15%] left-[5%] w-[38vw] h-[38vw] rounded-full bg-gradient-to-tr from-purple-300/25 via-purple-100/20 to-transparent dark:from-purple-900/25 dark:via-purple-950/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[42vw] h-[42vw] rounded-full bg-gradient-to-bl from-purple-200/25 via-purple-50/15 to-transparent dark:from-purple-900/20 dark:via-purple-950/10 blur-[140px] pointer-events-none" />

      {/* TOP NAVBAR - Floating Island Pill Architecture */}
      <header className="relative z-30 w-full max-w-5xl mx-auto px-4 pt-2.5 sm:pt-3 pb-1 shrink-0">
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden mx-auto px-5 sm:px-6 py-2 rounded-full bg-white/85 dark:bg-[#0E0820]/90 backdrop-blur-xl border border-purple-100 dark:border-purple-900/50 shadow-[0_8px_32px_rgba(25,10,45,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-between transition-all"
        >
          {/* Subtle Nav Sheen */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-purple-400/10 dark:via-purple-400/5 to-transparent transform -skew-x-20 animate-shimmer" />
          </div>

          <EdmLogo className="h-5.5 sm:h-6 relative z-10" />

          {/* Right Navigation with Theme Toggle */}
          <nav className="flex items-center gap-4 sm:gap-6 relative z-10">
            <button
              type="button"
              onClick={() => setActiveModal("modul")}
              className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer"
            >
              Modul
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("tentang")}
              className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer"
            >
              Tentang
            </button>

            {/* Dark / Light Mode Switcher */}
            <div className="border-l border-purple-200 dark:border-purple-900/60 pl-3 sm:pl-4">
              <ThemeToggle />
            </div>
          </nav>
        </motion.div>
      </header>

      {/* HERO & MAIN INTERACTIVE SECTION - Fits cleanly in 1 viewport with optimal spacing */}
      <section className="relative z-20 w-full max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-10 py-1 sm:py-2 flex-1 min-h-0 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Fluid Typography, Tactile CTAs, and Visualizer */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            
            {/* Headlines with Animated Gradient */}
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2.5"
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] xl:text-[2.4rem] font-black tracking-tight leading-[1.08]">
                <span className="text-slate-900 dark:text-white">SELAMAT DATANG,</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-500 to-purple-800 dark:from-purple-400 dark:via-purple-200 dark:to-white animate-gradient-flow inline-block">
                  ASISTEN PRAKTIKUM
                </span>
                <br />
                <span className="text-slate-900 dark:text-white">ALGORITMA & PEMROGRAMAN.</span>
              </h1>

              {/* Minimalist Meta Chips with Soft Hover Lift (White / Purple / Black) */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[10px] font-mono">
                <motion.span 
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-white/90 dark:bg-[#0E0820] text-slate-800 dark:text-slate-200 font-semibold px-2 py-0.5 rounded-lg border border-purple-200/70 dark:border-purple-900/60 shadow-2xs flex items-center gap-1.5 cursor-default transition-shadow hover:shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Telkom University
                </motion.span>
                <motion.span 
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-purple-50/90 dark:bg-purple-950/70 text-purple-900 dark:text-purple-200 font-bold px-2 py-0.5 rounded-lg border border-purple-200 dark:border-purple-850 shadow-2xs flex items-center gap-1.5 cursor-default transition-shadow hover:shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                  Angkatan 2026 (SI&apos;50)
                </motion.span>
                <motion.span 
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-purple-900 text-white dark:bg-purple-900/90 font-bold px-2 py-0.5 rounded-lg border border-purple-700 shadow-2xs flex items-center gap-1.5 cursor-default transition-shadow hover:shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse" />
                  15 Kelas Aktif
                </motion.span>
                <motion.span 
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-slate-100/90 dark:bg-black/60 text-slate-700 dark:text-slate-300 font-semibold px-2 py-0.5 rounded-lg border border-slate-300/70 dark:border-purple-900/40 shadow-2xs flex items-center gap-1.5 cursor-default transition-shadow hover:shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Lab Terpadu Lt. 3
                </motion.span>
              </div>
            </motion.div>

            {/* Primary Action Buttons — Button-in-Button Trailing Icon Architecture */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2.5 pt-0.5"
            >
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                type="button"
                onClick={() => setActiveModal("modul")}
                className="relative overflow-hidden rounded-full pl-4.5 pr-1.5 py-1.5 bg-gradient-to-r from-[#200A3E] via-[#3B0764] to-[#581C87] hover:from-[#2B0E54] hover:to-[#6B21A8] text-white font-bold text-xs uppercase tracking-wider shadow-[0_12px_28px_-6px_rgba(88,28,135,0.45)] hover:shadow-[0_16px_36px_-6px_rgba(88,28,135,0.55)] transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                {/* Button specular sheen */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-20 animate-shimmer" />
                </div>
                <div className="relative z-10 flex items-center gap-2">
                  <BookOpen size={13} className="text-purple-300" />
                  <span>Silabus Modul</span>
                </div>
                <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:scale-105 shrink-0">
                  <ArrowRight size={12} />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                type="button"
                onClick={() => setActiveModal("tentang")}
                className="rounded-full px-4.5 py-2 bg-white dark:bg-[#0E0820] hover:bg-purple-50/50 dark:hover:bg-purple-950/40 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider border border-purple-200 dark:border-purple-800/80 shadow-2xs hover:shadow-xs backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer hover:border-purple-400 dark:hover:border-purple-600"
              >
                <Info size={13} className="text-purple-600 dark:text-purple-400" />
                <span>Tentang Lab EDM</span>
              </motion.button>
            </motion.div>

            {/* Dynamic Visualizer Canvas (Interactive Moving Particle & Graph Network) */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="pt-0.5"
            >
              <AlgorithmVisualizer />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Floating Authentication Console (Double-Bezel & Balanced) */}
          <div id="login-section" className="lg:col-span-5 flex justify-center lg:justify-end">
            <LoginForm />
          </div>

        </div>
      </section>

      {/* FOOTER STRIP - Minimalist & Compact */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-1.5 sm:py-2 border-t border-purple-100 dark:border-purple-950/60 shrink-0 flex items-center justify-between text-[10.5px] font-mono text-slate-500 dark:text-slate-400">
        <span className="text-slate-400 dark:text-slate-500">Enterprise Data Management</span>
        <div className="flex items-center gap-2.5 text-[10.5px]">
          <div className="relative h-3.5 w-4.5 shrink-0">
            <Image
              src="/images/edm-emblem-crimson.png"
              alt="EDM Logo"
              fill
              sizes="18px"
              className="object-contain"
            />
          </div>
          <span>Algoritma & Pemrograman 2026</span>
          <span>•</span>
          <span className="text-purple-700 dark:text-purple-300 font-semibold">EDM Laboratory</span>
        </div>
      </footer>

      {/* MODAL POPUPS FOR MODUL & TENTANG */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white dark:bg-[#0D071E] rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-900/70 max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto"
            >
              {/* Distinctive Red Close Button X as requested */}
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer group"
                title="Tutup"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-200 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400" />
              </button>

              {/* MODUL VIEW */}
              {activeModal === "modul" && (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Silabus & Modul Praktikum</h2>
                      <p className="text-xs text-purple-600 dark:text-purple-300 font-mono">Algoritma & Pemrograman (CS202)</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 mt-3 leading-relaxed">
                    Kurikulum praktikum dirancang untuk memperkuat pemahaman mendalam tentang struktur data linier, hierarki, dan optimasi algoritma komputasi tingkat tinggi.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {modules.map((m) => (
                      <div
                        key={m.no}
                        className="p-3.5 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/40 dark:bg-[#150D2E]/60 hover:bg-white dark:hover:bg-[#1A1038] hover:shadow-md transition-all flex items-start gap-3"
                      >
                        <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/60 px-2 py-0.5 rounded">
                          {m.no}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">{m.title}</h4>
                          <span className="text-[10px] font-mono text-purple-600/70 dark:text-purple-300/70 mt-1 inline-block">
                            Tingkat: {m.diff}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TENTANG VIEW */}
              {activeModal === "tentang" && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative h-10 w-12 shrink-0">
                      <Image
                        src="/images/edm-emblem-crimson.png"
                        alt="EDM Laboratory Logo"
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Laboratorium EDM</h2>
                      <p className="text-xs text-purple-600 dark:text-purple-300 font-mono">Enterprise Data Management Laboratory</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                      <strong>Enterprise Data Management (EDM) Laboratory</strong> merupakan laboratorium keahlian di Telkom University yang melayani praktikum <strong>Algoritma & Pemrograman</strong> untuk program studi <strong>S1 Sistem Informasi Angkatan 2026 (SI&apos;50)</strong> yang mencakup 15 kelas aktif: <strong>SI5001 s.d. SI5014</strong> dan <strong>SI50INT (International Class)</strong>.
                    </p>
                    <p>
                      Portal ini merupakan sistem terpadu operasi laboratorium untuk manajemen praktikum, penilaian live, pemantauan logistik hardware & software, serta koordinasi asisten praktikum.
                    </p>
                    <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-[#140C2C] border border-purple-200/70 dark:border-purple-900/60 text-xs space-y-1">
                      <div><strong className="text-slate-700 dark:text-slate-200">Institusi:</strong> S1 Sistem Informasi • Telkom University</div>
                      <div><strong className="text-slate-700 dark:text-slate-200">Lokasi:</strong> Gedung Laboratorium Terpadu Lantai 3, Telkom University</div>
                      <div><strong className="text-slate-700 dark:text-slate-200">Kelas Aktif:</strong> 15 Kelas (SI5001 s.d. SI5014 & SI50INT)</div>
                      <div><strong className="text-slate-700 dark:text-slate-200">Koordinator Asisten:</strong> GWAN, IZIN, LEVI</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
