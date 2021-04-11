const router = require('express').Router();

const getFile = require('../utils/utils').getFile;
const uniqueDates = require('../utils/utils').uniqueDates;

router.get('/', async (req, res) => {
  try {
    const courses = await getFile('kurser/kurser.json');
    const coursesUniqueDates = uniqueDates(courses);
    res.json(coursesUniqueDates);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
