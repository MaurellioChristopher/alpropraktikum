"use client";

import { useState } from "react";
import Image from "next/image";
import { LoginForm } from "@/components/aureo/login-console";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "motion/react";
import {
  Code2,
  Database,
  Network,
  Trophy,
  BookOpen,
  Info,
  X,
  Sparkles,
  MapPin,
  Users,
  ShieldCheck,
} from "lucide-react";

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
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F7F6FD] dark:bg-[#070312] text-slate-900 dark:text-white font-sans selection:bg-purple-600 selection:text-white transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* LEFT COLUMN: FULLSCREEN BRAND HERO WITH OFFICIAL ARTWORK      */}
      {/* ============================================================ */}
      <section className="lg:w-[57%] xl:w-[60%] min-h-screen lg:h-screen flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 relative overflow-hidden bg-gradient-to-br from-[#F5F1FF] via-[#EDE7FD] to-[#DFD5FC] dark:from-[#17092F] dark:via-[#110523] dark:to-[#080213] border-b lg:border-b-0 lg:border-r border-purple-200/70 dark:border-purple-950/70">
        
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-3xl pointer-events-none" />

        {/* Top Header & Compact Punchy Hero Title */}
        <div className="relative z-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-purple-900/50 border border-purple-200/80 dark:border-purple-800/60 text-[11px] font-mono font-bold text-purple-800 dark:text-purple-300 backdrop-blur-md shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
            <span>PORTAL AKADEMIK RESMI • PRAKTIKUM 2026/2027</span>
          </div>

          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            ALPRO <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 dark:from-purple-300 dark:via-indigo-300 dark:to-purple-200">Practicum.</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-sans max-w-lg">
            Sistem Manajemen Praktikum Algoritma &amp; Pemrograman S1 Sistem Informasi Telkom University. Terintegrasi penuh dengan 15 Kelas SI&apos;50 dan 32 Asisten Resmi EDM.
          </p>

          {/* Quick Key Badges */}
          <div className="flex flex-wrap gap-2 pt-0.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/85 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/50 shadow-2xs">
              <Users size={12} className="text-purple-600 dark:text-purple-400" />
              15 Kelas SI&apos;50
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/85 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/50 shadow-2xs">
              <ShieldCheck size={12} className="text-purple-600 dark:text-purple-400" />
              32 Asisten Resmi
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/85 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/50 shadow-2xs">
              <MapPin size={12} className="text-purple-600 dark:text-purple-400" />
              R1 Lt. 8 TULT
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/85 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/50 shadow-2xs">
              <Sparkles size={12} className="text-purple-600 dark:text-purple-400" />
              Lab EDM Lt. 3
            </span>
          </div>
        </div>

        {/* Center: Official EDM Artwork (Logo, Code, Charts & 3 Mascots) */}
        <div className="relative flex-1 w-full min-h-[340px] flex items-center justify-center my-auto py-2 select-none pointer-events-none">
          {/* Radial Ambient Glow */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-purple-400/25 dark:bg-purple-600/15 blur-3xl pointer-events-none" />
          <div className="relative w-full h-full max-h-[500px] xl:max-h-[560px] 2xl:max-h-[640px] drop-shadow-[0_22px_45px_rgba(79,40,150,0.18)]">
            <Image
              src="/images/landing-hero-alpro-edm.png"
              alt="Landing Hero ALPRO & Logo EDM Laboratory"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Bottom Footnote Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-purple-950/70 dark:text-neutral-400 border-t border-purple-200/70 dark:border-purple-900/40 pt-3">
          <span className="font-semibold">Enterprise Data Management Laboratory</span>
          <span>Telkom University © 2026/2027</span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RIGHT COLUMN: FULLSCREEN SLEEK LOGIN CONSOLE & CONTROLS      */}
      {/* ============================================================ */}
      <section className="lg:w-[43%] xl:w-[40%] min-h-screen lg:h-screen flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9FE] dark:bg-[#0B0316] relative z-20 overflow-y-auto border-l border-purple-100/60 dark:border-purple-950/60">
        
        {/* Top Controls Row */}
        <div className="w-full flex items-center justify-end gap-2 pb-4">
          <button
            type="button"
            onClick={() => setActiveModal("modul")}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-purple-950/70 hover:bg-purple-50 hover:dark:bg-purple-900/60 border border-slate-200/80 dark:border-purple-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 transition-all cursor-pointer shadow-2xs"
          >
            Silabus Modul
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("tentang")}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-purple-950/70 hover:bg-purple-50 hover:dark:bg-purple-900/60 border border-slate-200/80 dark:border-purple-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 transition-all cursor-pointer shadow-2xs"
          >
            Tentang Lab
          </button>
          <div className="bg-white dark:bg-purple-950/70 border border-slate-200/80 dark:border-purple-800 rounded-full p-1 shadow-2xs">
            <ThemeToggle />
          </div>
        </div>

        {/* Center: Beautifully Integrated Login Console */}
        <div className="my-auto w-full flex items-center justify-center py-4">
          <LoginForm />
        </div>

        {/* Bottom Support Text & Security Assurance */}
        <div className="text-center pt-4 space-y-1">
          <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
            Butuh bantuan akun? Hubungi Koordinator Asisten Praktikum di Ruang R1 Lt. 8 TULT / Lab EDM Lt. 3.
          </div>
          <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-500">
            🔒 256-Bit SSL Enkripsi • Terhubung Database EDM Supabase
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MODAL: SILABUS MODUL                                         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === "modul" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#120824] border border-purple-100 dark:border-purple-900/50 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="text-purple-600" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Silabus 8 Modul Praktikum</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {modules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.no} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200/70 dark:border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">MODUL {m.no}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">{m.diff}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-neutral-200">{m.title}</h4>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL: TENTANG LAB                                           */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === "tentang" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#120824] border border-purple-100 dark:border-purple-900/50 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <Info size={20} className="text-purple-600" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Tentang Lab EDM</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-neutral-300">
                <p>
                  <strong>Enterprise Data Management (EDM) Laboratory</strong> adalah laboratorium riset dan praktikum di bawah naungan Program Studi S1 Sistem Informasi, Fakultas Rekayasa Industri, Telkom University.
                </p>
                <p>
                  Mengampu mata kuliah praktikum fundamental pemrograman dan struktur data untuk seluruh mahasiswa angkatan 2026 (SI&apos;50) dengan dukungan 32 asisten praktikum terverifikasi.
                </p>
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-[11px] font-mono text-purple-900 dark:text-purple-200 space-y-1">
                  <div>📍 <strong>Lokasi Praktikum:</strong> Ruang R1 Lantai 8 TULT (Telkom University Landmark Tower).</div>
                  <div>🏢 <strong>Ruang Asisten &amp; Lab:</strong> Gedung Laboratorium Terpadu Lt. 3, Telkom University, Bandung.</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
