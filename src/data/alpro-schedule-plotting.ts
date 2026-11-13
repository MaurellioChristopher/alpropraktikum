/**
 * JADWAL & PLOTTINGAN RESMI PRAKTIKUM ALGORITMA DAN PEMROGRAMAN 2026/2027
 * Enterprise Data Management (EDM) Laboratory - Telkom University
 *
 * Diperbarui berdasarkan SK Plotting Praktikum Alpro 26/27:
 * - 15 Shift Praktikum (Senin s.d. Sabtu)
 * - Plotting Mahasiswa per Grup (A s.d. G) dan Asisten Penanggung Jawab
 */

export interface ShiftSchedule {
  shiftNumber: number;
  classCode: string;
  className: string;
  day: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu";
  dayIndex: number; // 1: Senin, 2: Selasa, ..., 6: Sabtu, 0: Minggu
  startTime: string; // "07:30"
  endTime: string;   // "09:30"
  timeDisplay: string; // "07.30 - 09.30"
  room: string;
  totalGroups: number;
  color: {
    bgLight: string;
    borderLight: string;
    textLight: string;
    bgDark: string;
    borderDark: string;
    badge: string;
  };
}

export interface StudentPlotting {
  nim: string;
  name: string;
  classCode: string;
  className: string;
  assistantCode: string;
  group: "A" | "B" | "C" | "D" | "E" | "F" | "G";
}

export interface ShiftPlottingSummary {
  shiftNumber: number;
  className: string;
  classCode: string;
  assistants: {
    group: "A" | "B" | "C" | "D" | "E" | "F" | "G";
    assistantCode: string;
    studentCount: number;
  }[];
  students: StudentPlotting[];
  isFinalized: boolean;
}

// 1. DAFTAR 15 SHIFT RESMI SESUAI JADWAL PRAKTIKUM ALPRO 26/27 (Image 1)
export const ALPRO_15_SHIFTS: ShiftSchedule[] = [
  // SENIN
  {
    shiftNumber: 1,
    classCode: "SI5012",
    className: "SI-50-12",
    day: "Senin",
    dayIndex: 1,
    startTime: "07:30",
    endTime: "09:30",
    timeDisplay: "07.30 - 09.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-blue-100/90",
      borderLight: "border-blue-300",
      textLight: "text-blue-900",
      bgDark: "dark:bg-blue-950/70",
      borderDark: "dark:border-blue-800",
      badge: "bg-blue-500 text-white",
    },
  },
  {
    shiftNumber: 2,
    classCode: "SI5002",
    className: "SI-50-02",
    day: "Senin",
    dayIndex: 1,
    startTime: "10:30",
    endTime: "12:30",
    timeDisplay: "10.30 - 12.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-rose-200/90",
      borderLight: "border-rose-300",
      textLight: "text-rose-950",
      bgDark: "dark:bg-rose-950/70",
      borderDark: "dark:border-rose-800",
      badge: "bg-rose-600 text-white",
    },
  },
  {
    shiftNumber: 3,
    classCode: "SI5011",
    className: "SI-50-11",
    day: "Senin",
    dayIndex: 1,
    startTime: "14:30",
    endTime: "16:30",
    timeDisplay: "14.30 - 16.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-rose-100/90",
      borderLight: "border-rose-300",
      textLight: "text-rose-900",
      bgDark: "dark:bg-rose-950/50",
      borderDark: "dark:border-rose-900",
      badge: "bg-rose-500 text-white",
    },
  },

  // SELASA
  {
    shiftNumber: 4,
    classCode: "SI5004",
    className: "SI-50-04",
    day: "Selasa",
    dayIndex: 2,
    startTime: "07:30",
    endTime: "09:30",
    timeDisplay: "07.30 - 09.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-teal-100/90",
      borderLight: "border-teal-300",
      textLight: "text-teal-950",
      bgDark: "dark:bg-teal-950/70",
      borderDark: "dark:border-teal-800",
      badge: "bg-teal-600 text-white",
    },
  },
  {
    shiftNumber: 5,
    classCode: "SI5009",
    className: "SI-50-09",
    day: "Selasa",
    dayIndex: 2,
    startTime: "10:30",
    endTime: "12:30",
    timeDisplay: "10.30 - 12.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-teal-100/90",
      borderLight: "border-teal-300",
      textLight: "text-teal-950",
      bgDark: "dark:bg-teal-950/70",
      borderDark: "dark:border-teal-800",
      badge: "bg-teal-600 text-white",
    },
  },
  {
    shiftNumber: 6,
    classCode: "SI5010",
    className: "SI-50-10",
    day: "Selasa",
    dayIndex: 2,
    startTime: "14:30",
    endTime: "16:30",
    timeDisplay: "14.30 - 16.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-amber-100/90",
      borderLight: "border-amber-300",
      textLight: "text-amber-950",
      bgDark: "dark:bg-amber-950/70",
      borderDark: "dark:border-amber-800",
      badge: "bg-amber-600 text-white",
    },
  },

  // RABU
  {
    shiftNumber: 7,
    classCode: "SI5013",
    className: "SI-50-13",
    day: "Rabu",
    dayIndex: 3,
    startTime: "09:30",
    endTime: "11:30",
    timeDisplay: "09.30 - 11.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-emerald-100/90",
      borderLight: "border-emerald-300",
      textLight: "text-emerald-950",
      bgDark: "dark:bg-emerald-950/70",
      borderDark: "dark:border-emerald-800",
      badge: "bg-emerald-600 text-white",
    },
  },
  {
    shiftNumber: 8,
    classCode: "SI5005",
    className: "SI-50-05",
    day: "Rabu",
    dayIndex: 3,
    startTime: "13:30",
    endTime: "15:30",
    timeDisplay: "13.30 - 15.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-orange-200/90",
      borderLight: "border-orange-300",
      textLight: "text-orange-950",
      bgDark: "dark:bg-orange-950/70",
      borderDark: "dark:border-orange-800",
      badge: "bg-orange-600 text-white",
    },
  },

  // KAMIS
  {
    shiftNumber: 9,
    classCode: "SI5003",
    className: "SI-50-03",
    day: "Kamis",
    dayIndex: 4,
    startTime: "07:30",
    endTime: "09:30",
    timeDisplay: "07.30 - 09.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-rose-200/90",
      borderLight: "border-rose-300",
      textLight: "text-rose-950",
      bgDark: "dark:bg-rose-950/70",
      borderDark: "dark:border-rose-800",
      badge: "bg-rose-600 text-white",
    },
  },
  {
    shiftNumber: 10,
    classCode: "SI5006",
    className: "SI-50-06",
    day: "Kamis",
    dayIndex: 4,
    startTime: "14:30",
    endTime: "16:30",
    timeDisplay: "14.30 - 16.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-purple-100/90",
      borderLight: "border-purple-300",
      textLight: "text-purple-950",
      bgDark: "dark:bg-purple-950/70",
      borderDark: "dark:border-purple-800",
      badge: "bg-purple-600 text-white",
    },
  },

  // JUMAT
  {
    shiftNumber: 11,
    classCode: "SI5001",
    className: "SI-50-01",
    day: "Jumat",
    dayIndex: 5,
    startTime: "07:30",
    endTime: "09:30",
    timeDisplay: "07.30 - 09.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-sky-200/90",
      borderLight: "border-sky-300",
      textLight: "text-sky-950",
      bgDark: "dark:bg-sky-950/70",
      borderDark: "dark:border-sky-800",
      badge: "bg-sky-600 text-white",
    },
  },
  {
    shiftNumber: 12,
    classCode: "SI5008",
    className: "SI-50-08",
    day: "Jumat",
    dayIndex: 5,
    startTime: "13:30",
    endTime: "15:30",
    timeDisplay: "13.30 - 15.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-amber-200/90",
      borderLight: "border-amber-300",
      textLight: "text-amber-950",
      bgDark: "dark:bg-amber-950/70",
      borderDark: "dark:border-amber-800",
      badge: "bg-amber-600 text-white",
    },
  },

  // SABTU
  {
    shiftNumber: 13,
    classCode: "SI50INT",
    className: "SI-50-INT",
    day: "Sabtu",
    dayIndex: 6,
    startTime: "07:30",
    endTime: "09:30",
    timeDisplay: "07.30 - 09.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-blue-200/90",
      borderLight: "border-blue-300",
      textLight: "text-blue-950",
      bgDark: "dark:bg-blue-950/70",
      borderDark: "dark:border-blue-800",
      badge: "bg-blue-600 text-white",
    },
  },
  {
    shiftNumber: 14,
    classCode: "SI5007",
    className: "SI-50-07",
    day: "Sabtu",
    dayIndex: 6,
    startTime: "10:30",
    endTime: "12:30",
    timeDisplay: "10.30 - 12.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-slate-200/90",
      borderLight: "border-slate-300",
      textLight: "text-slate-900",
      bgDark: "dark:bg-neutral-800",
      borderDark: "dark:border-neutral-700",
      badge: "bg-slate-600 text-white",
    },
  },
  {
    shiftNumber: 15,
    classCode: "SI5014",
    className: "SI-50-14",
    day: "Sabtu",
    dayIndex: 6,
    startTime: "14:30",
    endTime: "16:30",
    timeDisplay: "14.30 - 16.30",
    room: "R1 Lantai 8 TULT",
    totalGroups: 7,
    color: {
      bgLight: "bg-rose-300/80",
      borderLight: "border-rose-400",
      textLight: "text-rose-950",
      bgDark: "dark:bg-rose-950/80",
      borderDark: "dark:border-rose-700",
      badge: "bg-rose-700 text-white",
    },
  },
];

