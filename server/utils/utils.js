const fs = require('fs');

/**
 * @param {string} filePath
 * @returns {Promise<Array | object>} parsed json content
 */
const getJsonFileContent = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, file) => {
      if (err) throw new Error();
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

module.exports = { getJsonFileContent, uniqueDates };
