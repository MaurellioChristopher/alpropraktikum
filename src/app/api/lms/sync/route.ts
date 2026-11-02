import { NextRequest, NextResponse } from "next/server";
import { SI50_CLASSES } from "@/lib/si-classes";
import { MOODLE_STUDENTS_BY_CLASS, LMS_ALPRO_METADATA } from "@/data/moodle-alpro-students";

const DEFAULT_MOODLE_TOKEN = process.env.MOODLE_MOBILE_TOKEN || "fc6d5658f31cb68d90907134703b5694";
const MOODLE_BASE_URL = process.env.MOODLE_LMS_URL || "https://lms.telkomuniversity.ac.id";
const COURSE_ID = parseInt(process.env.MOODLE_ALPRO_COURSE_ID || "9963", 10);

interface MoodleGradeItem {
  itemname?: string;
  graderaw?: number | null;
  gradeformatted?: string;
  grademax?: number;
}

function parseGradeItems(gradeItems: MoodleGradeItem[]) {
  const result: {
    warmingUp: number | null;
    preTest: number | null;
    practice: number | null;
    jurnal: number | null;
    postTest: number | null;
  } = {
    warmingUp: null,
    preTest: null,
    practice: null,
    jurnal: null,
    postTest: null,
  };

  if (!gradeItems || !Array.isArray(gradeItems)) return result;

  for (const item of gradeItems) {
    if (!item.itemname || item.graderaw === null || item.graderaw === undefined) continue;
    const name = item.itemname.trim();
    let raw = item.graderaw;

    // Normalize scale if out of 10
    if (item.grademax === 10 && raw <= 10) {
      raw = raw * 10;
    }
    const val = Math.round(raw * 100) / 100;

    if (/warming\s*up/i.test(name)) {
      if (result.warmingUp === null || val > result.warmingUp) result.warmingUp = val;
    } else if (/pre\s*test/i.test(name)) {
      if (result.preTest === null || val > result.preTest) result.preTest = val;
    } else if (/practice/i.test(name)) {
      if (result.practice === null || val > result.practice) result.practice = val;
    } else if (/journal|jurnal/i.test(name)) {
      if (result.jurnal === null || val > result.jurnal) result.jurnal = val;
    } else if (/post\s*test/i.test(name)) {
      if (result.postTest === null || val > result.postTest) result.postTest = val;
    }
  }

  return result;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const token = body.token || DEFAULT_MOODLE_TOKEN;
    const classCode = body.classCode; // e.g. "SI5004" or undefined for all

    // 1. Verify token with site info
    const siteInfoUrl = `${MOODLE_BASE_URL}/webservice/rest/server.php?wstoken=${token}&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json`;
    const siteRes = await fetch(siteInfoUrl, {
      headers: { "User-Agent": "MoodleMobile" },
      cache: "no-store",
    });

    if (!siteRes.ok) {
      return NextResponse.json(
        { success: false, error: "Gagal terhubung ke server LMS Moodle Telkom University." },
        { status: 502 }
      );
    }

    const siteData = await siteRes.json();
    if (siteData.errorcode || siteData.exception) {
      return NextResponse.json(
        {
          success: false,
          error: `Token LMS tidak valid: ${siteData.message || siteData.errorcode}`,
        },
        { status: 401 }
      );
    }

    // 2. Fetch enrolled users for Course 9963
    const enrolledUrl = `${MOODLE_BASE_URL}/webservice/rest/server.php?wstoken=${token}&wsfunction=core_enrol_get_enrolled_users&courseid=${COURSE_ID}&moodlewsrestformat=json`;
    const enrolledRes = await fetch(enrolledUrl, {
      headers: { "User-Agent": "MoodleMobile" },
      cache: "no-store",
    });

    let enrolledUsers: any[] = [];
    if (enrolledRes.ok) {
      const data = await enrolledRes.json();
      if (Array.isArray(data)) {
        enrolledUsers = data.filter((u: any) =>
          u.roles && u.roles.some((r: any) => r.shortname === "student")
        );
      }
    }

    // Determine target classes
    const targetClasses = classCode ? [classCode] : SI50_CLASSES.map((c) => c.code);
    const updatedGradesByClass: Record<string, any[]> = {};

    // For each class, fetch grades
    for (const clsCode of targetClasses) {
      const existingRoster = MOODLE_STUDENTS_BY_CLASS[clsCode] || [];
      const classStudents = existingRoster.map((s) => {
        // Find matching enrolled student by NIM or Name
        const matched = enrolledUsers.find((eu) => {
          const euNim =
            eu.idnumber ||
            eu.customfields?.find((cf: any) => cf.shortname === "userid")?.value;
          return euNim === s.nim || eu.fullname?.toLowerCase() === s.name.toLowerCase();
        });

        return {
          ...s,
          userId: matched?.id || (s as any).userId,
        };
      });

      // Fetch grades for students in parallel (batch of 8)
      const updatedList = await Promise.all(
        classStudents.map(async (student: any) => {
          if (!student.userId) {
            return {
              nim: student.nim,
              name: student.name,
              warmingUp: student.warmingUp?.toString() || "",
              preTest: student.preTest?.toString() || "",
              practice: student.practice?.toString() || "",
              jurnal: student.jurnal?.toString() || "",
              postTest: student.postTest?.toString() || "",
            };
          }

          try {
            const gradeUrl = `${MOODLE_BASE_URL}/webservice/rest/server.php?wstoken=${token}&wsfunction=gradereport_user_get_grade_items&courseid=${COURSE_ID}&userid=${student.userId}&moodlewsrestformat=json`;
            const gRes = await fetch(gradeUrl, {
              headers: { "User-Agent": "MoodleMobile" },
              cache: "no-store",
            });

            if (gRes.ok) {
              const gData = await gRes.json();
              if (gData.usergrades && gData.usergrades[0]) {
                const parsed = parseGradeItems(gData.usergrades[0].gradeitems);
                return {
                  nim: student.nim,
                  name: student.name,
                  warmingUp: parsed.warmingUp !== null ? parsed.warmingUp.toString() : (student.warmingUp?.toString() || ""),
                  preTest: parsed.preTest !== null ? parsed.preTest.toString() : (student.preTest?.toString() || ""),
                  practice: parsed.practice !== null ? parsed.practice.toString() : (student.practice?.toString() || ""),
                  jurnal: parsed.jurnal !== null ? parsed.jurnal.toString() : (student.jurnal?.toString() || ""),
                  postTest: parsed.postTest !== null ? parsed.postTest.toString() : (student.postTest?.toString() || ""),
                };
              }
            }
          } catch (err) {
            // Fallback to existing student grade on fetch error
          }

          return {
            nim: student.nim,
            name: student.name,
            warmingUp: student.warmingUp?.toString() || "",
            preTest: student.preTest?.toString() || "",
            practice: student.practice?.toString() || "",
            jurnal: student.jurnal?.toString() || "",
            postTest: student.postTest?.toString() || "",
          };
        })
      );

      updatedGradesByClass[clsCode] = updatedList;
    }

    return NextResponse.json({
      success: true,
      user: siteData.fullname || siteData.username,
      institution: LMS_ALPRO_METADATA.institution,
      courseId: COURSE_ID,
      timestamp: new Date().toISOString(),
      updatedGrades: updatedGradesByClass,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Terjadi kesalahan internal saat sinkronisasi LMS." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || DEFAULT_MOODLE_TOKEN;

  try {
    const siteInfoUrl = `${MOODLE_BASE_URL}/webservice/rest/server.php?wstoken=${token}&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json`;
    const siteRes = await fetch(siteInfoUrl, {
      headers: { "User-Agent": "MoodleMobile" },
      cache: "no-store",
    });

    const siteData = await siteRes.json();
    if (siteData.errorcode || siteData.exception) {
      return NextResponse.json({
        valid: false,
        error: siteData.message || siteData.errorcode,
      });
    }

    return NextResponse.json({
      valid: true,
      user: {
        fullname: siteData.fullname,
        username: siteData.username,
        userid: siteData.userid,
        sitename: siteData.sitename,
      },
      courseId: COURSE_ID,
    });
  } catch (err: any) {
    return NextResponse.json({ valid: false, error: err.message }, { status: 500 });
  }
}
