"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { loginAction } from "@/app/(auth)/actions/auth";
import { getAssistants, addAssistant, AssistantRecord } from "@/app/(auth)/actions/assistants";
import { useActionState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Eye,
  EyeOff,
  Loader2,
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Shield,
  Briefcase,
  Users,
  CheckCircle2,
  KeyRound,
  Info,
  Plus,
  X,
  Database,
  Check,
} from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"ASPRAK" | "KOMDIS" | "SEKBEN">("ASPRAK");
  const [state, formAction, isPending] = useActionState(loginAction, null);

  // Dynamic Assistant presets from Supabase
  const [assistantsList, setAssistantsList] = useState<AssistantRecord[]>([
    { code: "GWAN", name: "Andi P. (Asprak)", role: "ASPRAK" },
    { code: "IZIN", name: "M. Izin (Komdis)", role: "KOMDIS" },
    { code: "LEVI", name: "Levina (Sekben)", role: "SEKBEN" },
  ]);

  // Add Assistant Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newNim, setNewNim] = useState("");
  const [newRole, setNewRole] = useState<"ASPRAK" | "KOMDIS" | "SEKBEN">("ASPRAK");
  const [newPassword, setNewPassword] = useState("asisten2026");
  const [isAdding, setIsAdding] = useState(false);
  const [addFeedback, setAddFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Load assistants from Supabase on mount
  useEffect(() => {
    async function loadAssistants() {
      try {
        const data = await getAssistants();
        if (data && data.length > 0) {
          setAssistantsList(data);
        }
      } catch (err) {
        console.error("Error loading assistants:", err);
      }
    }
    loadAssistants();
  }, []);

  const setAssistantPreset = (code: string, role: "ASPRAK" | "KOMDIS" | "SEKBEN") => {
    setIdentifier(code);
    setPassword("asisten2026");
    setSelectedRole(role);
  };

  const handleCreateAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newName) {
      setAddFeedback({ type: "error", msg: "Harap isi Kode Asisten dan Nama Lengkap." });
      return;
    }

    setIsAdding(true);
    setAddFeedback(null);

    const res = await addAssistant({
      code: newCode.toUpperCase().trim(),
      name: newName.trim(),
      nim: newNim.trim(),
      role: newRole,
      password: newPassword,
    });

    setIsAdding(false);

    if (res.success) {
      setAddFeedback({ type: "success", msg: `Asisten ${newCode.toUpperCase()} berhasil disimpan ke Supabase!` });
      // Tambahkan ke list lokal
      setAssistantsList((prev) => [
        { code: newCode.toUpperCase(), name: newName, role: newRole, nim: newNim },
        ...prev,
      ]);
      // Pilih otomatis
      setAssistantPreset(newCode.toUpperCase(), newRole);
      setTimeout(() => {
        setShowAddModal(false);
        setAddFeedback(null);
        setNewCode("");
        setNewName("");
        setNewNim("");
      }, 1200);
    } else {
      setAddFeedback({ 
        type: "error", 
        msg: res.error || "Gagal menyimpan. Pastikan kredensial Supabase di .env.local sudah aktif." 
      });
    }
  };

  return (
    <div className="relative w-full max-w-[490px] lg:max-w-[520px] group">
      {/* Soft Ambient Diffuse Glow behind the glass card */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500/25 via-purple-600/25 to-indigo-500/20 rounded-[2.4rem] blur-2xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* High-End Double-Bezel Hardware Enclosure with Specular Glint */}
      <div className="relative z-10 rounded-[2.15rem] p-1.5 bg-gradient-to-b from-white/95 via-white/80 to-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_24px_60px_-12px_rgba(25,10,45,0.16)] overflow-hidden">
        
        {/* Subtle Specular Sheen across glass surface */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.15rem]">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20 animate-shimmer" />
        </div>
        <div className="rounded-[1.8rem] p-5 sm:p-6 lg:p-6 bg-white/80 backdrop-blur-xl border border-white/60 space-y-4">
          
          {/* Brand Logo & Console Title Header */}
          <div className="pb-3 border-b border-slate-200/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-10 shrink-0 drop-shadow-sm">
                <Image
                  src="/images/edm-emblem-crimson.png"
                  alt="EDM Laboratory Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#9E1B32] font-extrabold block">
                  Autentikasi Internal
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight tracking-tight">
                  Portal Asisten Praktikum
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-[10px] font-mono font-semibold text-emerald-700 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sesi Aktif
            </div>
          </div>
          
          {/* Quick Assistant Preset Switcher (1-Click Login) with Add Assistant Trigger */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#9E1B32]" />
                Pilih Profil Asisten (1-Klik):
              </label>

              {/* Tombol Tambah Akun Baru */}
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="text-[10px] font-mono text-[#9E1B32] hover:text-[#701A75] font-bold flex items-center gap-1 hover:underline cursor-pointer transition-colors"
                title="Daftarkan asisten baru ke Supabase"
              >
                <Plus size={11} />
                <span>+ Tambah Akun</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {assistantsList.slice(0, 3).map((ast) => {
                const isSelected = identifier === ast.code;
                return (
                  <motion.button
                    key={ast.code}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    type="button"
                    onClick={() => setAssistantPreset(ast.code, ast.role)}
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? ast.role === "ASPRAK"
                          ? "bg-[#250B47] text-white border-purple-900 shadow-md ring-2 ring-purple-600/30 scale-[1.02]"
                          : ast.role === "KOMDIS"
                          ? "bg-[#9E1B32] text-white border-rose-900 shadow-md ring-2 ring-rose-600/30 scale-[1.02]"
                          : "bg-[#1E1B4B] text-white border-indigo-900 shadow-md ring-2 ring-indigo-600/30 scale-[1.02]"
                        : "bg-white/85 hover:bg-white text-slate-700 border-slate-200/80 shadow-2xs hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {ast.role === "ASPRAK" ? (
                        <Users size={12} className={isSelected ? "text-purple-300" : "text-slate-400"} />
                      ) : ast.role === "KOMDIS" ? (
                        <Shield size={12} className={isSelected ? "text-rose-300" : "text-slate-400"} />
                      ) : (
                        <Briefcase size={12} className={isSelected ? "text-indigo-300" : "text-slate-400"} />
                      )}
                      <span className="text-xs font-mono font-bold leading-none">{ast.code}</span>
                    </div>
                    <div className={`text-[10px] font-mono leading-tight truncate ${
                      isSelected 
                        ? ast.role === "ASPRAK" ? "text-purple-200" : ast.role === "KOMDIS" ? "text-rose-200" : "text-indigo-200"
                        : "text-slate-500"
                    }`}>
                      {ast.name}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Authentication Form */}
          <form action={formAction} className="space-y-3 pt-0.5">
            <input type="hidden" name="role" value={selectedRole} />

            {/* Role Indicator Pills */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                Hak Akses Role:
              </label>
              <div className="flex gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200/70">
                {(["ASPRAK", "KOMDIS", "SEKBEN"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedRole === r
                        ? r === "KOMDIS"
                          ? "bg-[#9E1B32] text-white shadow-xs"
                          : r === "SEKBEN"
                          ? "bg-[#1E1B4B] text-white shadow-xs"
                          : "bg-[#250B47] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {r === "ASPRAK" ? "⚡ Asprak" : r === "KOMDIS" ? "🛡️ Komdis" : "📋 Sekben"}
                  </button>
                ))}
              </div>
            </div>

            {/* Identifier Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                Kode Asisten (NIM / ID Lab):
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <User size={16} />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
                  placeholder="Contoh: GWAN / IZIN / LEVI"
                  className="w-full bg-white/95 border border-slate-300/85 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/25 focus:border-[#9E1B32] transition-all font-mono uppercase shadow-inner font-semibold"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Password Sesi:
                </label>
                <span className="text-[9px] font-mono text-slate-400">Default: asisten2026</span>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password akun..."
                  className="w-full bg-white/95 border border-slate-300/85 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/25 focus:border-[#9E1B32] transition-all font-sans shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {state?.error && (
              <div className="text-rose-700 text-xs font-mono bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>{state.error}</span>
              </div>
            )}

            {/* Action Button — Fluid Pill with Nested Trailing Icon */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isPending}
              className="w-full relative overflow-hidden bg-gradient-to-r from-[#9E1B32] via-[#7B1238] to-[#250B47] hover:from-[#B51E3A] hover:via-[#8E1542] hover:to-[#351065] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase pl-6 pr-2 py-2.5 rounded-2xl shadow-[0_16px_36px_-8px_rgba(158,27,50,0.38)] hover:shadow-[0_20px_42px_-8px_rgba(158,27,50,0.48)] transition-all flex items-center justify-between group disabled:opacity-75 cursor-pointer mt-1.5"
            >
              {/* Dynamic Button Sheen on Hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-20 animate-shimmer" />
              </div>

              {isPending ? (
                <div className="flex items-center justify-center gap-2 w-full py-1">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Memverifikasi Akses Asisten...</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Masuk ke Dashboard ({selectedRole})</span>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1.5 group-hover:scale-105 shrink-0">
                    <ArrowRight size={15} />
                  </div>
                </>
              )}
            </motion.button>
          </form>

          {/* Informative Security Strip */}
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <ShieldCheck size={13} className="text-[#9E1B32]" />
              <span>Internal EDM Laboratory • Sesi Aman</span>
            </div>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="text-[#9E1B32] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Database size={11} />
              <span>Kelola Akun</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: TAMBAH ASISTEN BARU KE SUPABASE */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-4"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#9E1B32] flex items-center justify-center">
                    <Database size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Tambah Akun Asisten Baru
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400">
                      Sinkronisasi Database Supabase EDM
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Feedback Alert */}
              {addFeedback && (
                <div className={`p-3 rounded-xl text-xs font-mono flex items-start gap-2 ${
                  addFeedback.type === "success" 
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}>
                  {addFeedback.type === "success" ? <Check size={14} className="shrink-0 mt-0.5" /> : <Info size={14} className="shrink-0 mt-0.5" />}
                  <span>{addFeedback.msg}</span>
                </div>
              )}

              {/* Add Form */}
              <form onSubmit={handleCreateAssistant} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500">
                      Kode Asisten:
                    </label>
                    <input
                      type="text"
                      required
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                      placeholder="Misal: RAFI"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono uppercase font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-[#9E1B32]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500">
                      NIM (Opsional):
                    </label>
                    <input
                      type="text"
                      value={newNim}
                      onChange={(e) => setNewNim(e.target.value)}
                      placeholder="1202230004"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-[#9E1B32]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-500">
                    Nama Lengkap:
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Misal: Rafi Al-Fayed"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-[#9E1B32]"
                  />
                </div>

                {/* Role Selector */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-500">
                    Role Penugasan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["ASPRAK", "KOMDIS", "SEKBEN"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setNewRole(r)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                          newRole === r
                            ? r === "ASPRAK"
                              ? "bg-[#250B47] text-white border-purple-900 shadow-xs"
                              : r === "KOMDIS"
                              ? "bg-[#9E1B32] text-white border-rose-900 shadow-xs"
                              : "bg-[#1E1B4B] text-white border-indigo-900 shadow-xs"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500">
                      Password Sesi:
                    </label>
                    <span className="text-[9px] font-mono text-slate-400">Default: asisten2026</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-[#9E1B32]"
                  />
                </div>

                {/* Modal Footer Buttons */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isAdding}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#9E1B32] to-[#250B47] text-white text-xs font-bold font-mono tracking-wider shadow-md hover:from-[#B51E3A] hover:to-[#351065] transition-all cursor-pointer disabled:opacity-75 flex items-center gap-2"
                  >
                    {isAdding ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Check size={13} />
                        <span>Simpan ke Database</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
