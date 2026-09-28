/**
 * S1 Sistem Informasi - Telkom University
 * Angkatan 2026 (SI'50)
 * Total: 15 Kelas (SI5001 s.d. SI5014 + SI50INT)
 */

export interface SIClass {
  code: string;
  name: string;
  type: "Reguler" | "Internasional";
  defaultShift: string;
  totalStudents: number;
}

export const SI50_CLASSES: SIClass[] = [
  { code: "SI5001", name: "SI-50-01", type: "Reguler", defaultShift: "Senin 07:30 - 10:30", totalStudents: 42 },
  { code: "SI5002", name: "SI-50-02", type: "Reguler", defaultShift: "Senin 10:30 - 13:30", totalStudents: 40 },
  { code: "SI5003", name: "SI-50-03", type: "Reguler", defaultShift: "Senin 13:30 - 16:30", totalStudents: 41 },
  { code: "SI5004", name: "SI-50-04", type: "Reguler", defaultShift: "Selasa 07:30 - 10:30", totalStudents: 43 },
  { code: "SI5005", name: "SI-50-05", type: "Reguler", defaultShift: "Selasa 10:30 - 13:30", totalStudents: 39 },
  { code: "SI5006", name: "SI-50-06", type: "Reguler", defaultShift: "Selasa 13:30 - 16:30", totalStudents: 42 },
  { code: "SI5007", name: "SI-50-07", type: "Reguler", defaultShift: "Rabu 07:30 - 10:30", totalStudents: 40 },
  { code: "SI5008", name: "SI-50-08", type: "Reguler", defaultShift: "Rabu 10:30 - 13:30", totalStudents: 41 },
  { code: "SI5009", name: "SI-50-09", type: "Reguler", defaultShift: "Rabu 13:30 - 16:30", totalStudents: 38 },
  { code: "SI5010", name: "SI-50-10", type: "Reguler", defaultShift: "Kamis 07:30 - 10:30", totalStudents: 42 },
  { code: "SI5011", name: "SI-50-11", type: "Reguler", defaultShift: "Kamis 10:30 - 13:30", totalStudents: 41 },
  { code: "SI5012", name: "SI-50-12", type: "Reguler", defaultShift: "Kamis 13:30 - 16:30", totalStudents: 39 },
  { code: "SI5013", name: "SI-50-13", type: "Reguler", defaultShift: "Jumat 07:30 - 10:30", totalStudents: 40 },
  { code: "SI5014", name: "SI-50-14", type: "Reguler", defaultShift: "Jumat 13:30 - 16:30", totalStudents: 38 },
  { code: "SI50INT", name: "SI-50-INT", type: "Internasional", defaultShift: "Jumat 09:30 - 12:30", totalStudents: 32 },
];
