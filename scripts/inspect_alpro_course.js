const https = require('https');
const fs = require('fs');

const token = 'fc6d5658f31cb68d90907134703b5694';
const baseUrl = 'https://lms.telkomuniversity.ac.id/webservice/rest/server.php';

async function callMoodle(wsfunction, params = {}) {
  const queryParams = new URLSearchParams({
    wstoken: token,
    wsfunction: wsfunction,
    moodlewsrestformat: 'json',
    ...params
  });

  const url = `${baseUrl}?${queryParams.toString()}`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MoodleMobile' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

(async () => {
  try {
    const courseId = 9963;
    console.log(`1. Fetching course contents for courseId: ${courseId}...`);
    const contents = await callMoodle('core_course_get_contents', { courseid: courseId });
    fs.writeFileSync('alpro_contents.json', JSON.stringify(contents, null, 2), 'utf-8');
    console.log(`Saved contents to alpro_contents.json. Sections count: ${contents.length}`);
    
    // Summary of modules
    contents.forEach(sec => {
      if (sec.modules && sec.modules.length > 0) {
        console.log(`\nSection: ${sec.name} (ID: ${sec.id})`);
        sec.modules.forEach(m => {
          console.log(`  - [${m.modname}] ${m.name} (id: ${m.id}, instance: ${m.instance})`);
        });
      }
    });

    console.log(`\n2. Fetching grade items for courseId: ${courseId}...`);
    const gradeItems = await callMoodle('core_grades_get_gradeitems', { courseid: courseId });
    fs.writeFileSync('alpro_gradeitems.json', JSON.stringify(gradeItems, null, 2), 'utf-8');
    if (gradeItems.gradeItems) {
      console.log(`Found ${gradeItems.gradeItems.length} grade items:`);
      gradeItems.gradeItems.forEach(g => {
        console.log(`  - ${g.itemname} (id: ${g.id}, type: ${g.itemtype}, module: ${g.itemmodule})`);
      });
    } else {
      console.log('Grade items response:', gradeItems);
    }

    console.log(`\n3. Fetching enrolled users for courseId: ${courseId}...`);
    const users = await callMoodle('core_enrol_get_enrolled_users', { courseid: courseId });
    fs.writeFileSync('alpro_enrolled_users.json', JSON.stringify(users, null, 2), 'utf-8');
    if (Array.isArray(users)) {
      console.log(`Total enrolled users: ${users.length}`);
      const students = users.filter(u => u.roles && u.roles.some(r => r.shortname === 'student'));
      console.log(`Students count: ${students.length}`);
      console.log('Sample user:', users[0]);
    } else {
      console.log('Users response:', users);
    }
  } catch (err) {
    console.error('Error:', err);
  }
})();