// 2. DATA PLOTTING ASISTEN & MAHASISWA SHIFT 1 s.d. 4 (SESUAI GAMBAR 2, 3, 4, 5)
export const SHIFT_1_STUDENTS: StudentPlotting[] = [
  // GRUP A (ADDH)
  { nim: "102022400367", name: "RADITYA SYANDANA PRASETYO", classCode: "SI5012", className: "SI-48-01", assistantCode: "ADDH", group: "A" },
  { nim: "102022600015", name: "YUDHA PRATAMA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600021", name: "KHALISHA NAYLA AKMAL", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600041", name: "BRYAN GIVO ABDILUHUNG", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600050", name: "NADYA FEBRYOLA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600081", name: "ALI RIDHO", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600090", name: "TIARA AMALIDYA", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  // GRUP B (IPGA)
  { nim: "102022600112", name: "AHMAD HUSEIN AL FARISY", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600114", name: "NAFISHA HAIFA LUTHFIAH", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600128", name: "ARKA YOHAN TRIOSLY", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600146", name: "DIEGO NAUFALINO CHANDRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600164", name: "ZAIDAN SYAUQI YUSUF SAPUTRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  // GRUP C (DERA)
  { nim: "102022600168", name: "VANESSA SHALOM AVENTHA SUHARLY", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600187", name: "DESTRA INDRA SETIAWAN", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600201", name: "HAIFA NUR ROJABI UBAIDILLAH", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600215", name: "MOCHAMMAD FADLI KAMALUDIN", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600223", name: "NAILA SYAFIRA NUR SYABANI", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600233", name: "ENGGAR ADITYA SANUSI", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  // GRUP D (FIAG)
  { nim: "102022600250", name: "TRISTAN REMIEL NESIMNASI", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600269", name: "JAHFAL DZIKRON ASHIDIK", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600272", name: "NAWAFA AHDELLA", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600287", name: "MUHAMMAD BILAL BACHTIAR", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600300", name: "PIJAR SURYA KELANA", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600321", name: "ISKANDAR", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  // GRUP E (ADFZ)
  { nim: "102022600330", name: "THALITA MAULIDINA MULYASANDY", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600338", name: "FAKHRI FATHURRAHMAN", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600358", name: "ELANG AVISENA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600364", name: "HANINDA SALVADILLA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600380", name: "SEVENT MIGELL SONDAKH", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600400", name: "FRIZLY OKTANIO CANDRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  // GRUP F (AITS)
  { nim: "102022600415", name: "FAJRIYAH ZAHROTU SITA", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600417", name: "HIRZAN TAMMA RADITYA", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600449", name: "SULTAN GIRI MAULANA PUTRA PAMUNGKAS", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600464", name: "ANDI EVANSYAH ZAFALDI", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600472", name: "PHELIZA AUDY ARLYN", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600478", name: "MUHAMMAD GHALY ABQARY", classCode: "SI5012", className: "SI-50-12", assistantCode: "MUDI", group: "G" },
  // GRUP G (MUDI)
  { nim: "102022600508", name: "RIZKY PUTRA ALFARIJI", classCode: "SI5012", className: "SI-50-12", assistantCode: "MUDI", group: "G" },
  { nim: "102022630008", name: "ANDREI KURNIA ARSHAVIN", classCode: "SI5012", className: "SI-50-12", assistantCode: "MUDI", group: "G" },
  { nim: "102022630032", name: "I PUTU RESTU CAHAYA PUTRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "MUDI", group: "G" },
  { nim: "102022630045", name: "AHMAD FADHIL AL HADY", classCode: "SI5012", className: "SI-50-12", assistantCode: "MUDI", group: "G" },
];

export const SHIFT_2_STUDENTS: StudentPlotting[] = [
  // GRUP A (GRGS)
  { nim: "102022600002", name: "GEBRI FAIRUZ CHALISA", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600022", name: "ADILUL HAKIMI", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600029", name: "FARZANA GHANIA PUTRI", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600048", name: "ALIF RAKHANAYA ARJUNA", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600065", name: "LABRIA MUTIARA SARI", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600066", name: "M ATHALLAH FARENTINO GHAZALI", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600089", name: "KETUT DHARMA ARTHA WARASMARA", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  // GRUP B (ADFZ)
  { nim: "102022600098", name: "ADELIA AMANDA PUTRI F", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600133", name: "MUHAMMAD RASYAH ALVIAN", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600138", name: "AYASHA ALIKA", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600151", name: "NABIL AHSAN BARIQI BIN MOHAMMAD ZULKARNAIN", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600170", name: "AHMAD RAIHAN IBRAHIM", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  // GRUP C (INTC)
  { nim: "102022600181", name: "RAISA DINI FAZILA", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },
  { nim: "102022600192", name: "MUHAMMAD IHSAN JAMALULLAIL", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },
  { nim: "102022600239", name: "MUHAMMAD LABIB BADRU ZAMAN", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },
  { nim: "102022600256", name: "EVAN HAFIZ TRIYANA", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },
  { nim: "102022600274", name: "MUHAMMAD ADLY PERMANA", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },
  { nim: "102022600286", name: "DAANIA RAMADHANI", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },
  // GRUP D (DEVO)
  { nim: "102022600291", name: "FADLAN MUHAMMAD RIDWAN RIADI", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },
  { nim: "102022600304", name: "MUHAMMAD ATHALLA ARRAFFI", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },
  { nim: "102022600325", name: "MUHAMMAD NAZHIF DHANISWARA", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },
  { nim: "102022600339", name: "KAYLA TSABITA IZZATI PUTRI", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },
  { nim: "102022600346", name: "ERZA TRI APRILIAN", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },
  { nim: "102022600368", name: "M. KHAFIDHIN MUFTI ALI", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },
  // GRUP E (ADDH)
  { nim: "102022600384", name: "KELVIN SURYA DINATA", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600406", name: "RAFAEL CHRISTIAN WIBOWO", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600421", name: "MUHAMMAD WISNU HARIS", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600432", name: "ASTI ASH SHIDQY", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600439", name: "I NYOMAN DIKA KURNIAWAN", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600453", name: "VINCENT JOVAN REANDE", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  // GRUP F (FIAG)
  { nim: "102022600467", name: "ABDI KUSUMA NATA", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022600487", name: "AURELIA AGATHA TIKU", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022600512", name: "SEMBIRING SAMUEL ELIESER", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022630002", name: "RAKA TRI ANGGARA", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022630010", name: "FAREL RAHMADIANSYAH", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022630014", name: "HASNA NUR SABRINA", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  // GRUP G (DINF)
  { nim: "102022630015", name: "ARIZQI MUHAMMAD AKBAR", classCode: "SI5002", className: "SI-50-02", assistantCode: "DINF", group: "G" },
  { nim: "102022630017", name: "SITI AISYAH NURFADILLAH", classCode: "SI5002", className: "SI-50-02", assistantCode: "DINF", group: "G" },
  { nim: "102022630029", name: "SIVA AWRELYA MULANDARI", classCode: "SI5002", className: "SI-50-02", assistantCode: "DINF", group: "G" },
  { nim: "102022630043", name: "BRYAN GERRALD LIESTIANTO", classCode: "SI5002", className: "SI-50-02", assistantCode: "DINF", group: "G" },
  { nim: "102022630046", name: "SULTAN ALIFSYAH NAPU", classCode: "SI5002", className: "SI-50-02", assistantCode: "DINF", group: "G" },
];

export const SHIFT_3_STUDENTS: StudentPlotting[] = [
  // GRUP A (TICS)
  { nim: "102022600014", name: "ABELL PEDROSA SEMBIRING", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },
  { nim: "102022600019", name: "ADINA RAISYA CLARESTA", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },
  { nim: "102022600037", name: "SAYYID MUHAMMAD HASAN", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },
  { nim: "102022600046", name: "QUEEN LATIFA YASMIN", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },
  { nim: "102022600058", name: "BRYAN VIANDER", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },
  { nim: "102022600077", name: "MUHAMMAD FAREL HARDISATYA", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },
  // GRUP B (LAUF)
  { nim: "102022600088", name: "AZKA FADILLAH RIZKI PUTRI", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600111", name: "MUHAMMAD RADITYA PRATAMA", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600113", name: "AISYAH WAHYUNINGSIH", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600127", name: "DANI SETYO GUSTOMO", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600145", name: "MUHAMMAD MYKO ADITYO", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600162", name: "SULTHAN EL HAKIM", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  // GRUP C (ALRS)
  { nim: "102022600166", name: "ANINDYA HASYA SETIAWAN", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  { nim: "102022600186", name: "HAFIZD JAALNI AKBAR", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  { nim: "102022600209", name: "ALFI AZHAR ALMASHOEM", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  { nim: "102022600222", name: "AJENG BYLQIS SORGAWI", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  { nim: "102022600232", name: "SALMAN HAFIDZ RAMDHANI", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  { nim: "102022600249", name: "ABEL JANUAR GIOVANI", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  // GRUP D (ADFZ)
  { nim: "102022600266", name: "DWI NOVITA SUCIATI", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  { nim: "102022600299", name: "MUHAMMAD KAYSAN NURFADILAH", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  { nim: "102022600319", name: "BIMO SATRIO UTOMO", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  { nim: "102022600320", name: "FARAH HILMIY ZHAAFIRA", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  { nim: "102022600336", name: "MUHAMMAD FATHURAKHMAN ARASY", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  { nim: "102022600356", name: "DANIEL SIMARMATA", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  // GRUP E (MAYR)
  { nim: "102022600363", name: "HANUN KEMALA DIYANTI", classCode: "SI5011", className: "SI-50-11", assistantCode: "MAYR", group: "E" },
  { nim: "102022600378", name: "SYAHRIAL AZMI CHABIB", classCode: "SI5011", className: "SI-50-11", assistantCode: "MAYR", group: "E" },
  { nim: "102022600397", name: "GANAR REY SITORUS", classCode: "SI5011", className: "SI-50-11", assistantCode: "MAYR", group: "E" },
  { nim: "102022600402", name: "CHERIE FAYOLA", classCode: "SI5011", className: "SI-50-11", assistantCode: "MAYR", group: "E" },
  { nim: "102022600414", name: "MUHAMMAD DAFFA FAHREZY", classCode: "SI5011", className: "SI-50-11", assistantCode: "MAYR", group: "E" },
  // GRUP F (MUHA)
  { nim: "102022600434", name: "MUHAMMAD RADITYA KAMAL", classCode: "SI5011", className: "SI-50-11", assistantCode: "MUHA", group: "F" },
  { nim: "102022600468", name: "NATANIA ZHAFIRA MASHURI", classCode: "SI5011", className: "SI-50-11", assistantCode: "MUHA", group: "F" },
  { nim: "102022600477", name: "MUHAMMAD NABIL ISDAN HASAN", classCode: "SI5011", className: "SI-50-11", assistantCode: "MUHA", group: "F" },
  { nim: "102022600490", name: "RAFLY AL -FAZAN AIRIL AKBAR", classCode: "SI5011", className: "SI-50-11", assistantCode: "MUHA", group: "F" },
  { nim: "102022600507", name: "SATRIA NOVA RISKY EKA PUTRA", classCode: "SI5011", className: "SI-50-11", assistantCode: "MUHA", group: "F" },
  // GRUP G (SYOW)
  { nim: "102022630013", name: "SYARIFAH ALYA ALHASNI", classCode: "SI5011", className: "SI-50-11", assistantCode: "SYOW", group: "G" },
  { nim: "102022630020", name: "HARIS ARDIAN", classCode: "SI5011", className: "SI-50-11", assistantCode: "SYOW", group: "G" },
  { nim: "102022630021", name: "MUHAMMAD HAFIZH AFKAR FADHIL PRIYAMBODO", classCode: "SI5011", className: "SI-50-11", assistantCode: "SYOW", group: "G" },
  { nim: "102022630034", name: "MUHAMMAD KHAIRUL RIDHO", classCode: "SI5011", className: "SI-50-11", assistantCode: "SYOW", group: "G" },
  { nim: "102022630036", name: "MUHAMMAD HAFIZH FARSYA SYAHPUTRA", classCode: "SI5011", className: "SI-50-11", assistantCode: "SYOW", group: "G" },
];

export const SHIFT_4_STUDENTS: StudentPlotting[] = [
  // GRUP A (MUDI)
  { nim: "102022600005", name: "TIARA MAYDA PANJAITAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600027", name: "FARIS ABDULLAH", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600035", name: "NAJLA GHASSANA ISMAELIA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600051", name: "M. RAVEL PUTRA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600068", name: "MUHAMMAD RAFI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600076", name: "MYA PURNAMA SARI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600095", name: "GIO ADITYA", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },
  // GRUP B (INTC)
  { nim: "102022600102", name: "DEVI JESSICA MANULLANG", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },
  { nim: "102022600118", name: "ANDI MUHAMMAD RAFID ALYDRUS", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },
  { nim: "102022600134", name: "MUHAMMAD SYAIFULLAH AL GHIFARI", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },
  { nim: "102022600141", name: "CALLISTA FAIRUZ QUEENA", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },
  { nim: "102022600154", name: "MIRZA AHNAF WIJANARKO", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },
  // GRUP C (RAZA)
  { nim: "102022600172", name: "DARIS ATQIA", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },
  { nim: "102022600184", name: "LITA IMRAENI", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },
  { nim: "102022600197", name: "MUHAMMAD AR RAAFI FADHLIL ISKANDAR", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },
  { nim: "102022600211", name: "FREYA NAFIA QIANDRA", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },
  { nim: "102022600224", name: "AZRIAL RIZKY PRATAMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },
  { nim: "102022600241", name: "AHMAD SHOFIULLAH SHOLEHUDDIN", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },
  // GRUP D (MJFA)
  { nim: "102022600258", name: "MUHAMMAD HAFIZHURROHMAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600277", name: "ZIDANE RAMDHANI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600312", name: "ADAM ZULFIKAR FATHURAHMAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600327", name: "FATWA FEBRIANSYAH PASARIBU", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600342", name: "KAYLA RAHMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600370", name: "FARREL YOGA PRATAMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  // GRUP E (ARNA)
  { nim: "102022600383", name: "ISNA NI MATUL MASRUROH", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600388", name: "RENDYTYA PRATAMA DARMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600408", name: "RAMADHAN KANEDY", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600423", name: "DAFFA HAFIZH FIRDAUS", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600435", name: "GUSTI AYU PUTU EKA SHANTI", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600442", name: "I KETUT SATYA WIRATAMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  // GRUP F (MACY)
  { nim: "102022600456", name: "MUHAMMAD IQBAL RAMADANY", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600483", name: "MUHAMMAD AKRAM", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600495", name: "ANINDHITA DEA SHAFIRA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600497", name: "FATHAN AZEEM BILHAQ GUNAWAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600514", name: "NICO FEBRINO BAHARI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022630003", name: "VICKY", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  // GRUP G (DSPH)
  { nim: "102022630018", name: "GENDHIS ASRINING GALIH", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
  { nim: "102022630022", name: "MUHAMMAD DERRIL ALKHANSA", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
  { nim: "102022630023", name: "KAILA LUNA ANANDITA", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
  { nim: "102022630027", name: "RIFQI SYAFI'I WAHYU AL-HAQ", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
  { nim: "102022630039", name: "YEHESKIEL SINURAYA", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
];

export const SHIFT_5_STUDENTS: StudentPlotting[] = [
  // GRUP A (TICS)
  { nim: "102022600012", name: "ALIF ATHALLAH KHALID", classCode: "SI5009", className: "SI-50-09", assistantCode: "TICS", group: "A" },
  { nim: "102022600034", name: "AGUNG SUDIONO", classCode: "SI5009", className: "SI-50-09", assistantCode: "TICS", group: "A" },
  { nim: "102022600042", name: "ALLUNAN KASIH ANANDA", classCode: "SI5009", className: "SI-50-09", assistantCode: "TICS", group: "A" },
  { nim: "102022600056", name: "FAUZAN DWINANDA PRIMUSADITYO", classCode: "SI5009", className: "SI-50-09", assistantCode: "TICS", group: "A" },
  { nim: "102022600074", name: "SAMUEL DEMERU TASIRILELEU", classCode: "SI5009", className: "SI-50-09", assistantCode: "TICS", group: "A" },
  { nim: "102022600085", name: "RENATA ANTIARA", classCode: "SI5009", className: "SI-50-09", assistantCode: "TICS", group: "A" },
  // GRUP B (SYOW)
  { nim: "102022600103", name: "DARREN LIM", classCode: "SI5009", className: "SI-50-09", assistantCode: "SYOW", group: "B" },
  { nim: "102022600109", name: "SITI FAZLINANINGTYAS", classCode: "SI5009", className: "SI-50-09", assistantCode: "SYOW", group: "B" },
  { nim: "102022600125", name: "AGIL BIMA RIF'AN", classCode: "SI5009", className: "SI-50-09", assistantCode: "SYOW", group: "B" },
  { nim: "102022600143", name: "RIZAL FA'IQ AHMAD RAFIF", classCode: "SI5009", className: "SI-50-09", assistantCode: "SYOW", group: "B" },
  { nim: "102022600159", name: "NADILA YUNDATIRA", classCode: "SI5009", className: "SI-50-09", assistantCode: "SYOW", group: "B" },
  { nim: "102022600160", name: "AZIEL TSAQIF ARDANI", classCode: "SI5009", className: "SI-50-09", assistantCode: "SYOW", group: "B" },
  // GRUP C (ARNA)
  { nim: "102022600180", name: "MUHAMMAD FAREL RIZQY ARIANDRA", classCode: "SI5009", className: "SI-50-09", assistantCode: "ARNA", group: "C" },
  { nim: "102022600196", name: "MAYLA FAYZA AULIA SYAHRIDA", classCode: "SI5009", className: "SI-50-09", assistantCode: "ARNA", group: "C" },
  { nim: "102022600206", name: "DARREL ZHAFIF PRADIPTA", classCode: "SI5009", className: "SI-50-09", assistantCode: "ARNA", group: "C" },
  { nim: "102022600217", name: "NADIA ALMAIRA", classCode: "SI5009", className: "SI-50-09", assistantCode: "ARNA", group: "C" },
  { nim: "102022600230", name: "MOHAMMAD SADEWA", classCode: "SI5009", className: "SI-50-09", assistantCode: "ARNA", group: "C" },
  { nim: "102022600246", name: "IDHAR HARIS HAMAMI", classCode: "SI5009", className: "SI-50-09", assistantCode: "ARNA", group: "C" },
  // GRUP D (ADDH)
  { nim: "102022600262", name: "KEISYA ASYIFA PUTRI PRATAMA HERMAWAN", classCode: "SI5009", className: "SI-50-09", assistantCode: "ADDH", group: "D" },
  { nim: "102022600267", name: "MUHAMMAD ADIEN GUMILANG", classCode: "SI5009", className: "SI-50-09", assistantCode: "ADDH", group: "D" },
  { nim: "102022600283", name: "MOCH. NADHIFTRIO CAHYADI", classCode: "SI5009", className: "SI-50-09", assistantCode: "ADDH", group: "D" },
  { nim: "102022600297", name: "YUSRAFI HIDAYAT", classCode: "SI5009", className: "SI-50-09", assistantCode: "ADDH", group: "D" },
  { nim: "102022600309", name: "REINA RESYANDA WIRDHAWAN", classCode: "SI5009", className: "SI-50-09", assistantCode: "ADDH", group: "D" },
  { nim: "102022600317", name: "ADRIL FAUZAN RAMADAN", classCode: "SI5009", className: "SI-50-09", assistantCode: "ADDH", group: "D" },
  // GRUP E (DSPH)
  { nim: "102022600334", name: "SHADIQ NATHAN ANGGARAKSA", classCode: "SI5009", className: "SI-50-09", assistantCode: "DSPH", group: "E" },
  { nim: "102022600354", name: "AZZA TEGAR NAUFAL ATAULLAH", classCode: "SI5009", className: "SI-50-09", assistantCode: "DSPH", group: "E" },
  { nim: "102022600359", name: "SAIKANA SHAKIRA AFANDI", classCode: "SI5009", className: "SI-50-09", assistantCode: "DSPH", group: "E" },
  { nim: "102022600376", name: "KEYVANO RIFQI ANDRIANSYAH", classCode: "SI5009", className: "SI-50-09", assistantCode: "DSPH", group: "E" },
  { nim: "102022600395", name: "MUHAMMAD ALDI FIRDAUS", classCode: "SI5009", className: "SI-50-09", assistantCode: "DSPH", group: "E" },
  // GRUP F (LAUF)
  { nim: "102022600399", name: "SALMA RAISYA YASMIN", classCode: "SI5009", className: "SI-50-09", assistantCode: "LAUF", group: "F" },
  { nim: "102022600413", name: "FAUZANA FIKRI", classCode: "SI5009", className: "SI-50-09", assistantCode: "LAUF", group: "F" },
  { nim: "102022600430", name: "ASAJ SAMAHATULLAH", classCode: "SI5009", className: "SI-50-09", assistantCode: "LAUF", group: "F" },
  { nim: "102022600447", name: "ZACKY ALFARUQI", classCode: "SI5009", className: "SI-50-09", assistantCode: "LAUF", group: "F" },
  { nim: "102022600461", name: "PINASTIKA NAURAH SYAAKIRAH", classCode: "SI5009", className: "SI-50-09", assistantCode: "LAUF", group: "F" },
  // GRUP G (MJFA)
  { nim: "102022600475", name: "DHIMAS RIZKY PRATAMA", classCode: "SI5009", className: "SI-50-09", assistantCode: "MJFA", group: "G" },
  { nim: "102022600488", name: "DAVIN SETIAWAN PUTRA BEDDU SYAM", classCode: "SI5009", className: "SI-50-09", assistantCode: "MJFA", group: "G" },
  { nim: "102022600505", name: "JOHANES ELKIANUS KELSY SENTUF", classCode: "SI5009", className: "SI-50-09", assistantCode: "MJFA", group: "G" },
  { nim: "102022630006", name: "KEYLA KEISHA DACHI", classCode: "SI5009", className: "SI-50-09", assistantCode: "MJFA", group: "G" },
  { nim: "102022630035", name: "MUHAMMAD AHNAF ISA HAMMAM LISUALLA", classCode: "SI5009", className: "SI-50-09", assistantCode: "MJFA", group: "G" },
];

export const SHIFT_6_STUDENTS: StudentPlotting[] = [
  // GRUP A (IPGA)
  { nim: "102022600013", name: "MUHAMMAD HAFIZH AZMI PUTRA DEFA", classCode: "SI5010", className: "SI-50-10", assistantCode: "IPGA", group: "A" },
  { nim: "102022600016", name: "LATIFA RAMADHANI ASRUL", classCode: "SI5010", className: "SI-50-10", assistantCode: "IPGA", group: "A" },
  { nim: "102022600036", name: "MUHAMMAD DZIKRY", classCode: "SI5010", className: "SI-50-10", assistantCode: "IPGA", group: "A" },
  { nim: "102022600044", name: "INTAN DWI RAMADHANI", classCode: "SI5010", className: "SI-50-10", assistantCode: "IPGA", group: "A" },
  { nim: "102022600057", name: "RADHI YAQDHAN", classCode: "SI5010", className: "SI-50-10", assistantCode: "IPGA", group: "A" },
  { nim: "102022600075", name: "FADHIL ABROR", classCode: "SI5010", className: "SI-50-10", assistantCode: "IPGA", group: "A" },
  { nim: "102022600086", name: "CINTA HAJA PUTIZA", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  // GRUP B (ADRP)
  { nim: "102022600104", name: "MUHAMMAD FAZAL HAFIZ", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  { nim: "102022600110", name: "ALIYA ANGELICA KESUMA", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  { nim: "102022600126", name: "NABIL GHAISAN", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  { nim: "102022600144", name: "NADHIF HUJATUL ISLAM", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  { nim: "102022600161", name: "NABIL ALFIANSYAH", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  // GRUP C (ARSM)
  { nim: "102022600163", name: "KEISYA ALFIANKA APRALIANTO", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },
  { nim: "102022600183", name: "PETER ADHIWIBOWO", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },
  { nim: "102022600198", name: "EL KHAYRA MARSHIFANI ADJIE", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },
  { nim: "102022600208", name: "TRIONALDI SIHALOHO", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },
  { nim: "102022600219", name: "KANYA KALANI RAWIRAHAGI", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },
  { nim: "102022600231", name: "MUHAMMAD KEVIN ANDREAN", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },
  // GRUP D (DEVO)
  { nim: "102022600247", name: "AL PASHA WIRAYUDHA", classCode: "SI5010", className: "SI-50-10", assistantCode: "DEVO", group: "D" },
  { nim: "102022600264", name: "ADHIESTY GHINA NAFSI IN 'AMILLAH", classCode: "SI5010", className: "SI-50-10", assistantCode: "DEVO", group: "D" },
  { nim: "102022600268", name: "RAFI ADITYA PRATAMA", classCode: "SI5010", className: "SI-50-10", assistantCode: "DEVO", group: "D" },
  { nim: "102022600284", name: "MUHAMMAD AZQA ALIFYA", classCode: "SI5010", className: "SI-50-10", assistantCode: "DEVO", group: "D" },
  { nim: "102022600298", name: "MUHAMAD FERNANDA ABDILLAH ISMANA", classCode: "SI5010", className: "SI-50-10", assistantCode: "DEVO", group: "D" },
  { nim: "102022600311", name: "ALINA FEBRIANTI PUTRI", classCode: "SI5010", className: "SI-50-10", assistantCode: "DEVO", group: "D" },
  // GRUP E (HAFK)
  { nim: "102022600318", name: "MUHAMMAD KHOLILUR RAHMAN", classCode: "SI5010", className: "SI-50-10", assistantCode: "HAFK", group: "E" },
  { nim: "102022600335", name: "FARDHAN SHIRAZY", classCode: "SI5010", className: "SI-50-10", assistantCode: "HAFK", group: "E" },
  { nim: "102022600355", name: "FATHIR BIMA SHABRI", classCode: "SI5010", className: "SI-50-10", assistantCode: "HAFK", group: "E" },
  { nim: "102022600362", name: "FATIMATUZZAHRA", classCode: "SI5010", className: "SI-50-10", assistantCode: "HAFK", group: "E" },
  { nim: "102022600377", name: "WILDAN ZALVAREL RISQULLAH", classCode: "SI5010", className: "SI-50-10", assistantCode: "HAFK", group: "E" },
  { nim: "102022600396", name: "LUTHFI AZIS", classCode: "SI5010", className: "SI-50-10", assistantCode: "HAFK", group: "E" },
  // GRUP F (MJFA)
  { nim: "102022600401", name: "SHERLY RESTIYANA", classCode: "SI5010", className: "SI-50-10", assistantCode: "MJFA", group: "F" },
  { nim: "102022600431", name: "MUHAMMAD HAIKAL ADYA", classCode: "SI5010", className: "SI-50-10", assistantCode: "MJFA", group: "F" },
  { nim: "102022600448", name: "KEN GANENDRA", classCode: "SI5010", className: "SI-50-10", assistantCode: "MJFA", group: "F" },
  { nim: "102022600463", name: "MUHAMMAD IBRAHIM AQSHA", classCode: "SI5010", className: "SI-50-10", assistantCode: "MJFA", group: "F" },
  // GRUP G (SYOW)
  { nim: "102022600476", name: "RADEN MUHAMMAD IQBAL", classCode: "SI5010", className: "SI-50-10", assistantCode: "SYOW", group: "G" },
  { nim: "102022600489", name: "RICHARD KENZO POSUMAH", classCode: "SI5010", className: "SI-50-10", assistantCode: "SYOW", group: "G" },
  { nim: "102022600506", name: "TRISTAN KEYMATARI YUSRAN", classCode: "SI5010", className: "SI-50-10", assistantCode: "SYOW", group: "G" },
  { nim: "102022630031", name: "AFZAL AULIA ZAHRAN", classCode: "SI5010", className: "SI-50-10", assistantCode: "SYOW", group: "G" },
  { nim: "102022630037", name: "MUTIARA CHAIRUNNISA", classCode: "SI5010", className: "SI-50-10", assistantCode: "SYOW", group: "G" },
];

export const SHIFT_7_STUDENTS: StudentPlotting[] = [
  // GRUP A (DEVO)
  { nim: "102022500129", name: "SULTAN MUHAMMAD RASYA", classCode: "SI5013", className: "SI-49-08", assistantCode: "DEVO", group: "A" },
  { nim: "102022600017", name: "ALIF AR RASYID VIANDRA", classCode: "SI5013", className: "SI-50-13", assistantCode: "DEVO", group: "A" },
  { nim: "102022600023", name: "KHAILA ZAHRA ANANTA", classCode: "SI5013", className: "SI-50-13", assistantCode: "DEVO", group: "A" },
  { nim: "102022600043", name: "TOMMY ALFARISZI", classCode: "SI5013", className: "SI-50-13", assistantCode: "DEVO", group: "A" },
  { nim: "102022600059", name: "AURIEL TIFFANY PANGGABEAN", classCode: "SI5013", className: "SI-50-13", assistantCode: "DEVO", group: "A" },
  { nim: "102022600061", name: "DENIS HAMDAN SAPUTRA LEDY", classCode: "SI5013", className: "SI-50-13", assistantCode: "DEVO", group: "A" },
  // GRUP B (GRGS)
  { nim: "102022600082", name: "KEYTARO MATTHEW LYFINO", classCode: "SI5013", className: "SI-50-13", assistantCode: "GRGS", group: "B" },
  { nim: "102022600091", name: "SALVIA ZARIAT HENDRIKA", classCode: "SI5013", className: "SI-50-13", assistantCode: "GRGS", group: "B" },
  { nim: "102022600115", name: "NICO FRANSJAYA", classCode: "SI5013", className: "SI-50-13", assistantCode: "GRGS", group: "B" },
  { nim: "102022600120", name: "ANASTASYA SYAFIRA NABILA PUTRI", classCode: "SI5013", className: "SI-50-13", assistantCode: "GRGS", group: "B" },
  { nim: "102022600129", name: "LA ODE ADITYA RAHMAN", classCode: "SI5013", className: "SI-50-13", assistantCode: "GRGS", group: "B" },
  { nim: "102022600147", name: "KHALIFA SABILLY ISKANDAR", classCode: "SI5013", className: "SI-50-13", assistantCode: "GRGS", group: "B" },
  { nim: "102022600165", name: "GIBRAN SHAKA ILYASA", classCode: "SI5013", className: "SI-50-13", assistantCode: "GRGS", group: "B" },
  // GRUP C (ADDH)
  { nim: "102022600173", name: "SITI AISYAH", classCode: "SI5013", className: "SI-50-13", assistantCode: "ADDH", group: "C" },
  { nim: "102022600188", name: "MUHAMMAD AFGAN AZKAR SETIAWAN", classCode: "SI5013", className: "SI-50-13", assistantCode: "ADDH", group: "C" },
  { nim: "102022600202", name: "NI KOMANG AMELIA PUTRI MAHARANI", classCode: "SI5013", className: "SI-50-13", assistantCode: "ADDH", group: "C" },
  { nim: "102022600218", name: "ANDRIAN SETIAWAN", classCode: "SI5013", className: "SI-50-13", assistantCode: "ADDH", group: "C" },
  { nim: "102022600229", name: "MAULINA BENEDITA SITUMORANG", classCode: "SI5013", className: "SI-50-13", assistantCode: "ADDH", group: "C" },
  { nim: "102022600236", name: "MUHAMMAD BOBBY RAFFAEL DHARMA", classCode: "SI5013", className: "SI-50-13", assistantCode: "ADDH", group: "C" },
  // GRUP D (TICS)
  { nim: "102022600251", name: "MUHAMMAD ARDAN UNAIS ALBANI", classCode: "SI5013", className: "SI-50-13", assistantCode: "TICS", group: "D" },
  { nim: "102022600270", name: "GILBERT CHRISTIAN MATTHEW RAJAGUKGUK", classCode: "SI5013", className: "SI-50-13", assistantCode: "TICS", group: "D" },
  { nim: "102022600276", name: "RAUDZETHA NOVIA SAPA'AT", classCode: "SI5013", className: "SI-50-13", assistantCode: "TICS", group: "D" },
  { nim: "102022600288", name: "HAFIZH AHMAD RAISSAN", classCode: "SI5013", className: "SI-50-13", assistantCode: "TICS", group: "D" },
  { nim: "102022600322", name: "FAISAL BADILLAH TAMIN", classCode: "SI5013", className: "SI-50-13", assistantCode: "TICS", group: "D" },
  { nim: "102022600332", name: "AURA KHAIRUNNISA", classCode: "SI5013", className: "SI-50-13", assistantCode: "TICS", group: "D" },
  { nim: "102022600340", name: "DANDI FIRMANSYAH", classCode: "SI5013", className: "SI-50-13", assistantCode: "TICS", group: "D" },
  // GRUP E (FIAG)
  { nim: "102022600360", name: "ZIDAN FARIKHYS SYIFA", classCode: "SI5013", className: "SI-50-13", assistantCode: "FIAG", group: "E" },
  { nim: "102022600365", name: "KEYSYA JOAN VELOVE", classCode: "SI5013", className: "SI-50-13", assistantCode: "FIAG", group: "E" },
  { nim: "102022600381", name: "ABHINAYA HARJA SAPUTRA", classCode: "SI5013", className: "SI-50-13", assistantCode: "FIAG", group: "E" },
  { nim: "102022600403", name: "RASHA FATHI RIZKY", classCode: "SI5013", className: "SI-50-13", assistantCode: "FIAG", group: "E" },
  { nim: "102022600416", name: "SALOMITA NAOMI AFIFA", classCode: "SI5013", className: "SI-50-13", assistantCode: "FIAG", group: "E" },
  { nim: "102022600418", name: "M. AKSYAF ATHA'ILLAH", classCode: "SI5013", className: "SI-50-13", assistantCode: "FIAG", group: "E" },
  { nim: "102022600436", name: "I MADE DHARMA ARSANA", classCode: "SI5013", className: "SI-50-13", assistantCode: "FIAG", group: "E" },
  // GRUP F (DINF)
  { nim: "102022600450", name: "CHARIS FIRMANSYAH", classCode: "SI5013", className: "SI-50-13", assistantCode: "DINF", group: "F" },
  { nim: "102022600465", name: "MUHAMMAD HAIKAL MUBARAK", classCode: "SI5013", className: "SI-50-13", assistantCode: "DINF", group: "F" },
  { nim: "102022600473", name: "ALIYA KHAIRUN NISA", classCode: "SI5013", className: "SI-50-13", assistantCode: "DINF", group: "F" },
  { nim: "102022600491", name: "ASMIL FAHRI MUHAMMAD", classCode: "SI5013", className: "SI-50-13", assistantCode: "DINF", group: "F" },
  { nim: "102022600509", name: "HAYKAL BENZEMA ARIFIN", classCode: "SI5013", className: "SI-50-13", assistantCode: "DINF", group: "F" },
  { nim: "102022630025", name: "DIMAS PRASTAMA", classCode: "SI5013", className: "SI-50-13", assistantCode: "DINF", group: "F" },
  { nim: "102022630042", name: "ELPETRA YEHEZKIEL BIDULANG", classCode: "SI5013", className: "SI-50-13", assistantCode: "DINF", group: "F" },
];

export const SHIFT_8_STUDENTS: StudentPlotting[] = [
  // GRUP A (MJFA)
  { nim: "102022600006", name: "FERDINAN DANI NASUTION", classCode: "SI5005", className: "SI-50-05", assistantCode: "MJFA", group: "A" },
  { nim: "102022600028", name: "ZAKWAN HALIM", classCode: "SI5005", className: "SI-50-05", assistantCode: "MJFA", group: "A" },
  { nim: "102022600038", name: "KHAIRA ERIKA HAMEERA", classCode: "SI5005", className: "SI-50-05", assistantCode: "MJFA", group: "A" },
  { nim: "102022600052", name: "MUHAMMAD ZAKI AL-MUBARRAK", classCode: "SI5005", className: "SI-50-05", assistantCode: "MJFA", group: "A" },
  { nim: "102022600069", name: "GALIH GINANJAR IBADURROHMAN", classCode: "SI5005", className: "SI-50-05", assistantCode: "MJFA", group: "A" },
  { nim: "102022600078", name: "NAURAH ZHAFIRA KHAIRUNNISA", classCode: "SI5005", className: "SI-50-05", assistantCode: "MJFA", group: "A" },
  { nim: "102022600096", name: "MUHAMAD RAFI AL-GHIFFARI", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  // GRUP B (MUDI)
  { nim: "102022600105", name: "KEISHA AULIA SAABIRA", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  { nim: "102022600119", name: "MUHAMMAD HAFIDZ AMRULLAH", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  { nim: "102022600135", name: "CONDRO WIDODO", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  { nim: "102022600142", name: "ANAMIKA LANA PURNOMO PUTERI", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  { nim: "102022600155", name: "MARCEL LUKMANSYAH", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  { nim: "102022600174", name: "JERICO SIAHAAN", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },
  // GRUP C (DSPH)
  { nim: "102022600185", name: "RANA ZAHRA NAILAL HUSNA", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },
  { nim: "102022600199", name: "RAIHAN HERYANTO ZHAHIR", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },
  { nim: "102022600212", name: "NAQIYA AQUILANI AZFA", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },
  { nim: "102022600225", name: "MUHAMMAD ZIDAN FIRDAUS", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },
  { nim: "102022600242", name: "AHMAD HIKAM", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },
  // GRUP D (MACY)
  { nim: "102022600253", name: "SITI ZUARIYAH KHAFSOH", classCode: "SI5005", className: "SI-50-05", assistantCode: "MACY", group: "D" },
  { nim: "102022600259", name: "REYHAN AL FAKHRI", classCode: "SI5005", className: "SI-50-05", assistantCode: "MACY", group: "D" },
  { nim: "102022600278", name: "NOVANDRA ARIA BUDI RASPATI", classCode: "SI5005", className: "SI-50-05", assistantCode: "MACY", group: "D" },
  { nim: "102022600294", name: "MUHAMMAD SALMAN HARITS", classCode: "SI5005", className: "SI-50-05", assistantCode: "MACY", group: "D" },
  { nim: "102022600301", name: "EMILIA CESILIA SINAGA", classCode: "SI5005", className: "SI-50-05", assistantCode: "MACY", group: "D" },
  { nim: "102022600313", name: "CHANTREA FAVIAN MAHARDIKA", classCode: "SI5005", className: "SI-50-05", assistantCode: "MACY", group: "D" },
  // GRUP E (ARNA)
  { nim: "102022600328", name: "MUHAMMAD GABRIELLE AL GHIFAHRY WIBISONO", classCode: "SI5005", className: "SI-50-05", assistantCode: "ARNA", group: "E" },
  { nim: "102022600345", name: "CLARISSA AUDREY DIAR AZZAHRAH", classCode: "SI5005", className: "SI-50-05", assistantCode: "ARNA", group: "E" },
  { nim: "102022600348", name: "GALIH HANGGARA", classCode: "SI5005", className: "SI-50-05", assistantCode: "ARNA", group: "E" },
  { nim: "102022600371", name: "REFI ADITIA AFDAL", classCode: "SI5005", className: "SI-50-05", assistantCode: "ARNA", group: "E" },
  { nim: "102022600386", name: "AURELIA CATLINA CHIARA PUTRI", classCode: "SI5005", className: "SI-50-05", assistantCode: "ARNA", group: "E" },
  { nim: "102022600389", name: "MUMU", classCode: "SI5005", className: "SI-50-05", assistantCode: "ARNA", group: "E" },
  // GRUP F (JBJR)
  { nim: "102022600409", name: "RASYA ADITYA RAMADHAN", classCode: "SI5005", className: "SI-50-05", assistantCode: "JBJR", group: "F" },
  { nim: "102022600424", name: "MUHAMMAD RASYID RAMADHAN PUTRA SANTOSO", classCode: "SI5005", className: "SI-50-05", assistantCode: "JBJR", group: "F" },
  { nim: "102022600440", name: "ZIVANAYA LIVIA YUSUF", classCode: "SI5005", className: "SI-50-05", assistantCode: "JBJR", group: "F" },
  { nim: "102022600444", name: "MUHAMMAD ZHAFRAN", classCode: "SI5005", className: "SI-50-05", assistantCode: "JBJR", group: "F" },
  { nim: "102022600457", name: "M. ALIEF MA'RIFATULLAH AZ ZIKRY", classCode: "SI5005", className: "SI-50-05", assistantCode: "JBJR", group: "F" },
  // GRUP G (MUNR)
  { nim: "102022600470", name: "NEOFRANZA ADHITYA PURWANTO", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUNR", group: "G" },
  { nim: "102022600496", name: "MAHARANI DIAN LARASATI", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUNR", group: "G" },
  { nim: "102022600499", name: "JOHANES GLEN BAISIA", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUNR", group: "G" },
  { nim: "102022630005", name: "KETY RACHEL HARIANJA", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUNR", group: "G" },
  { nim: "102022630044", name: "MUHAMMAD NABIL SAFWAN", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUNR", group: "G" },
];

export const SHIFT_9_STUDENTS: StudentPlotting[] = [
  // GRUP A (HAFK)
  { nim: "102022600003", name: "REYNALDI PASKALIS SIMBOLON", classCode: "SI5003", className: "SI-50-03", assistantCode: "HAFK", group: "A" },
  { nim: "102022600004", name: "SALSABILA", classCode: "SI5003", className: "SI-50-03", assistantCode: "HAFK", group: "A" },
  { nim: "102022600025", name: "ZAKY PUTRA", classCode: "SI5003", className: "SI-50-03", assistantCode: "HAFK", group: "A" },
  { nim: "102022600032", name: "FANNY NAILATUL IZZAH", classCode: "SI5003", className: "SI-50-03", assistantCode: "HAFK", group: "A" },
  { nim: "102022600049", name: "FRANCESCO REZA SINAGA", classCode: "SI5003", className: "SI-50-03", assistantCode: "HAFK", group: "A" },
  { nim: "102022600067", name: "RAFI'IHAQQANI", classCode: "SI5003", className: "SI-50-03", assistantCode: "HAFK", group: "A" },
  // GRUP B (ALRS)
  { nim: "102022600070", name: "SASKIA PUTRI NAYA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  { nim: "102022600092", name: "M DINEJAD AULI", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  { nim: "102022600099", name: "GISHELLA MAYRINA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  { nim: "102022600117", name: "FAZA ADIRA WIBISANA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  { nim: "102022600140", name: "AZKIA ASSYFA NURAHMAH", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  { nim: "102022600153", name: "NOVYANDRIE TEGUH WIJAYA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  // GRUP C (NNUA)
  { nim: "102022600171", name: "MUHAMAD FACHRIE SALIM", classCode: "SI5003", className: "SI-50-03", assistantCode: "NNUA", group: "C" },
  { nim: "102022600182", name: "FAUSTINA JESSICA WINDRIYANI", classCode: "SI5003", className: "SI-50-03", assistantCode: "NNUA", group: "C" },
  { nim: "102022600195", name: "MUHAMMAD FASLI HABIEBIE", classCode: "SI5003", className: "SI-50-03", assistantCode: "NNUA", group: "C" },
  { nim: "102022600210", name: "VIONA MALIKA NURYANTO", classCode: "SI5003", className: "SI-50-03", assistantCode: "NNUA", group: "C" },
  { nim: "102022600240", name: "ANDIKA MOH YUSUP", classCode: "SI5003", className: "SI-50-03", assistantCode: "NNUA", group: "C" },
  { nim: "102022600248", name: "NAJLA ALFAYA SYAZWINA", classCode: "SI5003", className: "SI-50-03", assistantCode: "NNUA", group: "C" },
  // GRUP D (RAAP)
  { nim: "102022600257", name: "PUTRA ADHA NAWAWI", classCode: "SI5003", className: "SI-50-03", assistantCode: "RAAP", group: "D" },
  { nim: "102022600275", name: "RANDI SEPTIANDI", classCode: "SI5003", className: "SI-50-03", assistantCode: "RAAP", group: "D" },
  { nim: "102022600292", name: "AULIA LAIBA HANIFIA SURYADI", classCode: "SI5003", className: "SI-50-03", assistantCode: "RAAP", group: "D" },
  { nim: "102022600293", name: "ARIIQ ANRISA PUTRA", classCode: "SI5003", className: "SI-50-03", assistantCode: "RAAP", group: "D" },
  { nim: "102022600305", name: "RASYA RESTU BUMI", classCode: "SI5003", className: "SI-50-03", assistantCode: "RAAP", group: "D" },
  { nim: "102022600326", name: "RYANT ALBARO DZAKWAN", classCode: "SI5003", className: "SI-50-03", assistantCode: "RAAP", group: "D" },
  // GRUP E (JBJR)
  { nim: "102022600341", name: "KEYZA JIHAN NUR AMELLIA", classCode: "SI5003", className: "SI-50-03", assistantCode: "JBJR", group: "E" },
  { nim: "102022600347", name: "MUHAMMAD ABDULLAH RIFAI NAJID", classCode: "SI5003", className: "SI-50-03", assistantCode: "JBJR", group: "E" },
  { nim: "102022600369", name: "ALIFHY NAFIS RAHMATAN", classCode: "SI5003", className: "SI-50-03", assistantCode: "JBJR", group: "E" },
  { nim: "102022600379", name: "FATIMAH AZZAHRO NURDIN", classCode: "SI5003", className: "SI-50-03", assistantCode: "JBJR", group: "E" },
  { nim: "102022600385", name: "M. FARIS", classCode: "SI5003", className: "SI-50-03", assistantCode: "JBJR", group: "E" },
  { nim: "102022600407", name: "ALVARO MANZAREK", classCode: "SI5003", className: "SI-50-03", assistantCode: "JBJR", group: "E" },
  // GRUP F (MUHA)
  { nim: "102022600422", name: "ARYO TEGUH RAMADHAN", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  { nim: "102022600433", name: "KHALILA MALIKA", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  { nim: "102022600441", name: "ANAK AGUNG GEDE BAGUS PRAJNA BHASKARA", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  { nim: "102022600454", name: "KAMAYUGA DZIKRA NURKAMIL", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  { nim: "102022600469", name: "ATTAYA MIKHAIL", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  { nim: "102022600482", name: "M YUSRAN AKSA", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  // GRUP G (ADRP)
  { nim: "102022600493", name: "BINTANG MULIA KAMBA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022600513", name: "NICHOLAS MYTEN SIREGAR", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022630011", name: "MUHAMMAD RASYA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022630016", name: "ARFAN FARRAS RAHMATULLAH", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022630047", name: "KALEB FRANKLIN BUKSALWEMBUN", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022680033", name: "YUL AMROZI", classCode: "SI5003", className: "BS1SIX-50-REG", assistantCode: "ADRP", group: "G" },
];

export const SHIFT_10_STUDENTS: StudentPlotting[] = [
  // GRUP A (RAAP)
  { nim: "102022600008", name: "GABRYELA DEBORA KAROLINA SINAGA", classCode: "SI5006", className: "SI-50-06", assistantCode: "RAAP", group: "A" },
  { nim: "102022600030", name: "REZA KEMAL PASHA", classCode: "SI5006", className: "SI-50-06", assistantCode: "RAAP", group: "A" },
  { nim: "102022600039", name: "OLIVIA LARISSA", classCode: "SI5006", className: "SI-50-06", assistantCode: "RAAP", group: "A" },
  { nim: "102022600053", name: "ICHSANUL MUARIFIN", classCode: "SI5006", className: "SI-50-06", assistantCode: "RAAP", group: "A" },
  { nim: "102022600071", name: "AHMAD QURTUBIE", classCode: "SI5006", className: "SI-50-06", assistantCode: "RAAP", group: "A" },
  { nim: "102022600079", name: "ANGGITA SHAFIYYAH PUTRI", classCode: "SI5006", className: "SI-50-06", assistantCode: "RAAP", group: "A" },
  // GRUP B (ARSM)
  { nim: "102022600097", name: "PANDU CAESARIO", classCode: "SI5006", className: "SI-50-06", assistantCode: "ARSM", group: "B" },
  { nim: "102022600106", name: "YESIKA EVLIN", classCode: "SI5006", className: "SI-50-06", assistantCode: "ARSM", group: "B" },
  { nim: "102022600121", name: "PRAMA PASHA NUGRAHA", classCode: "SI5006", className: "SI-50-06", assistantCode: "ARSM", group: "B" },
  { nim: "102022600136", name: "MUHAMMAD DANIAL NAFIS", classCode: "SI5006", className: "SI-50-06", assistantCode: "ARSM", group: "B" },
  { nim: "102022600149", name: "VIZZYA MAULIDA AZ ZAHRA", classCode: "SI5006", className: "SI-50-06", assistantCode: "ARSM", group: "B" },
  { nim: "102022600156", name: "YOHANES JUAN BIMO ELU", classCode: "SI5006", className: "SI-50-06", assistantCode: "ARSM", group: "B" },
  // GRUP C (GRGS)
  { nim: "102022600175", name: "AFRICO PUTRA PARTOGI", classCode: "SI5006", className: "SI-50-06", assistantCode: "GRGS", group: "C" },
  { nim: "102022600190", name: "KHARISSA ZHAFIRA", classCode: "SI5006", className: "SI-50-06", assistantCode: "GRGS", group: "C" },
  { nim: "102022600200", name: "LUTVI AZIEZ MAULANA", classCode: "SI5006", className: "SI-50-06", assistantCode: "GRGS", group: "C" },
  { nim: "102022600213", name: "CINDY LAKSITA AJIE", classCode: "SI5006", className: "SI-50-06", assistantCode: "GRGS", group: "C" },
  { nim: "102022600226", name: "DYMAS JAYADININGRAT", classCode: "SI5006", className: "SI-50-06", assistantCode: "GRGS", group: "C" },
  { nim: "102022600243", name: "ARVEL PRAYOGA PRAJA", classCode: "SI5006", className: "SI-50-06", assistantCode: "GRGS", group: "C" },
  // GRUP D (AZMH)
  { nim: "102022600260", name: "IQBAL HAKIM ROBANI", classCode: "SI5006", className: "SI-50-06", assistantCode: "AZMH", group: "D" },
  { nim: "102022600279", name: "RAFFI GUSTI PUTRA", classCode: "SI5006", className: "SI-50-06", assistantCode: "AZMH", group: "D" },
  { nim: "102022600295", name: "NIZAMUDIN FAQIH", classCode: "SI5006", className: "SI-50-06", assistantCode: "AZMH", group: "D" },
  { nim: "102022600306", name: "NAYLA SHOFIYAH AZZAHRA", classCode: "SI5006", className: "SI-50-06", assistantCode: "AZMH", group: "D" },
  { nim: "102022600314", name: "RIDHO HAFIZH", classCode: "SI5006", className: "SI-50-06", assistantCode: "AZMH", group: "D" },
  { nim: "102022600329", name: "DAFFA ADITYA PUTRA", classCode: "SI5006", className: "SI-50-06", assistantCode: "AZMH", group: "D" },
  // GRUP E (IREM)
  { nim: "102022600349", name: "RAIHAN ZAYYAN NABIL", classCode: "SI5006", className: "SI-50-06", assistantCode: "IREM", group: "E" },
  { nim: "102022600351", name: "DAYVA FAIZAH", classCode: "SI5006", className: "SI-50-06", assistantCode: "IREM", group: "E" },
  { nim: "102022600373", name: "MUHAMMAD WILDAN NURROHMAN", classCode: "SI5006", className: "SI-50-06", assistantCode: "IREM", group: "E" },
  { nim: "102022600387", name: "ZENONI JINGGA ALUNA TINAYA WIJANARKO", classCode: "SI5006", className: "SI-50-06", assistantCode: "IREM", group: "E" },
  { nim: "102022600391", name: "M ABIDAR AL GHIFARI", classCode: "SI5006", className: "SI-50-06", assistantCode: "IREM", group: "E" },
  { nim: "102022600410", name: "RAFA ADYA SYAFIQ", classCode: "SI5006", className: "SI-50-06", assistantCode: "IREM", group: "E" },
  // GRUP F (LAUF)
  { nim: "102022600426", name: "BHATARA NITISARA PUTRA", classCode: "SI5006", className: "SI-50-06", assistantCode: "LAUF", group: "F" },
  { nim: "102022600443", name: "SHERLY FEBRINIA LESTARI", classCode: "SI5006", className: "SI-50-06", assistantCode: "LAUF", group: "F" },
  { nim: "102022600445", name: "SASANDO Y.NDAUMANU", classCode: "SI5006", className: "SI-50-06", assistantCode: "LAUF", group: "F" },
  { nim: "102022600458", name: "AHMAD HASBI RASYID", classCode: "SI5006", className: "SI-50-06", assistantCode: "LAUF", group: "F" },
  { nim: "102022600484", name: "A.MUH KAYVAN OCTO RIFA", classCode: "SI5006", className: "SI-50-06", assistantCode: "LAUF", group: "F" },
  // GRUP G (ADRP)
  { nim: "102022600500", name: "SHINDY CHRISTIN BARANY", classCode: "SI5006", className: "SI-50-06", assistantCode: "ADRP", group: "G" },
  { nim: "102022600501", name: "RAIHAN ADITYA TARIDALA", classCode: "SI5006", className: "SI-50-06", assistantCode: "ADRP", group: "G" },
  { nim: "102022630004", name: "ALFREDO TINAMBUNAN", classCode: "SI5006", className: "SI-50-06", assistantCode: "ADRP", group: "G" },
  { nim: "102022630019", name: "GHEA AINUL WARDAH", classCode: "SI5006", className: "SI-50-06", assistantCode: "ADRP", group: "G" },
  { nim: "102022630040", name: "IBRAHIM HUSEIN", classCode: "SI5006", className: "SI-50-06", assistantCode: "ADRP", group: "G" },
];

export const SHIFT_11_STUDENTS: StudentPlotting[] = [
  // GRUP A (AITS)
  { nim: "102022600001", name: "INTAN AFRIANI", classCode: "SI5001", className: "SI-50-01", assistantCode: "AITS", group: "A" },
  { nim: "102022600020", name: "NABIL HARYANDA KAMAL", classCode: "SI5001", className: "SI-50-01", assistantCode: "AITS", group: "A" },
  { nim: "102022600026", name: "QARIRA HANIFA", classCode: "SI5001", className: "SI-50-01", assistantCode: "AITS", group: "A" },
  { nim: "102022600047", name: "M. LUTHFI ADRIKA", classCode: "SI5001", className: "SI-50-01", assistantCode: "AITS", group: "A" },
  { nim: "102022600062", name: "MELATI LASMARITO", classCode: "SI5001", className: "SI-50-01", assistantCode: "AITS", group: "A" },
  { nim: "102022600064", name: "MUHAMMAD AL FIKRI Y", classCode: "SI5001", className: "SI-50-01", assistantCode: "AITS", group: "A" },
  { nim: "102022600087", name: "MUHAMAD KEYZAR ABIYASA", classCode: "SI5001", className: "SI-50-01", assistantCode: "ALRS", group: "B" },
  // GRUP B (ALRS)
  { nim: "102022600094", name: "REVINA RIZQA FADHILLAH", classCode: "SI5001", className: "SI-50-01", assistantCode: "ALRS", group: "B" },
  { nim: "102022600116", name: "RAFA ADITYA RUSLI", classCode: "SI5001", className: "SI-50-01", assistantCode: "ALRS", group: "B" },
  { nim: "102022600130", name: "NABILA INAYATULLAH", classCode: "SI5001", className: "SI-50-01", assistantCode: "ALRS", group: "B" },
  { nim: "102022600132", name: "AIRLANGGA EVORIUS FARREL", classCode: "SI5001", className: "SI-50-01", assistantCode: "ALRS", group: "B" },
  { nim: "102022600150", name: "DANENDRA AMMAR LATIF", classCode: "SI5001", className: "SI-50-01", assistantCode: "ALRS", group: "B" },
  // GRUP C (AZMH)
  { nim: "102022600169", name: "HARITS FARREL HIDAYAT", classCode: "SI5001", className: "SI-50-01", assistantCode: "AZMH", group: "C" },
  { nim: "102022600179", name: "FARSYA ZHARIFA RIZQA RAMADHANI", classCode: "SI5001", className: "SI-50-01", assistantCode: "AZMH", group: "C" },
  { nim: "102022600191", name: "GALUH ZUFAR AHMAD", classCode: "SI5001", className: "SI-50-01", assistantCode: "AZMH", group: "C" },
  { nim: "102022600207", name: "MEISYIA ARNELITA SIBORO", classCode: "SI5001", className: "SI-50-01", assistantCode: "AZMH", group: "C" },
  { nim: "102022600221", name: "FINNAHARI FATHUL AKBAR", classCode: "SI5001", className: "SI-50-01", assistantCode: "AZMH", group: "C" },
  { nim: "102022600235", name: "CHINTYA RAMADHANI", classCode: "SI5001", className: "SI-50-01", assistantCode: "AZMH", group: "C" },
  // GRUP D (IREM)
  { nim: "102022600238", name: "AREAL CAESAR ISLAMI", classCode: "SI5001", className: "SI-50-01", assistantCode: "IREM", group: "D" },
  { nim: "102022600255", name: "ADITIYA MULYAWARMAN", classCode: "SI5001", className: "SI-50-01", assistantCode: "IREM", group: "D" },
  { nim: "102022600273", name: "RIZKY ANDHIKA PRAJA", classCode: "SI5001", className: "SI-50-01", assistantCode: "IREM", group: "D" },
  { nim: "102022600285", name: "RAIQA ALYA RAMADHANI", classCode: "SI5001", className: "SI-50-01", assistantCode: "IREM", group: "D" },
  { nim: "102022600290", name: "MUHAMMAD KEANU SURYA MULYA", classCode: "SI5001", className: "SI-50-01", assistantCode: "IREM", group: "D" },
  { nim: "102022600303", name: "ABIEL AL-FAREL SYAH", classCode: "SI5001", className: "SI-50-01", assistantCode: "IREM", group: "D" },
  // GRUP E (ARSM)
  { nim: "102022600324", name: "SULTHAN RASYID SIDQI", classCode: "SI5001", className: "SI-50-01", assistantCode: "ARSM", group: "E" },
  { nim: "102022600337", name: "ANGELIA SABANA DZIKRA", classCode: "SI5001", className: "SI-50-01", assistantCode: "ARSM", group: "E" },
  { nim: "102022600344", name: "MAZKAFIQLLA ZAINRAJA SANTOSA", classCode: "SI5001", className: "SI-50-01", assistantCode: "ARSM", group: "E" },
  { nim: "102022600366", name: "RADITYA KUSNA WIRASAKA", classCode: "SI5001", className: "SI-50-01", assistantCode: "ARSM", group: "E" },
  { nim: "102022600405", name: "GALEH RADYA PRATAMA RAMADHAN", classCode: "SI5001", className: "SI-50-01", assistantCode: "ARSM", group: "E" },
  { nim: "102022600420", name: "MUHAMAD AUZAN HIBATULLAH", classCode: "SI5001", className: "SI-50-01", assistantCode: "ARSM", group: "E" },
  // GRUP F (RAAP)
  { nim: "102022600427", name: "RAYA AELIA AL'ARAF YUWONO", classCode: "SI5001", className: "SI-50-01", assistantCode: "RAAP", group: "F" },
  { nim: "102022600438", name: "MADE FEBRIAN JOSHUA NUGRAHA", classCode: "SI5001", className: "SI-50-01", assistantCode: "RAAP", group: "F" },
  { nim: "102022600452", name: "MUHAMMAD NAWFAL ARFANI PUTRA", classCode: "SI5001", className: "SI-50-01", assistantCode: "RAAP", group: "F" },
  { nim: "102022600479", name: "VANIA HASSYA KHARISA TOEKIDJO", classCode: "SI5001", className: "SI-50-01", assistantCode: "RAAP", group: "F" },
  { nim: "102022600481", name: "MOHAMAD ADAFFA LUTHFI MUNAJAT", classCode: "SI5001", className: "SI-50-01", assistantCode: "RAAP", group: "F" },
  { nim: "102022600494", name: "ANDI MUHAMMAD ZAKY ALFAIN", classCode: "SI5001", className: "SI-50-01", assistantCode: "RAAP", group: "F" },
  // GRUP G (DINF)
  { nim: "102022600511", name: "MOCH. RAFI CAHYALESMANA", classCode: "SI5001", className: "SI-50-01", assistantCode: "DINF", group: "G" },
  { nim: "102022630001", name: "FIRAZ ALFAHAN", classCode: "SI5001", className: "SI-50-01", assistantCode: "DINF", group: "G" },
  { nim: "102022630028", name: "NAYLA EMIRATY", classCode: "SI5001", className: "SI-50-01", assistantCode: "DINF", group: "G" },
  { nim: "102022630030", name: "MUHAMMAD HAFIZH ADITIYA", classCode: "SI5001", className: "SI-50-01", assistantCode: "DINF", group: "G" },
  { nim: "102022630038", name: "MUHAMMAD RIZKY PRASETYA", classCode: "SI5001", className: "SI-50-01", assistantCode: "DINF", group: "G" },
];

export const SHIFT_12_STUDENTS: StudentPlotting[] = [
  // GRUP A (ADRP)
  { nim: "102022300383", name: "TSAQIF AMMAR MAKMUN", classCode: "SI5008", className: "SI-47-08", assistantCode: "ADRP", group: "A" },
  { nim: "102022600010", name: "SYAIFULLAH MIKAIL OBAMA TARIGAN", classCode: "SI5008", className: "SI-50-08", assistantCode: "ADRP", group: "A" },
  { nim: "102022600011", name: "ASYIFA ZHAFIRAH AKMAL", classCode: "SI5008", className: "SI-50-08", assistantCode: "ADRP", group: "A" },
  { nim: "102022600033", name: "MOHAMAD KEMAL ARTHUR", classCode: "SI5008", className: "SI-50-08", assistantCode: "ADRP", group: "A" },
  { nim: "102022600055", name: "ALFI SYAHRIN AL QADRI", classCode: "SI5008", className: "SI-50-08", assistantCode: "ADRP", group: "A" },
  { nim: "102022600073", name: "MUHAMAD ZAKI ABDILLAH", classCode: "SI5008", className: "SI-50-08", assistantCode: "ADRP", group: "A" },
  { nim: "102022600084", name: "NADHIFAH ARISANTI", classCode: "SI5008", className: "SI-50-08", assistantCode: "INTC", group: "B" },
  // GRUP B (INTC)
  { nim: "102022600101", name: "MUHAMAD BARULIAN SYAH", classCode: "SI5008", className: "SI-50-08", assistantCode: "INTC", group: "B" },
  { nim: "102022600108", name: "CINDY LUXIECIA SYILL", classCode: "SI5008", className: "SI-50-08", assistantCode: "INTC", group: "B" },
  { nim: "102022600123", name: "BRYANT LEONARD KENNAHBOY BANUREA", classCode: "SI5008", className: "SI-50-08", assistantCode: "INTC", group: "B" },
  { nim: "102022600139", name: "JERICHO BENHAIM PASKASEAN SIHOMBING", classCode: "SI5008", className: "SI-50-08", assistantCode: "INTC", group: "B" },
  { nim: "102022600157", name: "SHAILJEEVAN MOHAMMED ALIBRAHIM HAMESHA", classCode: "SI5008", className: "SI-50-08", assistantCode: "INTC", group: "B" },
  { nim: "102022600158", name: "KAYLA FALIHA KHALIS", classCode: "SI5008", className: "SI-50-08", assistantCode: "MUHA", group: "C" },
  // GRUP C (MUHA)
  { nim: "102022600178", name: "DAFFA AMRU FADHILA", classCode: "SI5008", className: "SI-50-08", assistantCode: "MUHA", group: "C" },
  { nim: "102022600194", name: "ZAHRA SALSA FADILLA", classCode: "SI5008", className: "SI-50-08", assistantCode: "MUHA", group: "C" },
  { nim: "102022600205", name: "FARREL HASSYA NATAMA", classCode: "SI5008", className: "SI-50-08", assistantCode: "MUHA", group: "C" },
  { nim: "102022600216", name: "FAHIRA SALMA AZAHRA", classCode: "SI5008", className: "SI-50-08", assistantCode: "MUHA", group: "C" },
  { nim: "102022600228", name: "MAULANA AGIS ANTAREZA", classCode: "SI5008", className: "SI-50-08", assistantCode: "MUHA", group: "C" },
  // GRUP D (FAAA)
  { nim: "102022600245", name: "YONATHAN MARLEY ELANG TAIRAS", classCode: "SI5008", className: "SI-50-08", assistantCode: "FAAA", group: "D" },
  { nim: "102022600261", name: "DINA OLIVIA PURNOMO", classCode: "SI5008", className: "SI-50-08", assistantCode: "FAAA", group: "D" },
  { nim: "102022600265", name: "ABDULLAH AZZAM", classCode: "SI5008", className: "SI-50-08", assistantCode: "FAAA", group: "D" },
  { nim: "102022600281", name: "MUHAMMAD FARELL JULIANDANI DZAKWAN", classCode: "SI5008", className: "SI-50-08", assistantCode: "FAAA", group: "D" },
  { nim: "102022600296", name: "JAYDEN DARRYL HARTANTHO", classCode: "SI5008", className: "SI-50-08", assistantCode: "FAAA", group: "D" },
  { nim: "102022600308", name: "NAILA AZAHRA", classCode: "SI5008", className: "SI-50-08", assistantCode: "FAAA", group: "D" },
  // GRUP E (MAYR)
  { nim: "102022600316", name: "KAYYAS ILHAN ADIARTO", classCode: "SI5008", className: "SI-50-08", assistantCode: "MAYR", group: "E" },
  { nim: "102022600333", name: "REINALDY FAIQ MABKHUT", classCode: "SI5008", className: "SI-50-08", assistantCode: "MAYR", group: "E" },
  { nim: "102022600353", name: "BALTHAZAR AUFA AMANULLAH", classCode: "SI5008", className: "SI-50-08", assistantCode: "MAYR", group: "E" },
  { nim: "102022600357", name: "PURI PUTRI YULIANA", classCode: "SI5008", className: "SI-50-08", assistantCode: "MAYR", group: "E" },
  { nim: "102022600375", name: "BIMA PERKASA MANDIRI", classCode: "SI5008", className: "SI-50-08", assistantCode: "MAYR", group: "E" },
  { nim: "102022600394", name: "FALDIS IKRAM FIRJATULLAH", classCode: "SI5008", className: "SI-50-08", assistantCode: "MAYR", group: "E" },
  // GRUP F (AITS)
  { nim: "102022600398", name: "DAVINA PUTRI MALADDINI", classCode: "SI5008", className: "SI-50-08", assistantCode: "AITS", group: "F" },
  { nim: "102022600412", name: "RAGIL SETYO NUGROHO", classCode: "SI5008", className: "SI-50-08", assistantCode: "AITS", group: "F" },
  { nim: "102022600429", name: "MUHAMMAD FAIZ ZHAFRAN", classCode: "SI5008", className: "SI-50-08", assistantCode: "AITS", group: "F" },
  { nim: "102022600446", name: "YOSEF FERNANDO SALVA RODJA", classCode: "SI5008", className: "SI-50-08", assistantCode: "AITS", group: "F" },
  { nim: "102022600460", name: "NEYSZA REGITA PUTRI", classCode: "SI5008", className: "SI-50-08", assistantCode: "AITS", group: "F" },
  // GRUP G (AZMH)
  { nim: "102022600462", name: "ADNAN MAULIDAN SIBAWEH", classCode: "SI5008", className: "SI-50-08", assistantCode: "AZMH", group: "G" },
  { nim: "102022600471", name: "AMMAR GHOZY MUFLIHIN", classCode: "SI5008", className: "SI-50-08", assistantCode: "AZMH", group: "G" },
  { nim: "102022600486", name: "TARAWU PAREWALANGI AGELSYAH", classCode: "SI5008", className: "SI-50-08", assistantCode: "AZMH", group: "G" },
  { nim: "102022600504", name: "DANIEL CRISTY YAWAN", classCode: "SI5008", className: "SI-50-08", assistantCode: "AZMH", group: "G" },
  { nim: "102022630007", name: "SYAHGITA DENASA ELVO", classCode: "SI5008", className: "SI-50-08", assistantCode: "AZMH", group: "G" },
];

export const SHIFT_13_STUDENTS: StudentPlotting[] = [
  // GRUP A (RAZA)
  { nim: "102022600310", name: "AYESHA MJOURI RAGHEEDA", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "RAZA", group: "A" },
  { nim: "102022600372", name: "ABHARINA KHAYLA BATRISYIA", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "RAZA", group: "A" },
  { nim: "102022600390", name: "M. WALDI SUPRIADI", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "RAZA", group: "A" },
  { nim: "102022600498", name: "EVAN NARARYA HASBA PUTRA", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "RAZA", group: "A" },
  { nim: "102022640001", name: "SYARIFAH RAHMA ALIYA", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "RAZA", group: "A" },
  // GRUP B (FAAA)
  { nim: "102022640002", name: "BINTANG ELISABETH SARAH NAINGGOLAN", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "FAAA", group: "B" },
  { nim: "102022640003", name: "ANDI MOHAMMAD GHIFFARI RAMADHAN", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "FAAA", group: "B" },
  { nim: "102022640004", name: "AUZAN LAKASWARA SIDIK", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "FAAA", group: "B" },
  { nim: "102022640005", name: "ALDI RAHMATULLOH", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "FAAA", group: "B" },
  { nim: "102022640006", name: "KADEEJA RANIYA MECCA RASULI", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "FAAA", group: "B" },
  // GRUP C (RAAP)
  { nim: "102022640007", name: "JOVAN LYONEL REISEL SAMPURNA", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "RAAP", group: "C" },
  { nim: "102022640008", name: "ANDI RIVALDI AL AFGHANI", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "RAAP", group: "C" },
  { nim: "102022640011", name: "IVODIO ALBERTO SOARES DA COSTA", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "RAAP", group: "C" },
  { nim: "102022640012", name: "FARIS MOHAMED DAIFALLA YAGOUB", classCode: "SI50INT", className: "SI-50-INT", assistantCode: "RAAP", group: "C" },
];

export const SHIFT_14_STUDENTS: StudentPlotting[] = [
  // GRUP A (IREM)
  { nim: "102022600007", name: "FATHI RIZKY", classCode: "SI5007", className: "SI-50-07", assistantCode: "IREM", group: "A" },
  { nim: "102022600009", name: "KELLY A. NAINGGOLAN", classCode: "SI5007", className: "SI-50-07", assistantCode: "IREM", group: "A" },
  { nim: "102022600031", name: "MUHAMMAD RAZIQ", classCode: "SI5007", className: "SI-50-07", assistantCode: "IREM", group: "A" },
  { nim: "102022600040", name: "FIRANTHI CLAUDYA AZZAHRA", classCode: "SI5007", className: "SI-50-07", assistantCode: "IREM", group: "A" },
  { nim: "102022600054", name: "DHIDIE FADILLA SYA'BANI", classCode: "SI5007", className: "SI-50-07", assistantCode: "IREM", group: "A" },
  { nim: "102022600072", name: "M ZHAFIR ZAIDAN HAQ AL AMIN", classCode: "SI5007", className: "SI-50-07", assistantCode: "IREM", group: "A" },
  { nim: "102022600080", name: "NUR AISYAH MUFIIDAH SIREGAR", classCode: "SI5007", className: "SI-50-07", assistantCode: "IREM", group: "A" },
  // GRUP B (NNUA)
  { nim: "102022600100", name: "LUDOVIC DELBERT LAURENT", classCode: "SI5007", className: "SI-50-07", assistantCode: "NNUA", group: "B" },
  { nim: "102022600107", name: "NADA NABILAH", classCode: "SI5007", className: "SI-50-07", assistantCode: "NNUA", group: "B" },
  { nim: "102022600122", name: "BAYU AJI PAMUNGKAS", classCode: "SI5007", className: "SI-50-07", assistantCode: "NNUA", group: "B" },
  { nim: "102022600137", name: "ADHA IBRAHIM SIREGAR", classCode: "SI5007", className: "SI-50-07", assistantCode: "NNUA", group: "B" },
  { nim: "102022600152", name: "REBECCA KIRANA TORUAN", classCode: "SI5007", className: "SI-50-07", assistantCode: "NNUA", group: "B" },
  // GRUP C (DERA)
  { nim: "102022600177", name: "MUHAMAD FAHRI", classCode: "SI5007", className: "SI-50-07", assistantCode: "DERA", group: "C" },
  { nim: "102022600193", name: "ANNISA DWI RAMADHANI", classCode: "SI5007", className: "SI-50-07", assistantCode: "DERA", group: "C" },
  { nim: "102022600203", name: "M. FAKHRI FAYYAZI", classCode: "SI5007", className: "SI-50-07", assistantCode: "DERA", group: "C" },
  { nim: "102022600214", name: "MUTIARA ZAIN NAILAH", classCode: "SI5007", className: "SI-50-07", assistantCode: "DERA", group: "C" },
  { nim: "102022600227", name: "CHANDRA AZZIZ", classCode: "SI5007", className: "SI-50-07", assistantCode: "DERA", group: "C" },
  { nim: "102022600244", name: "GALIH PRAYOGA", classCode: "SI5007", className: "SI-50-07", assistantCode: "DERA", group: "C" },
  // GRUP D (MUNR)
  { nim: "102022600254", name: "SHAIRA OKTAVIA PUTRI", classCode: "SI5007", className: "SI-50-07", assistantCode: "MUNR", group: "D" },
  { nim: "102022600263", name: "KEITARO RAMADHAN CECARIO", classCode: "SI5007", className: "SI-50-07", assistantCode: "MUNR", group: "D" },
  { nim: "102022600280", name: "SATRIA ADRIAN PUTRA HARRY", classCode: "SI5007", className: "SI-50-07", assistantCode: "MUNR", group: "D" },
  { nim: "102022600307", name: "RADEN NUR AINI FIRZA RASYIDA PRAWIRA DI NATA", classCode: "SI5007", className: "SI-50-07", assistantCode: "MUNR", group: "D" },
  { nim: "102022600315", name: "LALU KAINDRA RABBANI HANAFIE", classCode: "SI5007", className: "SI-50-07", assistantCode: "MUNR", group: "D" },
  { nim: "102022600331", name: "HANIF FAWWAZ MUYASSAR", classCode: "SI5007", className: "SI-50-07", assistantCode: "MUNR", group: "D" },
  // GRUP E (RAZA)
  { nim: "102022600350", name: "ASKA SETIAWAN YUSUF", classCode: "SI5007", className: "SI-50-07", assistantCode: "RAZA", group: "E" },
  { nim: "102022600352", name: "AULYA ZAHRA RAMADHANI", classCode: "SI5007", className: "SI-50-07", assistantCode: "RAZA", group: "E" },
  { nim: "102022600374", name: "MUHAMAD ZHAFRAN NUR RAMADHAN HERFIANSYAH", classCode: "SI5007", className: "SI-50-07", assistantCode: "RAZA", group: "E" },
  { nim: "102022600392", name: "ZEFA VERLIONENZA SOEMITHA", classCode: "SI5007", className: "SI-50-07", assistantCode: "RAZA", group: "E" },
  { nim: "102022600393", name: "NEISYA SHAFIRA ZAHFARINA", classCode: "SI5007", className: "SI-50-07", assistantCode: "RAZA", group: "E" },
  { nim: "102022600411", name: "ABIZAR 'ALAMUL HUDA", classCode: "SI5007", className: "SI-50-07", assistantCode: "RAZA", group: "E" },
  // GRUP F (HAFK)
  { nim: "102022600428", name: "MUHAMMAD DZILDAN ARRASYA", classCode: "SI5007", className: "SI-50-07", assistantCode: "HAFK", group: "F" },
  { nim: "102022600455", name: "JEANIFER PEARLYN WIJAYA", classCode: "SI5007", className: "SI-50-07", assistantCode: "HAFK", group: "F" },
  { nim: "102022600459", name: "MUHAMMAD NABIL SEMAN", classCode: "SI5007", className: "SI-50-07", assistantCode: "HAFK", group: "F" },
  { nim: "102022600485", name: "AHMAD IMAM FAHRI", classCode: "SI5007", className: "SI-50-07", assistantCode: "HAFK", group: "F" },
  { nim: "102022600502", name: "ALEXANDRIO DARRELL GUNAWAN", classCode: "SI5007", className: "SI-50-07", assistantCode: "HAFK", group: "F" },
  // GRUP G (JBJR)
  { nim: "102022600503", name: "KYZAN KYRANA ARRUNG", classCode: "SI5007", className: "SI-50-07", assistantCode: "HAFK", group: "F" },
  { nim: "102022630012", name: "MUHAMMAD HAFIZ KHAIRUDDIN", classCode: "SI5007", className: "SI-50-07", assistantCode: "JBJR", group: "G" },
  { nim: "102022630024", name: "ISLAMMIVAN MUHAMMAD GIOVANNO", classCode: "SI5007", className: "SI-50-07", assistantCode: "JBJR", group: "G" },
  { nim: "102022630033", name: "FAKHRI MUMTAZ BASYARI", classCode: "SI5007", className: "SI-50-07", assistantCode: "JBJR", group: "G" },
  { nim: "102022630041", name: "MUHAMMAD AL AFGANI", classCode: "SI5007", className: "SI-50-07", assistantCode: "JBJR", group: "G" },
];

export const SHIFT_15_STUDENTS: StudentPlotting[] = [
  // GRUP A (MACY)
  { nim: "102022500243", name: "HELMI FAAZ", classCode: "SI5014", className: "SI-49-02", assistantCode: "MACY", group: "A" },
  { nim: "102022600018", name: "FARRAS ALVIRUQI", classCode: "SI5014", className: "SI-50-14", assistantCode: "MACY", group: "A" },
  { nim: "102022600024", name: "REGINA ANGELA PUTRI", classCode: "SI5014", className: "SI-50-14", assistantCode: "MACY", group: "A" },
  { nim: "102022600045", name: "SYAMIL RUHUL JADID", classCode: "SI5014", className: "SI-50-14", assistantCode: "MACY", group: "A" },
  { nim: "102022600060", name: "NAUZILA YASHIFA", classCode: "SI5014", className: "SI-50-14", assistantCode: "MACY", group: "A" },
  { nim: "102022600063", name: "DAFA QIRENSA ABDIRA", classCode: "SI5014", className: "SI-50-14", assistantCode: "MACY", group: "A" },
  { nim: "102022600083", name: "M DEWIL ARGHA", classCode: "SI5014", className: "SI-50-14", assistantCode: "MUNR", group: "B" },
  // GRUP B (MUNR)
  { nim: "102022600093", name: "ALIN VHERO ALIFIA", classCode: "SI5014", className: "SI-50-14", assistantCode: "MUNR", group: "B" },
  { nim: "102022600124", name: "DELPHINE GABRIELLA SIBARANI", classCode: "SI5014", className: "SI-50-14", assistantCode: "MUNR", group: "B" },
  { nim: "102022600131", name: "ARMIA CHANDRA", classCode: "SI5014", className: "SI-50-14", assistantCode: "MUNR", group: "B" },
  { nim: "102022600148", name: "RAOUL HAYYAN KHAYRI", classCode: "SI5014", className: "SI-50-14", assistantCode: "MUNR", group: "B" },
  { nim: "102022600167", name: "MUHAMMAD NABIL AL GHIFARI", classCode: "SI5014", className: "SI-50-14", assistantCode: "MUNR", group: "B" },
  { nim: "102022600176", name: "NADINE AQILA ZAHRA", classCode: "SI5014", className: "SI-50-14", assistantCode: "MAYR", group: "C" },
  // GRUP C (MAYR)
  { nim: "102022600189", name: "AMMAR ABDURRAHMAN", classCode: "SI5014", className: "SI-50-14", assistantCode: "MAYR", group: "C" },
  { nim: "102022600204", name: "TANIA YEHESKIA NABABAN", classCode: "SI5014", className: "SI-50-14", assistantCode: "MAYR", group: "C" },
  { nim: "102022600220", name: "THORIQ AHMAD HAFIDZ", classCode: "SI5014", className: "SI-50-14", assistantCode: "MAYR", group: "C" },
  { nim: "102022600234", name: "KAYLA RAIHANNIA", classCode: "SI5014", className: "SI-50-14", assistantCode: "MAYR", group: "C" },
  { nim: "102022600237", name: "DIMITRIO JESUS D'CESSARIO LIMANTRA", classCode: "SI5014", className: "SI-50-14", assistantCode: "MAYR", group: "C" },
  { nim: "102022600252", name: "JONES DAME SITUMORANG", classCode: "SI5014", className: "SI-50-14", assistantCode: "NNUA", group: "D" },
  // GRUP D (NNUA)
  { nim: "102022600271", name: "EXSELL AL IHSAN ALI", classCode: "SI5014", className: "SI-50-14", assistantCode: "NNUA", group: "D" },
  { nim: "102022600282", name: "AMALIA NURHAYATI", classCode: "SI5014", className: "SI-50-14", assistantCode: "NNUA", group: "D" },
  { nim: "102022600289", name: "FAKHRIYYAN AZIZ MUZHAFFAR", classCode: "SI5014", className: "SI-50-14", assistantCode: "NNUA", group: "D" },
  { nim: "102022600302", name: "RIFQI OKLA GINANJAR", classCode: "SI5014", className: "SI-50-14", assistantCode: "NNUA", group: "D" },
  { nim: "102022600323", name: "KAISAN MUHAMMAD ADITAMA", classCode: "SI5014", className: "SI-50-14", assistantCode: "NNUA", group: "D" },
  { nim: "102022600343", name: "MOHAMAD NUR YASIN", classCode: "SI5014", className: "SI-50-14", assistantCode: "FAAA", group: "E" },
  // GRUP E (FAAA)
  { nim: "102022600361", name: "VALENZA APRIANGGA PRAMITA PUTRA", classCode: "SI5014", className: "SI-50-14", assistantCode: "FAAA", group: "E" },
  { nim: "102022600367", name: "LIVIA RIZQIKA BRILLIANT", classCode: "SI5014", className: "SI-50-14", assistantCode: "FAAA", group: "E" },
  { nim: "102022600382", name: "ALDYANO ANDHIKA PUTRA PRATAMA", classCode: "SI5014", className: "SI-50-14", assistantCode: "FAAA", group: "E" },
  { nim: "102022600404", name: "MUHAMMAD IKRAM ZIHNI", classCode: "SI5014", className: "SI-50-14", assistantCode: "FAAA", group: "E" },
  { nim: "102022600419", name: "ARYA SATYANEGARA", classCode: "SI5014", className: "SI-50-14", assistantCode: "FAAA", group: "E" },
  { nim: "102022600425", name: "SAFINA DWI NASRUNITA", classCode: "SI5014", className: "SI-50-14", assistantCode: "DERA", group: "F" },
  // GRUP F (DERA)
  { nim: "102022600437", name: "MADE ANANTHA DIPA SATYAPRAKASH", classCode: "SI5014", className: "SI-50-14", assistantCode: "DERA", group: "F" },
  { nim: "102022600451", name: "MUHAMMAD WIMPY BIAGGI", classCode: "SI5014", className: "SI-50-14", assistantCode: "DERA", group: "F" },
  { nim: "102022600466", name: "GLEN VINO", classCode: "SI5014", className: "SI-50-14", assistantCode: "DERA", group: "F" },
  { nim: "102022600474", name: "ANNISA AZ ZAHRAH", classCode: "SI5014", className: "SI-50-14", assistantCode: "DERA", group: "F" },
  { nim: "102022600480", name: "JULIO YOHANES SUNDAYO", classCode: "SI5014", className: "SI-50-14", assistantCode: "IPGA", group: "G" },
  // GRUP G (IPGA)
  { nim: "102022600492", name: "DIAZ LEONARD SIAMPA", classCode: "SI5014", className: "SI-50-14", assistantCode: "IPGA", group: "G" },
  { nim: "102022600510", name: "DARIUS PRAYOGO KUSUMOWIDADGO", classCode: "SI5014", className: "SI-50-14", assistantCode: "IPGA", group: "G" },
  { nim: "102022630009", name: "HABIBI AZKA PRATAMA", classCode: "SI5014", className: "SI-50-14", assistantCode: "IPGA", group: "G" },
  { nim: "102022630026", name: "NAFISA ZAHRA ALIFIA", classCode: "SI5014", className: "SI-50-14", assistantCode: "IPGA", group: "G" },
];

// Map of finalized plottings for Shift 1 s.d. 15 (100% COMPLETE)
export const ALL_SHIFT_PLOTTINGS: Record<number, ShiftPlottingSummary> = {
  1: {
    shiftNumber: 1,
    className: "SI-50-12",
    classCode: "SI5012",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "ADDH", studentCount: 6 },
      { group: "B", assistantCode: "IPGA", studentCount: 6 },
      { group: "C", assistantCode: "DERA", studentCount: 6 },
      { group: "D", assistantCode: "FIAG", studentCount: 6 },
      { group: "E", assistantCode: "ADFZ", studentCount: 6 },
      { group: "F", assistantCode: "AITS", studentCount: 5 },
      { group: "G", assistantCode: "MUDI", studentCount: 5 },
    ],
    students: SHIFT_1_STUDENTS,
  },
  2: {
    shiftNumber: 2,
    className: "SI-50-02",
    classCode: "SI5002",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "GRGS", studentCount: 6 },
      { group: "B", assistantCode: "ADFZ", studentCount: 6 },
      { group: "C", assistantCode: "INTC", studentCount: 6 },
      { group: "D", assistantCode: "DEVO", studentCount: 6 },
      { group: "E", assistantCode: "ADDH", studentCount: 6 },
      { group: "F", assistantCode: "FIAG", studentCount: 6 },
      { group: "G", assistantCode: "DINF", studentCount: 5 },
    ],
    students: SHIFT_2_STUDENTS,
  },
  3: {
    shiftNumber: 3,
    className: "SI-50-11",
    classCode: "SI5011",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "TICS", studentCount: 6 },
      { group: "B", assistantCode: "LAUF", studentCount: 6 },
      { group: "C", assistantCode: "ALRS", studentCount: 6 },
      { group: "D", assistantCode: "ADFZ", studentCount: 6 },
      { group: "E", assistantCode: "MAYR", studentCount: 5 },
      { group: "F", assistantCode: "MUHA", studentCount: 5 },
      { group: "G", assistantCode: "SYOW", studentCount: 5 },
    ],
    students: SHIFT_3_STUDENTS,
  },
  4: {
    shiftNumber: 4,
    className: "SI-50-04",
    classCode: "SI5004",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "MUDI", studentCount: 6 },
      { group: "B", assistantCode: "INTC", studentCount: 6 },
      { group: "C", assistantCode: "RAZA", studentCount: 6 },
      { group: "D", assistantCode: "MJFA", studentCount: 6 },
      { group: "E", assistantCode: "ARNA", studentCount: 6 },
      { group: "F", assistantCode: "MACY", studentCount: 6 },
      { group: "G", assistantCode: "DSPH", studentCount: 5 },
    ],
    students: SHIFT_4_STUDENTS,
  },
  5: {
    shiftNumber: 5,
    className: "SI-50-09",
    classCode: "SI5009",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "TICS", studentCount: 6 },
      { group: "B", assistantCode: "SYOW", studentCount: 6 },
      { group: "C", assistantCode: "ARNA", studentCount: 6 },
      { group: "D", assistantCode: "ADDH", studentCount: 6 },
      { group: "E", assistantCode: "DSPH", studentCount: 5 },
      { group: "F", assistantCode: "LAUF", studentCount: 5 },
      { group: "G", assistantCode: "MJFA", studentCount: 5 },
    ],
    students: SHIFT_5_STUDENTS,
  },
  6: {
    shiftNumber: 6,
    className: "SI-50-10",
    classCode: "SI5010",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "IPGA", studentCount: 6 },
      { group: "B", assistantCode: "ADRP", studentCount: 6 },
      { group: "C", assistantCode: "ARSM", studentCount: 6 },
      { group: "D", assistantCode: "DEVO", studentCount: 6 },
      { group: "E", assistantCode: "HAFK", studentCount: 6 },
      { group: "F", assistantCode: "MJFA", studentCount: 4 },
      { group: "G", assistantCode: "SYOW", studentCount: 5 },
    ],
    students: SHIFT_6_STUDENTS,
  },
  7: {
    shiftNumber: 7,
    className: "SI-50-13",
    classCode: "SI5013",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "DEVO", studentCount: 6 },
      { group: "B", assistantCode: "GRGS", studentCount: 7 },
      { group: "C", assistantCode: "ADDH", studentCount: 6 },
      { group: "D", assistantCode: "TICS", studentCount: 7 },
      { group: "E", assistantCode: "FIAG", studentCount: 7 },
      { group: "F", assistantCode: "DINF", studentCount: 7 },
    ],
    students: SHIFT_7_STUDENTS,
  },
  8: {
    shiftNumber: 8,
    className: "SI-50-05",
    classCode: "SI5005",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "MJFA", studentCount: 6 },
      { group: "B", assistantCode: "MUDI", studentCount: 6 },
      { group: "C", assistantCode: "DSPH", studentCount: 6 },
      { group: "D", assistantCode: "MACY", studentCount: 6 },
      { group: "E", assistantCode: "ARNA", studentCount: 6 },
      { group: "F", assistantCode: "JBJR", studentCount: 5 },
      { group: "G", assistantCode: "MUNR", studentCount: 5 },
    ],
    students: SHIFT_8_STUDENTS,
  },
  9: {
    shiftNumber: 9,
    className: "SI-50-03",
    classCode: "SI5003",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "HAFK", studentCount: 6 },
      { group: "B", assistantCode: "ALRS", studentCount: 6 },
      { group: "C", assistantCode: "NNUA", studentCount: 6 },
      { group: "D", assistantCode: "RAAP", studentCount: 6 },
      { group: "E", assistantCode: "JBJR", studentCount: 6 },
      { group: "F", assistantCode: "MUHA", studentCount: 6 },
      { group: "G", assistantCode: "ADRP", studentCount: 6 },
    ],
    students: SHIFT_9_STUDENTS,
  },
  10: {
    shiftNumber: 10,
    className: "SI-50-06",
    classCode: "SI5006",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "RAAP", studentCount: 6 },
      { group: "B", assistantCode: "ARSM", studentCount: 6 },
      { group: "C", assistantCode: "GRGS", studentCount: 6 },
      { group: "D", assistantCode: "AZMH", studentCount: 6 },
      { group: "E", assistantCode: "IREM", studentCount: 6 },
      { group: "F", assistantCode: "LAUF", studentCount: 5 },
      { group: "G", assistantCode: "ADRP", studentCount: 5 },
    ],
    students: SHIFT_10_STUDENTS,
  },
  11: {
    shiftNumber: 11,
    className: "SI-50-01",
    classCode: "SI5001",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "AITS", studentCount: 6 },
      { group: "B", assistantCode: "ALRS", studentCount: 6 },
      { group: "C", assistantCode: "AZMH", studentCount: 6 },
      { group: "D", assistantCode: "IREM", studentCount: 6 },
      { group: "E", assistantCode: "ARSM", studentCount: 6 },
      { group: "F", assistantCode: "RAAP", studentCount: 6 },
      { group: "G", assistantCode: "DINF", studentCount: 5 },
    ],
    students: SHIFT_11_STUDENTS,
  },
  12: {
    shiftNumber: 12,
    className: "SI-50-08",
    classCode: "SI5008",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "ADRP", studentCount: 6 },
      { group: "B", assistantCode: "INTC", studentCount: 6 },
      { group: "C", assistantCode: "MUHA", studentCount: 6 },
      { group: "D", assistantCode: "FAAA", studentCount: 6 },
      { group: "E", assistantCode: "MAYR", studentCount: 6 },
      { group: "F", assistantCode: "AITS", studentCount: 5 },
      { group: "G", assistantCode: "AZMH", studentCount: 5 },
    ],
    students: SHIFT_12_STUDENTS,
  },
  13: {
    shiftNumber: 13,
    className: "SI-50-INT",
    classCode: "SI50INT",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "RAZA", studentCount: 5 },
      { group: "B", assistantCode: "FAAA", studentCount: 5 },
      { group: "C", assistantCode: "RAAP", studentCount: 4 },
    ],
    students: SHIFT_13_STUDENTS,
  },
  14: {
    shiftNumber: 14,
    className: "SI-50-07",
    classCode: "SI5007",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "IREM", studentCount: 7 },
      { group: "B", assistantCode: "NNUA", studentCount: 5 },
      { group: "C", assistantCode: "DERA", studentCount: 6 },
      { group: "D", assistantCode: "MUNR", studentCount: 6 },
      { group: "E", assistantCode: "RAZA", studentCount: 6 },
      { group: "F", assistantCode: "HAFK", studentCount: 6 },
      { group: "G", assistantCode: "JBJR", studentCount: 4 },
    ],
    students: SHIFT_14_STUDENTS,
  },
  15: {
    shiftNumber: 15,
    className: "SI-50-14",
    classCode: "SI5014",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "MACY", studentCount: 6 },
      { group: "B", assistantCode: "MUNR", studentCount: 6 },
      { group: "C", assistantCode: "MAYR", studentCount: 6 },
      { group: "D", assistantCode: "NNUA", studentCount: 6 },
      { group: "E", assistantCode: "FAAA", studentCount: 6 },
      { group: "F", assistantCode: "DERA", studentCount: 5 },
      { group: "G", assistantCode: "IPGA", studentCount: 5 },
    ],
    students: SHIFT_15_STUDENTS,
  },
};

// 3. HELPER FUNCTIONS

/**
 * Mendapatkan seluruh shift yang dijaga oleh asisten tertentu
 */
export function getAssistantShifts(assistantCode: string): {
  shift: ShiftSchedule;
  group: string;
  studentCount: number;
  students: StudentPlotting[];
  isFinalized: boolean;
}[] {
  const result: {
    shift: ShiftSchedule;
    group: string;
    studentCount: number;
    students: StudentPlotting[];
    isFinalized: boolean;
  }[] = [];

  for (const shift of ALPRO_15_SHIFTS) {
    const plotting = ALL_SHIFT_PLOTTINGS[shift.shiftNumber];
    if (plotting) {
      const match = plotting.assistants.find((a) => a.assistantCode === assistantCode);
      if (match) {
        const groupStudents = plotting.students.filter((s) => s.assistantCode === assistantCode);
        result.push({
          shift,
          group: match.group,
          studentCount: groupStudents.length || match.studentCount,
          students: groupStudents,
          isFinalized: true,
        });
      }
    }
  }

  // Jika belum ada di shift 1-15, beri preview shift default untuk asisten tersebut agar dashboard tidak kosong
  if (result.length === 0) {
    const defaultShiftNumber = ((assistantCode.charCodeAt(0) + assistantCode.charCodeAt(1)) % 11) + 5; // shift 5..15
    const fallbackShift = ALPRO_15_SHIFTS.find((s) => s.shiftNumber === defaultShiftNumber) || ALPRO_15_SHIFTS[4];
    result.push({
      shift: fallbackShift,
      group: "A",
      studentCount: 6,
      students: [],
      isFinalized: false,
    });
  }

  return result;
}

/**
 * Mendeteksi shift mana yang saat ini sedang berlangsung secara real-time berdasarkan jam & hari sekarang
 */
export function getCurrentOngoingShift(nowDate: Date = new Date()): {
  activeShift: ShiftSchedule | null;
  nextShiftToday: ShiftSchedule | null;
  currentDayName: string;
  isLabOperatingHours: boolean;
} {
  const dayIndex = nowDate.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const currentDayName = dayNames[dayIndex];

  const currentHour = nowDate.getHours();
  const currentMinute = nowDate.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  // Filter shift yang jatuh di hari ini
  const todayShifts = ALPRO_15_SHIFTS.filter((s) => s.dayIndex === dayIndex);

  let activeShift: ShiftSchedule | null = null;
  let nextShiftToday: ShiftSchedule | null = null;

  for (const s of todayShifts) {
    const [startH, startM] = s.startTime.split(":").map(Number);
    const [endH, endM] = s.endTime.split(":").map(Number);
    const startMin = startH * 60 + startM;
    const endMin = endH * 60 + endM;

    if (currentTotalMinutes >= startMin && currentTotalMinutes <= endMin) {
      activeShift = s;
      break;
    } else if (currentTotalMinutes < startMin && !nextShiftToday) {
      nextShiftToday = s;
    }
  }

  const isLabOperatingHours = currentTotalMinutes >= 7 * 60 && currentTotalMinutes <= 18 * 60;

  return {
    activeShift,
    nextShiftToday,
    currentDayName,
    isLabOperatingHours,
  };
}

/**
 * Mendapatkan status shift asisten: sedang aktif sekarang, atau shift terdekat berikutnya
 */
export function getAssistantDutyStatus(assistantCode: string, nowDate: Date = new Date()) {
  const myShifts = getAssistantShifts(assistantCode);
  const ongoing = getCurrentOngoingShift(nowDate);

  // Cek apakah ada shift aktif yang dijaga asisten ini sekarang
  const currentActiveMyShift = myShifts.find((m) => m.shift.shiftNumber === ongoing.activeShift?.shiftNumber);

  // Cari shift saya berikutnya
  let upcomingMyShift = myShifts[0];

  return {
    isCurrentlyOnDuty: Boolean(currentActiveMyShift),
    activeShiftDetails: currentActiveMyShift || null,
    nextUpcomingShift: upcomingMyShift || null,
    allMyShifts: myShifts,
    systemOngoingShift: ongoing.activeShift,
  };
}

// Lookup Cache for ultra-fast student -> assistant lookup
const STUDENT_ASSISTANT_MAP = new Map<string, string>();
const STUDENT_NAME_ASSISTANT_MAP = new Map<string, string>();
const STUDENT_NORMALIZED_NAME_MAP = new Map<string, string>();

function normalizeNameKey(name: string): string {
  return name.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

Object.values(ALL_SHIFT_PLOTTINGS).forEach((shift) => {
  shift.students.forEach((s) => {
    if (s.nim) {
      const cleanNim = s.nim.trim();
      STUDENT_ASSISTANT_MAP.set(cleanNim, s.assistantCode);
    }
    if (s.name) {
      const upper = s.name.toUpperCase().trim();
      STUDENT_NAME_ASSISTANT_MAP.set(upper, s.assistantCode);
      STUDENT_NORMALIZED_NAME_MAP.set(normalizeNameKey(s.name), s.assistantCode);
    }
  });
});

// Fallback alias mappings for SI-50-07 students (mapping PDF print typos to their assigned assistant)
const KNOWN_ALIASES: Record<string, string> = {
  "102022600453": "HAFK", // Jeanifer Pearlyn Wijaya (misprinted as 453 in PDF, real CeLOE NIM is 455)
  "102022600455": "HAFK", // Jeanifer Pearlyn Wijaya / Muhammad Nabil Seman
  "102022600459": "HAFK", // Muhammad Nabil Seman / Ahmad Imam Fahri
  "102022600485": "HAFK", // Ahmad Imam Fahri / Alexandrio Darrell Gunawan
  "102022600502": "HAFK", // Alexandrio Darrell Gunawan / Kyzan Kyrana Arrung
  "102022600503": "HAFK", // Kyzan Kyrana Arrung (CeLOE LMS id=146770, Group F)
  "102022630012": "JBJR", // Muhammad Hafiz Khairuddin (CeLOE LMS id=134117, Group G)
  "102022630024": "JBJR", // Islammivan Muhammad Giovanno (CeLOE LMS id=136095, Group G)
  "102022630033": "JBJR", // Fakhri Mumtaz Basyari (CeLOE LMS id=138812, Group G)
  "102022630041": "JBJR", // Muhammad Al Afgani (CeLOE LMS id=146734, Group G)
};

/**
 * Mendapatkan kode asisten pengampu untuk praktikan berdasarkan NIM atau nama (e.g. "MACY", "MUDI", "INTC")
 */
export function getAssistantCodeForStudent(nim: string, name?: string): string {
  if (nim) {
    const cleanNim = nim.trim();
    const code = STUDENT_ASSISTANT_MAP.get(cleanNim);
    if (code) return code;
    if (KNOWN_ALIASES[cleanNim]) return KNOWN_ALIASES[cleanNim];
  }
  if (name) {
    const upper = name.toUpperCase().trim();
    const code = STUDENT_NAME_ASSISTANT_MAP.get(upper);
    if (code) return code;

    const norm = normalizeNameKey(name);
    const normCode = STUDENT_NORMALIZED_NAME_MAP.get(norm);
    if (normCode) return normCode;

    // Partial search if names have double names or suffix
    for (const [key, val] of STUDENT_NORMALIZED_NAME_MAP.entries()) {
      if (norm.length > 5 && (key.includes(norm) || norm.includes(key))) {
        return val;
      }
    }
  }
  return "-";
}
