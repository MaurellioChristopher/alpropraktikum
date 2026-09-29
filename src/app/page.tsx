"use client";

import { useState } from "react";
import Image from "next/image";
import { EdmLogo } from "@/components/aureo/edm-logo";
import { TechBackground } from "@/components/aureo/tech-background";
import { AlgorithmVisualizer } from "@/components/aureo/algorithm-visualizer";
import { LoginForm } from "@/components/aureo/login-console";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Trophy, Info, X, ExternalLink, Code2, Database, Network, ArrowRight } from "lucide-react";

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
    <main className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden relative bg-[#F8FAFC] text-slate-900 flex flex-col justify-between selection:bg-rose-600 selection:text-white">
      {/* Background Micro-Circuitry & Ambient Particles (Dynamic moving elements) */}
      <TechBackground />

      {/* Ambient Ethereal Radial Lights for High-End Depth */}
      <div className="absolute top-[15%] left-[5%] w-[38vw] h-[38vw] rounded-full bg-gradient-to-tr from-purple-200/35 via-rose-100/25 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[42vw] h-[42vw] rounded-full bg-gradient-to-bl from-rose-200/30 via-indigo-100/25 to-transparent blur-[140px] pointer-events-none" />

      {/* TOP NAVBAR - Floating Island Pill Architecture */}
      <header className="relative z-30 w-full max-w-5xl mx-auto px-4 pt-3 sm:pt-4 shrink-0">
        <div className="mx-auto px-5 sm:px-6 py-2.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(25,10,45,0.06)] flex items-center justify-between transition-all">
          <EdmLogo className="h-6 sm:h-7" />

          {/* Right Navigation */}
          <nav className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => setActiveModal("modul")}
                className="text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-[#9E1B32] transition-colors cursor-pointer"
              >
                Modul
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("tentang")}
                className="text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-[#9E1B32] transition-colors cursor-pointer"
              >
                Tentang
              </button>
            </div>

            {/* Quick Login Pill Button */}
            <a
              href="#login-section"
              className="bg-gradient-to-r from-[#9E1B32] via-[#7B1238] to-[#250B47] hover:from-[#B51E3A] hover:via-[#8E1542] hover:to-[#38106A] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Masuk</span>
            </a>
          </nav>
        </div>
      </header>

      {/* HERO & MAIN INTERACTIVE SECTION - Fits cleanly in 1 viewport */}
      <section className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-1.5 sm:py-2.5 flex-1 min-h-0 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Fluid Typography, Tactile CTAs, and Visualizer */}
          <div className="lg:col-span-7 flex flex-col space-y-3 sm:space-y-3.5">
            
            {/* Headlines */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-rose-200/70 shadow-[0_2px_12px_rgba(158,27,50,0.06)] text-[10px] sm:text-[11px] font-mono font-bold text-[#9E1B32] backdrop-blur-md w-fit">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                SISTEM OPERASIONAL INTERNAL LABORATORIUM
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-black tracking-tight text-[#0F172A] leading-[1.12]">
                SELAMAT DATANG,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9E1B32] via-[#6B21A8] to-[#1E1B4B]">
                  ASISTEN PRAKTIKUM
                </span>
                <br />
                <span className="text-[#0F172A]">ALGORITMA & PEMROGRAMAN.</span>
              </h1>

              <p className="text-slate-600 text-xs sm:text-[13px] font-normal max-w-lg leading-relaxed">
                Portal operasional internal laboratorium untuk manajemen praktikum, input penilaian live, rekap presensi kehadiran, dan sinkronisasi shift 15 kelas S1 Sistem Informasi Angkatan 2026 (SI&apos;50).
              </p>

              {/* Minimalist Meta Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[10px] font-mono">
                <span className="bg-white/80 backdrop-blur-md text-slate-700 font-semibold px-2.5 py-0.5 rounded-lg border border-slate-200/70 shadow-2xs">
                  Telkom University
                </span>
                <span className="bg-purple-50/80 backdrop-blur-md text-purple-900 font-bold px-2.5 py-0.5 rounded-lg border border-purple-200/70 shadow-2xs">
                  Angkatan 2026 (SI&apos;50)
                </span>
                <span className="bg-rose-50/80 backdrop-blur-md text-[#9E1B32] font-bold px-2.5 py-0.5 rounded-lg border border-rose-200/70 shadow-2xs">
                  15 Kelas Aktif
                </span>
              </div>
            </div>

            {/* Primary Action Buttons — Button-in-Button Trailing Icon Architecture */}
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <button
                type="button"
                onClick={() => setActiveModal("modul")}
                className="rounded-full pl-5 pr-2 py-2 bg-gradient-to-r from-[#1A0B36] to-[#2E1256] hover:from-[#250E4C] hover:to-[#3B1770] text-white font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(30,10,60,0.3)] transition-all active:scale-95 flex items-center gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen size={14} />
                  <span>Silabus Modul</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:scale-105 shrink-0">
                  <ArrowRight size={13} />
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("tentang")}
                className="rounded-full px-5 py-2.5 bg-white/80 hover:bg-white text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-200/80 shadow-2xs backdrop-blur-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Info size={14} className="text-[#9E1B32]" />
                <span>Tentang Lab</span>
              </button>
            </div>

            {/* Dynamic Visualizer Canvas (Interactive Moving Particle & Graph Network) */}
            <div className="pt-0.5">
              <AlgorithmVisualizer />
            </div>
          </div>

          {/* RIGHT COLUMN: Floating Authentication Console (Double-Bezel & Balanced) */}
          <div id="login-section" className="lg:col-span-5 flex justify-center lg:justify-end">
            <LoginForm />
          </div>

        </div>
      </section>

      {/* FOOTER STRIP - Minimalist & Compact */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-2.5 sm:py-3 border-t border-slate-200/70 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Server: EDM-CORE-01 (ACTIVE)</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Telkom University</span>
        </div>
        <div className="flex items-center gap-2.5 text-[11px]">
          <div className="relative h-4 w-5 shrink-0">
            <Image
              src="/images/edm-emblem-crimson.png"
              alt="EDM Logo"
              fill
              sizes="20px"
              className="object-contain"
            />
          </div>
          <span>Algoritma & Pemrograman 2026</span>
          <span>•</span>
          <span className="text-slate-600 font-semibold">EDM Laboratory</span>
        </div>
      </footer>

      {/* MODAL POPUPS FOR MODUL & TENTANG */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>

              {/* MODUL VIEW */}
              {activeModal === "modul" && (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-rose-50 text-[#9E1B32]">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Silabus & Modul Praktikum</h2>
                      <p className="text-xs text-slate-500 font-mono">Algoritma & Pemrograman (CS202)</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-6 mt-3 leading-relaxed">
                    Kurikulum praktikum dirancang untuk memperkuat pemahaman mendalam tentang struktur data linier, hierarki, dan optimasi algoritma komputasi tingkat tinggi.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {modules.map((m) => (
                      <div
                        key={m.no}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all flex items-start gap-3"
                      >
                        <span className="font-mono text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                          {m.no}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 leading-snug">{m.title}</h4>
                          <span className="text-[10px] font-mono text-slate-400 mt-1 inline-block">
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
                      <h2 className="text-xl font-bold text-slate-900">Laboratorium EDM</h2>
                      <p className="text-xs text-slate-500 font-mono">Enterprise Data Management Laboratory</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                    <p>
                      <strong>Enterprise Data Management (EDM) Laboratory</strong> merupakan laboratorium keahlian di Telkom University yang melayani praktikum <strong>Algoritma & Pemrograman</strong> untuk program studi <strong>S1 Sistem Informasi Angkatan 2026 (SI&apos;50)</strong> yang mencakup 15 kelas aktif: <strong>SI5001 s.d. SI5014</strong> dan <strong>SI50INT (International Class)</strong>.
                    </p>
                    <p>
                      Portal ini merupakan sistem terpadu operasi laboratorium untuk manajemen praktikum, penilaian live, pemantauan logistik hardware & software, serta koordinasi asisten praktikum.
                    </p>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div><strong>Institusi:</strong> S1 Sistem Informasi • Telkom University</div>
                      <div><strong>Lokasi:</strong> Gedung Laboratorium Terpadu Lantai 3, Telkom University</div>
                      <div><strong>Kelas Aktif:</strong> 15 Kelas (SI5001 s.d. SI5014 & SI50INT)</div>
                      <div><strong>Koordinator Asisten:</strong> GWAN, IZIN, LEVI</div>
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
