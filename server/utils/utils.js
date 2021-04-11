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

/**
 * @param {Array<object>} courses from json file
 * @returns {Array<object>} new array with course objects except duplicate dates are excluded
 */
const uniqueDates = (courses) =>
  courses.map((course) => {
    return {
      ...course,
      dates: [...new Set(course.dates)],
    };
  });

module.exports = { getJsonFileContent, uniqueDates };
