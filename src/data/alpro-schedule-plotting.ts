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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
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
  { nim: "102022400367", name: "RADITYA SYANDANA PRASETYO", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600015", name: "YUDHA PRATAMA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600021", name: "KHALISHA NAYLA AKMAL", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600041", name: "BRYAN GIVO ABDILUHUNG", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600050", name: "NADYA FEBRYOLA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600081", name: "ALI RIDHO", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600090", name: "TIARA AMALIDYA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },

  // GRUP B (IPGA)
  { nim: "102022600112", name: "AHMAD HUSEIN AL FARISY", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600114", name: "NAFISHA HAIFA LUTHFIAH", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600128", name: "ARKA YOHAN TRIOSLY", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600146", name: "DIEGO NAUFALINO CHANDRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600164", name: "ZAIDAN SYAUQI YUSUF SAPUTRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600168", name: "VANESSA SHALOM AVENTHA SUHARLY", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },

  // GRUP C (DERA)
  { nim: "102022600187", name: "DESTRA INDRA SETIAWAN", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600201", name: "HAIFA NUR ROJABI UBAIDILLAH", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600215", name: "MOCHAMMAD FADLI KAMALUDIN", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600223", name: "NAILA SYAFIRA NUR SYABANI", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600233", name: "ENGGAR ADITYA SANUSI", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600250", name: "TRISTAN REMIEL NESIMNASI", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },

  // GRUP D (FIAG)
  { nim: "102022600269", name: "JAHFAL DZIKRON ASHIDIK", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600272", name: "NAWAFA AHDELLA", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600287", name: "MUHAMMAD BILAL BACHTIAR", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600300", name: "PIJAR SURYA KELANA", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600321", name: "ISKANDAR", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600330", name: "THALITA MAULIDINA MULYASANDY", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },

  // GRUP E (ADFZ)
  { nim: "102022600338", name: "FAKHRI FATHURRAHMAN", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600358", name: "ELANG AVISENA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600364", name: "HANINDA SALVADILLA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600380", name: "SEVENT MIGELL SONDAKH", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600400", name: "FRIZLY OKTANIO CANDRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600415", name: "FAJRIYAH ZAHROTU SITA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },

  // GRUP F (AITS)
  { nim: "102022600417", name: "HIRZAN TAMMA RADITYA", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600449", name: "SULTAN GIRI MAULANA PUTRA PAMUNGKAS", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600464", name: "ANDI EVANSYAH ZAFALDI", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600472", name: "PHELIZA AUDY ARLYN", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600478", name: "MUHAMMAD GHALY ABQARY", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600508", name: "RIZKY PUTRA ALFARIJI", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },

  // GRUP G (MUDI)
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
  { nim: "102022600089", name: "KETUT DHARMA ARTHA WARASMARA", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },

  // GRUP B (ADFZ)
  { nim: "102022600098", name: "ADELIA AMANDA PUTRI F", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600133", name: "MUHAMMAD RASYAH ALVIAN", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600138", name: "AYASHA ALIKA", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600151", name: "NABIL AHSAN BARIQI BIN MOHAMMAD ZULKARNAIN", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600170", name: "AHMAD RAIHAN IBRAHIM", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600181", name: "RAISA DINI FAZILA", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },

  // GRUP C (INTC)
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

  // GRUP E (ADDH)
  { nim: "102022600368", name: "M. KHAFIDHIN MUFTI ALI", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600384", name: "KELVIN SURYA DINATA", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600406", name: "RAFAEL CHRISTIAN WIBOWO", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600421", name: "MUHAMMAD WISNU HARIS", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600432", name: "ASTI ASH SHIDQY", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600439", name: "I NYOMAN DIKA KURNIAWAN", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },

  // GRUP F (FIAG)
  { nim: "102022600453", name: "VINCENT JOVAN REANDE", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
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

  // GRUP B (LAUF)
  { nim: "102022600077", name: "MUHAMMAD FAREL HARDISATYA", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
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
  { nim: "102022600095", name: "GIO ADITYA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },

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

  // GRUP D (MJFA)
  { nim: "102022600241", name: "AHMAD SHOFIULLAH SHOLEHUDDIN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600258", name: "MUHAMMAD HAFIZHURROHMAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600277", name: "ZIDANE RAMDHANI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600312", name: "ADAM ZULFIKAR FATHURAHMAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600327", name: "FATWA FEBRIANSYAH PASARIB", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },

  // GRUP E (ARNA)
  { nim: "102022600342", name: "KAYLA RAHMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600370", name: "FARREL YOGA PRATAMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600383", name: "ISNA NI MATUL MASRUROH", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600388", name: "RENDYTYA PRATAMA DARMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600408", name: "RAMADHAN KANEDY", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },

  // GRUP F (MACY - Maurellio Christopher)
  { nim: "102022600423", name: "DAFFA HAFIZH FIRDAUS", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600435", name: "GUSTI AYU PUTU EKA SHANTI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600442", name: "I KETUT SATYA WIRATAMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600456", name: "MUHAMMAD IQBAL RAMADANY", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600483", name: "MUHAMMAD AKRAM", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600495", name: "ANINDHITA DEA SHAFIRA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600497", name: "FATHAN AZEEM BILHAQ GUNAWAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600514", name: "NICO FEBRINO BAHARI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },

  // GRUP G (DSPH)
  { nim: "102022630003", name: "VICKY", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
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
  { nim: "102022600399", name: "SALMA RAISYA YASMIN", classCode: "SI5009", className: "SI-50-09", assistantCode: "DSPH", group: "E" },

  // GRUP F (LAUF)
  { nim: "102022600413", name: "FAUZANA FIKRI", classCode: "SI5009", className: "SI-50-09", assistantCode: "LAUF", group: "F" },
  { nim: "102022600430", name: "ASAJ SAMAHATULLAH", classCode: "SI5009", className: "SI-50-09", assistantCode: "LAUF", group: "F" },
  { nim: "102022600447", name: "ZACKY ALFARUQI", classCode: "SI5009", className: "SI-50-09", assistantCode: "LAUF", group: "F" },
  { nim: "102022600461", name: "PINASTIKA NAURAH SYAAKIRAH", classCode: "SI5009", className: "SI-50-09", assistantCode: "LAUF", group: "F" },
  { nim: "102022600475", name: "DHIMAS RIZKY PRATAMA", classCode: "SI5009", className: "SI-50-09", assistantCode: "LAUF", group: "F" },

  // GRUP G (MJFA)
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
  { nim: "102022600086", name: "CINTA HAJA PUTIZA", classCode: "SI5010", className: "SI-50-10", assistantCode: "IPGA", group: "A" },

  // GRUP B (ADRP)
  { nim: "102022600104", name: "MUHAMMAD FAZAL HAFIZ", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  { nim: "102022600110", name: "ALIYA ANGELICA KESUMA", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  { nim: "102022600126", name: "NABIL GHAISAN", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  { nim: "102022600144", name: "NADHIF HUJATUL ISLAM", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  { nim: "102022600161", name: "NABIL ALFIANSYAH", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  { nim: "102022600163", name: "KEISYA ALFIANKA APRALIANTO", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },
  { nim: "102022600183", name: "PETER ADHIWIBOWO", classCode: "SI5010", className: "SI-50-10", assistantCode: "ADRP", group: "B" },

  // GRUP C (ARSM)
  { nim: "102022600198", name: "EL KHAYRA MARSHIFANI ADJIE", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },
  { nim: "102022600208", name: "TRIONALDI SIHALOHO", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },
  { nim: "102022600219", name: "KANYA KALANI RAWIRAHAGI", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },
  { nim: "102022600231", name: "MUHAMMAD KEVIN ANDREAN", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },
  { nim: "102022600247", name: "AL PASHA WIRAYUDHA", classCode: "SI5010", className: "SI-50-10", assistantCode: "ARSM", group: "C" },

  // GRUP D (DEVO)
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
  { nim: "102022600476", name: "RADEN MUHAMMAD IQBAL", classCode: "SI5010", className: "SI-50-10", assistantCode: "MJFA", group: "F" },

  // GRUP G (SYOW)
  { nim: "102022600489", name: "RICHARD KENZO POSUMAH", classCode: "SI5010", className: "SI-50-10", assistantCode: "SYOW", group: "G" },
  { nim: "102022600506", name: "TRISTAN KEYMATARI YUSRAN", classCode: "SI5010", className: "SI-50-10", assistantCode: "SYOW", group: "G" },
  { nim: "102022630031", name: "AFZAL AULIA ZAHRAN", classCode: "SI5010", className: "SI-50-10", assistantCode: "SYOW", group: "G" },
  { nim: "102022630037", name: "MUTIARA CHAIRUNNISA", classCode: "SI5010", className: "SI-50-10", assistantCode: "SYOW", group: "G" },
];

export const SHIFT_7_STUDENTS: StudentPlotting[] = [
  // GRUP A (DEVO)
  { nim: "102022500129", name: "SULTAN MUHAMMAD RASYA", classCode: "SI5013", className: "SI-50-13", assistantCode: "DEVO", group: "A" },
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
  { nim: "102022600096", name: "MUHAMAD RAFI AL-GHIFFARI", classCode: "SI5005", className: "SI-50-05", assistantCode: "MJFA", group: "A" },

  // GRUP B (MUDI)
  { nim: "102022600105", name: "KEISHA AULIA SAABIRA", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  { nim: "102022600119", name: "MUHAMMAD HAFIDZ AMRULLAH", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  { nim: "102022600135", name: "CONDRO WIDODO", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  { nim: "102022600142", name: "ANAMIKA LANA PURNOMO PUTERI", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  { nim: "102022600155", name: "MARCEL LUKMANSYAH", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },
  { nim: "102022600174", name: "JERICO SIAHAAN", classCode: "SI5005", className: "SI-50-05", assistantCode: "MUDI", group: "B" },

  // GRUP C (DSPH)
  { nim: "102022600185", name: "RANA ZAHRA NAILAL HUSNA", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },
  { nim: "102022600199", name: "RAIHAN HERYANTO ZHAHIR", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },
  { nim: "102022600212", name: "NAQIYA AQUILANI AZFA", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },
  { nim: "102022600225", name: "MUHAMMAD ZIDAN FIRDAUS", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },
  { nim: "102022600242", name: "AHMAD HIKAM", classCode: "SI5005", className: "SI-50-05", assistantCode: "DSPH", group: "C" },

  // GRUP D (MACY - Maurellio Christopher)
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
  { nim: "102022600470", name: "NEOFRANZA ADHITYA PURWANTO", classCode: "SI5005", className: "SI-50-05", assistantCode: "JBJR", group: "F" },

  // GRUP G (MUNR)
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
  { nim: "102022600067", name: "RAFI'HAQQANI", classCode: "SI5003", className: "SI-50-03", assistantCode: "HAFK", group: "A" },
  { nim: "102022600070", name: "SASKIA PUTRI NAYA", classCode: "SI5003", className: "SI-50-03", assistantCode: "HAFK", group: "A" },

  // GRUP B (ALRS)
  { nim: "102022600092", name: "M DINEJAD AULI", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  { nim: "102022600099", name: "GISHELLA MAYRINA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  { nim: "102022600117", name: "FAZA ADIRA WIBISANA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  { nim: "102022600140", name: "AZKIA ASSYFA NURAHMAH", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  { nim: "102022600153", name: "NOVYANDRIE TEGUH WIJAYA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },
  { nim: "102022600171", name: "MUHAMAD FACHRIE SALIM", classCode: "SI5003", className: "SI-50-03", assistantCode: "ALRS", group: "B" },

  // GRUP C (NNUA)
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

  // GRUP F (MUHA)
  { nim: "102022600407", name: "ALVARO MANZAREK", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  { nim: "102022600422", name: "ARYO TEGUH RAMADHAN", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  { nim: "102022600433", name: "KHALILA MALIKA", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  { nim: "102022600441", name: "ANAK AGUNG GEDE BAGUS PRAJNA BHASKARA", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  { nim: "102022600454", name: "KAMAYUGA DZIKRA NURKAMIL", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },
  { nim: "102022600469", name: "ATTAYA MIKHAIL", classCode: "SI5003", className: "SI-50-03", assistantCode: "MUHA", group: "F" },

  // GRUP G (ADRP)
  { nim: "102022600482", name: "M YUSRAN AKSA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022600493", name: "BINTANG MULIA KAMBA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022600513", name: "NICHOLAS MYTEN SIREGAR", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022630011", name: "MUHAMMAD RASYA", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022630016", name: "ARFAN FARRAS RAHMATULLAH", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022630047", name: "KALEB FRANKLIN BUKSALWEMBUN", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
  { nim: "102022680033", name: "YUL AMROZI", classCode: "SI5003", className: "SI-50-03", assistantCode: "ADRP", group: "G" },
];

// Map of finalized plottings for Shift 1 s.d. 9
export const ALL_SHIFT_PLOTTINGS: Record<number, ShiftPlottingSummary> = {
  1: {
    shiftNumber: 1,
    className: "SI-50-12",
    classCode: "SI5012",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "ADDH", studentCount: 7 },
      { group: "B", assistantCode: "IPGA", studentCount: 6 },
      { group: "C", assistantCode: "DERA", studentCount: 6 },
      { group: "D", assistantCode: "FIAG", studentCount: 6 },
      { group: "E", assistantCode: "ADFZ", studentCount: 6 },
      { group: "F", assistantCode: "AITS", studentCount: 6 },
      { group: "G", assistantCode: "MUDI", studentCount: 3 },
    ],
    students: SHIFT_1_STUDENTS,
  },
  2: {
    shiftNumber: 2,
    className: "SI-50-02",
    classCode: "SI5002",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "GRGS", studentCount: 7 },
      { group: "B", assistantCode: "ADFZ", studentCount: 6 },
      { group: "C", assistantCode: "INTC", studentCount: 5 },
      { group: "D", assistantCode: "DEVO", studentCount: 5 },
      { group: "E", assistantCode: "ADDH", studentCount: 6 },
      { group: "F", assistantCode: "FIAG", studentCount: 7 },
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
      { group: "A", assistantCode: "TICS", studentCount: 5 },
      { group: "B", assistantCode: "LAUF", studentCount: 7 },
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
      { group: "A", assistantCode: "MUDI", studentCount: 7 },
      { group: "B", assistantCode: "INTC", studentCount: 5 },
      { group: "C", assistantCode: "RAZA", studentCount: 5 },
      { group: "D", assistantCode: "MJFA", studentCount: 5 },
      { group: "E", assistantCode: "ARNA", studentCount: 5 },
      { group: "F", assistantCode: "MACY", studentCount: 8 },
      { group: "G", assistantCode: "DSPH", studentCount: 6 },
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
      { group: "E", assistantCode: "DSPH", studentCount: 6 },
      { group: "F", assistantCode: "LAUF", studentCount: 5 },
      { group: "G", assistantCode: "MJFA", studentCount: 4 },
    ],
    students: SHIFT_5_STUDENTS,
  },
  6: {
    shiftNumber: 6,
    className: "SI-50-10",
    classCode: "SI5010",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "IPGA", studentCount: 7 },
      { group: "B", assistantCode: "ADRP", studentCount: 7 },
      { group: "C", assistantCode: "ARSM", studentCount: 5 },
      { group: "D", assistantCode: "DEVO", studentCount: 5 },
      { group: "E", assistantCode: "HAFK", studentCount: 6 },
      { group: "F", assistantCode: "MJFA", studentCount: 5 },
      { group: "G", assistantCode: "SYOW", studentCount: 4 },
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
      { group: "A", assistantCode: "MJFA", studentCount: 7 },
      { group: "B", assistantCode: "MUDI", studentCount: 6 },
      { group: "C", assistantCode: "DSPH", studentCount: 5 },
      { group: "D", assistantCode: "MACY", studentCount: 6 },
      { group: "E", assistantCode: "ARNA", studentCount: 6 },
      { group: "F", assistantCode: "JBJR", studentCount: 6 },
      { group: "G", assistantCode: "MUNR", studentCount: 4 },
    ],
    students: SHIFT_8_STUDENTS,
  },
  9: {
    shiftNumber: 9,
    className: "SI-50-03",
    classCode: "SI5003",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "HAFK", studentCount: 7 },
      { group: "B", assistantCode: "ALRS", studentCount: 6 },
      { group: "C", assistantCode: "NNUA", studentCount: 5 },
      { group: "D", assistantCode: "RAAP", studentCount: 6 },
      { group: "E", assistantCode: "JBJR", studentCount: 5 },
      { group: "F", assistantCode: "MUHA", studentCount: 6 },
      { group: "G", assistantCode: "ADRP", studentCount: 7 },
    ],
    students: SHIFT_9_STUDENTS,
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

  // Jika belum ada di shift 1-4, beri preview shift tentatif untuk asisten tersebut agar dashboard tidak kosong
  if (result.length === 0) {
    // Cari shift default berdasarkan hash kode asisten
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
