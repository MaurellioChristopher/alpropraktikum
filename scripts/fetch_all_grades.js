const https = require('https');
const fs = require('fs');

const token = 'fc6d5658f31cb68d90907134703b5694';
const baseUrl = 'https://lms.telkomuniversity.ac.id/webservice/rest/server.php';
const courseId = 9963;

async function fetchStudentGrades(userId) {
  const queryParams = new URLSearchParams({
    wstoken: token,
    wsfunction: 'gradereport_user_get_grade_items',
    moodlewsrestformat: 'json',
    courseid: courseId,
    userid: userId
  });

  const url = `${baseUrl}?${queryParams.toString()}`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'MoodleMobile' }, timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null))
      .on('timeout', () => resolve(null));
  });
}

function parseGrades(gradeItems) {
  if (!gradeItems || !Array.isArray(gradeItems)) return {};
  
  const result = {
    warming_up: null,
    pre_test: null,
    practice: null,
    jurnal: null,
    post_test: null,
    details: []
  };

  gradeItems.forEach(item => {
    if (!item.itemname) return;
    const raw = item.graderaw;
    const name = item.itemname.trim();

    if (raw !== null && raw !== undefined) {
      result.details.push({
        itemname: name,
        graderaw: raw,
        gradeformatted: item.gradeformatted,
        grademax: item.grademax
      });

      // Normalize to 0-100 scale if grademax is 10
      let normalized = raw;
      if (item.grademax === 10 && raw <= 10) {
        normalized = raw * 10;
      }

      if (/warming\s*up/i.test(name)) {
        if (result.warming_up === null || normalized > result.warming_up) {
          result.warming_up = Math.round(normalized * 100) / 100;
        }
      } else if (/pre\s*test/i.test(name)) {
        if (result.pre_test === null || normalized > result.pre_test) {
          result.pre_test = Math.round(normalized * 100) / 100;
        }
      } else if (/practice/i.test(name)) {
        if (result.practice === null || normalized > result.practice) {
          result.practice = Math.round(normalized * 100) / 100;
        }
      } else if (/journal|jurnal/i.test(name)) {
        if (result.jurnal === null || normalized > result.jurnal) {
          result.jurnal = Math.round(normalized * 100) / 100;
        }
      } else if (/post\s*test/i.test(name)) {
        if (result.post_test === null || normalized > result.post_test) {
          result.post_test = Math.round(normalized * 100) / 100;
        }
      }
    }
  });

  return result;
}

(async () => {
  const users = JSON.parse(fs.readFileSync('alpro_enrolled_users.json', 'utf-8'));
  const students = users.filter(u => u.roles && u.roles.some(r => r.shortname === 'student'));
  console.log(`Starting grade collection for ${students.length} students...`);

  const results = {};
  const cacheFile = 'alpro_students_grades_cache.json';
  if (fs.existsSync(cacheFile)) {
    try {
      Object.assign(results, JSON.parse(fs.readFileSync(cacheFile, 'utf-8')));
      console.log(`Loaded ${Object.keys(results).length} cached student grades.`);
    } catch (e) {}
  }

  const batchSize = 10;
  for (let i = 0; i < students.length; i += batchSize) {
    const batch = students.slice(i, i + batchSize);
    const promises = batch.map(async (student) => {
      if (results[student.id]) return; // Already fetched
      const res = await fetchStudentGrades(student.id);
      if (res && res.usergrades && res.usergrades[0]) {
        const parsed = parseGrades(res.usergrades[0].gradeitems);
        results[student.id] = {
          userId: student.id,
          name: student.fullname,
          nim: (student.customfields && student.customfields.find(c => c.shortname === 'userid'))?.value || student.idnumber || '',
          class: (student.groups && student.groups[0]) ? student.groups[0].name : '',
          grades: parsed
        };
      }
    });

    await Promise.all(promises);
    process.stdout.write(`Processed ${Math.min(i + batchSize, students.length)} / ${students.length} students...\r`);
    
    // Save cache incrementally every 50
    if ((i + batchSize) % 50 === 0 || i + batchSize >= students.length) {
      fs.writeFileSync(cacheFile, JSON.stringify(results, null, 2), 'utf-8');
    }
  }

  console.log(`\nFinished! Total students graded: ${Object.keys(results).length}`);
  fs.writeFileSync('alpro_students_full_grades.json', JSON.stringify(results, null, 2), 'utf-8');
})();
