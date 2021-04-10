const router = require('express').Router();

const getFile = require('../utils/utils').getFile;
const uniqueDates = require('../utils/utils').uniqueDates;

router.get('/', async (req, res) => {
  // TODO try catch wrap
  const courses = await getFile('kurser/kurser.json');
  const coursesUniqueDates = uniqueDates(courses);
  res.json(coursesUniqueDates);
});

module.exports = router;
