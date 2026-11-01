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
  MapPin,
  Users,
  ShieldCheck,
  GraduationCap,
  Sparkles,
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
    <main className="min-h-screen w-full bg-[#FBFBFC] dark:bg-[#070312] text-slate-900 dark:text-white font-sans selection:bg-purple-600 selection:text-white transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* MOBILE-ONLY TOP HEADER (Respects iOS/Android Safe Area Top)   */}
      {/* ============================================================ */}
      <header className="lg:hidden sticky top-0 z-30 w-full bg-[#FBFBFC]/95 dark:bg-[#070312]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 px-4 sm:px-6 transition-colors shadow-2xs">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          {/* Logo & Lab Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
              <Image
                src="/images/edm-emblem-crimson.png"
                alt="Logo Resmi EDM"
                fill
                sizes="32px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 truncate leading-tight">
                EDM LABORATORY
              </div>
              <div className="text-[10px] font-medium text-slate-500 dark:text-neutral-400 truncate leading-tight">
                FRI Telkom University
              </div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveModal("modul")}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 text-[11px] font-medium text-slate-700 dark:text-neutral-200 transition-colors shadow-2xs active:scale-95 cursor-pointer"
            >
              Silabus
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("tentang")}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 text-[11px] font-medium text-slate-700 dark:text-neutral-200 transition-colors shadow-2xs active:scale-95 cursor-pointer"
            >
              Tentang
            </button>
            <div className="bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-lg p-0.5 shadow-2xs">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MOBILE CONTENT FLOW (Login Front-and-Center, Zero Clutter)   */}
      {/* ============================================================ */}
      <div className="lg:hidden w-full flex flex-col justify-start px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-6 max-w-lg mx-auto">
        
        {/* Mobile Greeting & Status */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-neutral-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SEMESTER GENAP 2026/2027</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Algoritma &amp; <span className="text-purple-600 dark:text-purple-400">Pemrograman</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed">
            Portal praktikum &amp; penilaian terpadu S1 Sistem Informasi (SI&apos;50).
          </p>
        </div>

        {/* Mobile Login Console (Immediately Accessible Above The Fold!) */}
        <div className="w-full flex justify-center">
          <LoginForm />
        </div>

        {/* Mobile Support Footnote */}
        <div className="text-center space-y-1 pt-1 pb-2">
          <div className="text-xs text-slate-500 dark:text-neutral-400">
            Butuh bantuan akun? Hubungi Koordinator Asisten di Ruang R1 Lt. 8 TULT.
          </div>
          <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-500">
            Enkripsi Sesi 256-Bit • Terhubung Database EDM
          </div>
        </div>

        {/* Mobile Accordion / Collapsible Practicum Info */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            <Sparkles size={14} />
            <span>Spesifikasi Praktikum ALPRO</span>
          </div>

          {/* 4 Clean Mobile Bento Spec Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono mb-1">
                <Users size={12} className="text-purple-600 dark:text-purple-400" />
                <span>KELAS</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">15 Kelas</div>
              <div className="text-[10px] text-slate-500 dark:text-neutral-400">SI5001 - SI50INT</div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono mb-1">
                <GraduationCap size={12} className="text-purple-600 dark:text-purple-400" />
                <span>PRAKTIKAN</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">568 Mahasiswa</div>
              <div className="text-[10px] text-slate-500 dark:text-neutral-400">Terdaftar CeLOE</div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono mb-1">
                <ShieldCheck size={12} className="text-purple-600 dark:text-purple-400" />
                <span>TIM ASISTEN</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">32 Asisten</div>
              <div className="text-[10px] text-slate-500 dark:text-neutral-400">6 Divisi Lab EDM</div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono mb-1">
                <MapPin size={12} className="text-purple-600 dark:text-purple-400" />
                <span>LOKASI LAB</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">R1 Lt. 8 TULT</div>
              <div className="text-[10px] text-slate-500 dark:text-neutral-400">&amp; Riset Lt. 3</div>
            </div>
          </div>

          {/* Mobile Mascot Artwork Banner */}
          <div className="relative w-full h-32 rounded-xl bg-purple-500/5 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 overflow-hidden flex items-end justify-center p-2">
            <div className="relative w-56 h-28 opacity-85">
              <Image
                src="/images/edm-mascot-hero-art.png"
                alt="Maskot EDM"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* Mobile Lab Footer */}
          <div className="text-center text-[10px] font-mono text-slate-400 dark:text-neutral-500 pt-2">
            EDM Laboratory • FRI Telkom University Bandung
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* DESKTOP SPLIT LAYOUT (Preserved Exactly for Laptop / Large)  */}
      {/* ============================================================ */}
      <div className="hidden lg:flex w-full h-screen overflow-hidden">
        
        {/* LEFT COLUMN: EDITORIAL BRAND HERO WITH MINIMALIST BENTO */}
        <section className="w-[56%] xl:w-[58%] h-screen flex flex-col justify-between p-10 lg:p-14 xl:p-16 relative overflow-hidden bg-[#FBFBFC] dark:bg-[#070312] border-r border-slate-200/80 dark:border-white/10">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-[-10%] left-[-5%] w-[420px] h-[420px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl pointer-events-none" />

          {/* Hero Artwork / Watermark Centered & Enlarged */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 lg:bottom-4 w-[560px] md:w-[700px] lg:w-[820px] xl:w-[900px] h-[75%] lg:h-[86%] pointer-events-none select-none z-0">
            <div className="relative w-full h-full opacity-28 dark:opacity-20 transition-opacity duration-300">
              <Image
                src="/images/edm-mascot-hero-art.png"
                alt="Ilustrasi EDM Laboratory"
                fill
                priority
                sizes="60vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* Top Header: Official Lab Identity */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center justify-center p-2 shrink-0 shadow-2xs">
              <Image
                src="/images/edm-emblem-crimson.png"
                alt="Logo Resmi EDM"
                fill
                sizes="40px"
                className="object-contain p-1.5"
                priority
              />
            </div>
            <div>
              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                EDM LABORATORY
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-neutral-400 leading-none">
                Enterprise Data Management • Telkom University
              </div>
            </div>
          </div>

          {/* Center: Authoritative Headline & Minimalist Content */}
          <div className="relative z-10 my-auto py-10 lg:py-12 space-y-7 max-w-xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-neutral-300 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SEMESTER GENAP 2026/2027</span>
            </div>

            {/* Clean Editorial Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-950 dark:text-white tracking-tight leading-[1.1]">
                Algoritma &amp; <br />
                <span className="text-purple-600 dark:text-purple-400">
                  Pemrograman.
                </span>
              </h1>
              <p className="text-base font-normal text-slate-600 dark:text-neutral-300 leading-relaxed font-sans pt-2">
                Sistem manajemen praktikum dan penilaian terpadu S1 Sistem Informasi. Terintegrasi langsung dengan 15 kelas mahasiswa SI&apos;50 dan 32 asisten praktikum EDM Laboratory.
              </p>
            </div>

            {/* Minimalist Bento Metrics (Clean 2x2 Specs Grid) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 transition-colors shadow-2xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono mb-1">
                  <Users size={13} className="text-purple-600 dark:text-purple-400" />
                  <span>KELAS PRAKTIKUM</span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">15 Kelas</div>
                <div className="text-[11px] text-slate-500 dark:text-neutral-400">SI5001 - SI50INT</div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 transition-colors shadow-2xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono mb-1">
                  <GraduationCap size={13} className="text-purple-600 dark:text-purple-400" />
                  <span>TOTAL MAHASISWA</span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">568 Praktikan</div>
                <div className="text-[11px] text-slate-500 dark:text-neutral-400">Terdaftar CeLOE</div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 transition-colors shadow-2xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono mb-1">
                  <ShieldCheck size={13} className="text-purple-600 dark:text-purple-400" />
                  <span>TIM ASISTEN</span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">32 Asisten</div>
                <div className="text-[11px] text-slate-500 dark:text-neutral-400">6 Divisi EDM</div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 transition-colors shadow-2xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono mb-1">
                  <MapPin size={13} className="text-purple-600 dark:text-purple-400" />
                  <span>LOKASI LAB</span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">R1 Lt. 8 TULT</div>
                <div className="text-[11px] text-slate-500 dark:text-neutral-400">&amp; Lab Riset Lt. 3</div>
              </div>
            </div>
          </div>

          {/* Bottom Footnote Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-neutral-400 border-t border-slate-200/80 dark:border-white/10 pt-4">
            <span>EDM Laboratory</span>
            <span>FRI Telkom University</span>
          </div>
        </section>

        {/* RIGHT COLUMN: REFINED AUTHENTICATION CONSOLE & CONTROLS */}
        <section className="w-[44%] xl:w-[42%] h-screen flex flex-col justify-between p-8 lg:p-12 xl:p-14 bg-slate-50/50 dark:bg-[#0A0515] relative z-20 overflow-y-auto">
          
          {/* Top Controls Row */}
          <div className="w-full flex items-center justify-end gap-2 pb-4">
            <button
              type="button"
              onClick={() => setActiveModal("modul")}
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-neutral-200 transition-colors cursor-pointer shadow-2xs"
            >
              Silabus Modul
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("tentang")}
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-neutral-200 transition-colors cursor-pointer shadow-2xs"
            >
              Tentang Lab
            </button>
            <div className="bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-lg p-1 shadow-2xs">
              <ThemeToggle />
            </div>
          </div>

          {/* Center: Cleanly Centered Login Console */}
          <div className="my-auto w-full flex items-center justify-center py-6">
            <LoginForm />
          </div>

          {/* Bottom Support Text & Security Assurance */}
          <div className="text-center pt-4 space-y-1">
            <div className="text-xs text-slate-500 dark:text-neutral-400">
              Butuh bantuan akun? Hubungi Koordinator Asisten di Ruang R1 Lt. 8 TULT.
            </div>
            <div className="text-[11px] font-mono text-slate-400 dark:text-neutral-500">
              Enkripsi Sesi 256-Bit • Terhubung Database EDM
            </div>
          </div>
        </section>

      </div>

      {/* ============================================================ */}
      {/* MODAL: SILABUS MODUL                                         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === "modul" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0E071A] border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-purple-600 dark:text-purple-400" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Silabus 8 Modul Praktikum</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer active:scale-95"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {modules.map((m) => {
                  return (
                    <div key={m.no} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">MODUL {m.no}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40">{m.diff}</span>
                      </div>
                      <h4 className="text-xs font-medium text-slate-800 dark:text-neutral-200 leading-snug">{m.title}</h4>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#0E071A] border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <Info size={18} className="text-purple-600 dark:text-purple-400" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Tentang Lab EDM</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer active:scale-95"
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
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-neutral-300 space-y-1.5">
                  <div>• <strong>Lokasi Praktikum:</strong> Ruang R1 Lantai 8 TULT (Telkom University Landmark Tower).</div>
                  <div>• <strong>Ruang Asisten &amp; Lab:</strong> Gedung Laboratorium Lt. 8, Telkom University, Bandung.</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
