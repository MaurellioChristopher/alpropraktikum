"use client";

import React from "react";
import Image from "next/image";

export function PraktikanCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Background Ambient Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-blue-300/40 dark:bg-blue-600/25 blur-2xl" />
      <div className="relative w-full h-full min-h-[180px] sm:min-h-[200px] flex items-center justify-center scale-120 sm:scale-125 transition-transform duration-300">
        <Image
          src="/images/ilustrasi/praktikan.png"
          alt="Ilustrasi Akses Cepat Praktikan"
          fill
          sizes="(max-width: 640px) 280px, 320px"
          className="object-contain drop-shadow-[0_16px_28px_rgba(59,130,246,0.22)]"
          priority
        />
      </div>
    </div>
  );
}

export function DokumentasiCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Background Ambient Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-emerald-300/40 dark:bg-emerald-600/25 blur-2xl" />
      <div className="relative w-full h-full min-h-[180px] sm:min-h-[200px] flex items-center justify-center scale-120 sm:scale-125 transition-transform duration-300">
        <Image
          src="/images/ilustrasi/dokumentasi.png"
          alt="Ilustrasi Akses Cepat Dokumentasi"
          fill
          sizes="(max-width: 640px) 280px, 320px"
          className="object-contain drop-shadow-[0_16px_28px_rgba(16,185,129,0.22)]"
          priority
        />
      </div>
    </div>
  );
}

export function JadwalCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Background Ambient Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-amber-300/40 dark:bg-amber-600/25 blur-2xl" />
      <div className="relative w-full h-full min-h-[180px] sm:min-h-[200px] flex items-center justify-center scale-120 sm:scale-125 transition-transform duration-300">
        <Image
          src="/images/ilustrasi/jadwal-saya.png"
          alt="Ilustrasi Akses Cepat Jadwal Saya"
          fill
          sizes="(max-width: 640px) 280px, 320px"
          className="object-contain drop-shadow-[0_16px_28px_rgba(249,115,22,0.22)]"
          priority
        />
      </div>
    </div>
  );
}

export function SlideModulCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Background Ambient Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-purple-300/40 dark:bg-purple-600/25 blur-2xl" />
      <div className="relative w-full h-full min-h-[180px] sm:min-h-[200px] flex items-center justify-center scale-120 sm:scale-125 transition-transform duration-300">
        <Image
          src="/images/ilustrasi/ppt-modul.png"
          alt="Ilustrasi Akses Cepat PPT Modul"
          fill
          sizes="(max-width: 640px) 280px, 320px"
          className="object-contain drop-shadow-[0_16px_28px_rgba(147,51,234,0.22)]"
          priority
        />
      </div>
    </div>
  );
}
