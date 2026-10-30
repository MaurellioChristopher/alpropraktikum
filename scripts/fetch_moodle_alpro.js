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
    console.log('Fetching enrolled courses for userid: 107539...');
    const courses = await callMoodle('core_enrol_get_users_courses', { userid: 107539 });
    fs.writeFileSync('moodle_courses.json', JSON.stringify(courses, null, 2), 'utf-8');
    
    if (Array.isArray(courses)) {
      console.log(`Found ${courses.length} courses:`);
      courses.forEach(c => {
        console.log(`- [ID: ${c.id}] ${c.shortname} | ${c.fullname}`);
      });
    } else {
      console.log('Response:', courses);
    }
  } catch (err) {
    console.error('Error:', err);
  }
})();
