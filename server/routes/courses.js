const router = require('express').Router();

const getJsonFileContent = require('../utils/utils')
  .getJsonFileContent;
const uniqueDates = require('../utils/utils').uniqueDates;

router.get('/', async (req, res) => {
  try {
    const courses = await getJsonFileContent(
      'kurser/kurser.json'
    );
    const coursesUniqueDates = uniqueDates(courses);
    res.json(coursesUniqueDates);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
