"use client";

import { useState } from "react";
import { Download, Search, CheckCircle2, Lock, ArrowLeft, ChevronDown, GraduationCap } from "lucide-react";
import { DashboardSidebar } from "@/components/aureo/dashboard-sidebar";
import { SI50_CLASSES } from "@/lib/si-classes";
import Link from "next/link";

interface GradeRow {
  nim: string;
  name: string;
  tp: string;
  jurnalGuided: string;
  jurnalMandiri: string;
  kuis: string;
  status: "saved" | "saving" | "error" | "idle";
}

// Sample student roster generator per SI'50 class
const generateClassStudents = (classCode: string): GradeRow[] => {
  const isInt = classCode === "SI50INT";
  const classNum = isInt ? "15" : classCode.replace("SI50", "");
  
  const sampleNames = isInt 
    ? [
        "Alexander James Wright",
        "Aisha Nicole Tan",
        "Michael Chen Jin",
        "Farah Jasmine Al-Husseini",
        "Kenzo Takahashi",
      ]
    : [
        "Ahmad Faisal Pratama",
        "Budi Santoso Wibowo",
        "Citra Kirana Dewi",
        "Dina Amelia Zahra",
        "Eko Prasetyo Ramadhan",
      ];

  return sampleNames.map((name, i) => ({
    nim: `120226${classNum.padStart(2, "0")}${(i + 1).toString().padStart(2, "0")}`,
    name,
    tp: (80 + ((i * 3) % 18)).toString(),
    jurnalGuided: (82 + ((i * 4) % 16)).toString(),
    jurnalMandiri: (78 + ((i * 5) % 20)).toString(),
    kuis: (75 + ((i * 7) % 22)).toString(),
    status: "idle",
  }));
};

export default function GradingDashboard() {
  const [selectedClass, setSelectedClass] = useState("SI5001");
  const [grades, setGrades] = useState<GradeRow[]>(() => generateClassStudents("SI5001"));
  const [locked, setLocked] = useState(false);

  const handleClassChange = (newCode: string) => {
    setSelectedClass(newCode);
    setGrades(generateClassStudents(newCode));
  };

  const calcFinal = (tp: string, guided: string, mandiri: string, kuis: string) => {
    const vTP = parseFloat(tp) || 0;
    const vG = parseFloat(guided) || 0;
    const vM = parseFloat(mandiri) || 0;
    const vK = parseFloat(kuis) || 0;
    return ((vTP * 0.15) + (vG * 0.35) + (vM * 0.35) + (vK * 0.15)).toFixed(2);
  };

  const handleInputChange = (idx: number, field: keyof GradeRow, value: string) => {
    if (locked) return;
    if (value !== "" && isNaN(Number(value))) return;
    const num = Number(value);
    if (num > 100) return;

    setGrades(prev => {
      const newGrades = [...prev];
      newGrades[idx] = { ...newGrades[idx], [field]: value, status: "saving" };
      return newGrades;
    });

    setTimeout(() => {
      setGrades(prev => {
        const updated = [...prev];
        if (updated[idx].status === "saving") {
          updated[idx].status = "saved";
        }
        return updated;
      });
    }, 500);
  };

  const currentClassInfo = SI50_CLASSES.find(c => c.code === selectedClass) || SI50_CLASSES[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <DashboardSidebar activeTab="nilai" />

      <div className="flex-1 w-full min-w-0 space-y-5">
        {/* Header Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/dashboard/assistant" className="text-xs font-semibold text-[#9E1B32] hover:underline flex items-center gap-1">
                <ArrowLeft size={14} /> Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">Grade Spreadsheets</h1>
              <span className="text-[11px] font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">
                SI&apos;50
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Modul 4: Sorting & Binary Search • Telkom University • Kelas {currentClassInfo.name} ({currentClassInfo.defaultShift})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Class Dropdown for 15 classes */}
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl pl-3.5 pr-8 py-2 text-xs font-mono font-bold text-[#250B47] focus:outline-none focus:ring-2 focus:ring-rose-500/30 cursor-pointer appearance-none shadow-xs"
              >
                {SI50_CLASSES.map((cls) => (
                  <option key={cls.code} value={cls.code}>
                    {cls.code} ({cls.name}) {cls.type === "Internasional" ? "★ INT" : ""}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={() => setLocked(!locked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                locked
                  ? "bg-rose-100 border border-rose-200 text-rose-800"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <Lock size={14} />
              {locked ? "Terkunci" : "Kunci Nilai"}
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#9E1B32] to-[#250B47] text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Download size={14} />
              Export .xlsx
            </button>
          </div>
        </div>

        {/* 15 CLASS QUICK SWITCHER STRIP */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SI50_CLASSES.map((cls) => (
            <button
              key={cls.code}
              type="button"
              onClick={() => handleClassChange(cls.code)}
              className={`shrink-0 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg transition-all ${
                selectedClass === cls.code
                  ? "bg-[#250B47] text-white shadow-xs"
                  : cls.type === "Internasional"
                  ? "bg-purple-100 text-purple-900 border border-purple-300 hover:bg-purple-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cls.code}
              {cls.type === "Internasional" && <span className="text-amber-500 ml-1">★</span>}
            </button>
          ))}
        </div>

        {/* Spreadsheet Grid */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#140827] text-[10px] font-mono text-purple-200 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold text-white">NIM (SI&apos;50)</th>
                  <th className="px-6 py-4 font-semibold text-white">Nama Praktikan</th>
                  <th className="px-4 py-4 font-semibold text-right w-24">TP (15%)</th>
                  <th className="px-4 py-4 font-semibold text-right w-24">Guided (35%)</th>
                  <th className="px-4 py-4 font-semibold text-right w-24">Mandiri (35%)</th>
                  <th className="px-4 py-4 font-semibold text-right w-24">Kuis (15%)</th>
                  <th className="px-6 py-4 font-semibold text-right text-rose-300">Final Score</th>
                  <th className="px-6 py-4 font-semibold text-center w-16">Sync</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {grades.map((row, idx) => (
                  <tr key={row.nim} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5 font-mono text-xs text-slate-700 font-semibold">{row.nim}</td>
                    <td className="px-6 py-3.5 text-xs text-slate-900 font-medium">{row.name}</td>
                    <td className="px-4 py-2.5">
                      <input
                        type="text"
                        value={row.tp}
                        onChange={(e) => handleInputChange(idx, "tp", e.target.value)}
                        disabled={locked}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-right font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:opacity-50"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <input
                        type="text"
                        value={row.jurnalGuided}
                        onChange={(e) => handleInputChange(idx, "jurnalGuided", e.target.value)}
                        disabled={locked}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-right font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:opacity-50"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <input
                        type="text"
                        value={row.jurnalMandiri}
                        onChange={(e) => handleInputChange(idx, "jurnalMandiri", e.target.value)}
                        disabled={locked}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-right font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:opacity-50"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <input
                        type="text"
                        value={row.kuis}
                        onChange={(e) => handleInputChange(idx, "kuis", e.target.value)}
                        disabled={locked}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-right font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:opacity-50"
                      />
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-sm text-[#9E1B32] font-bold">
                      {calcFinal(row.tp, row.jurnalGuided, row.jurnalMandiri, row.kuis)}
                    </td>
                    <td className="px-6 py-3.5 flex justify-center items-center">
                      {row.status === "saving" && (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-[#9E1B32] animate-spin" />
                      )}
                      {row.status === "saved" && (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      )}
                      {row.status === "idle" && (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
