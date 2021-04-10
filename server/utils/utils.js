const fs = require('fs');

const getFile = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, file) => {
      if (err) return resolve([]);
      resolve(JSON.parse(file));
    });
  });

const uniqueDates = (courses) =>
  courses.map((course) => {
    return {
      ...course,
      dates: [...new Set(course.dates)],
    };
  });

module.exports = { getFile, uniqueDates };
