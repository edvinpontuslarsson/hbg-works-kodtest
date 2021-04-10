const router = require('express').Router();

const CourseApplication = require('../models/CourseApplication');

router.get('/', async (req, res) => {
  try {
    const applications = await CourseApplication.find();
    res.json(applications);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  // TODO try catch wrap
  // can quickly test works by
  // adding required field to schema not coming from client
  const payload = req.body.courseApplication;

  const courseApplication = new CourseApplication(payload);

  await courseApplication.save();

  res.sendStatus(201);
});

module.exports = router;
