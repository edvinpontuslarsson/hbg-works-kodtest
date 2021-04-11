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
  try {
    const payload = req.body.courseApplication;

    const courseApplication = new CourseApplication(
      payload
    );

    await courseApplication.save();

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
