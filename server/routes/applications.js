const router = require('express').Router();

const CourseApplication = require('../models/CourseApplication');

router.get('/', async (req, res) => {
  // responds with all CourseApplications stored in database
  try {
    const applications = await CourseApplication.find();
    res.json(applications);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  // stores submitted CourseApplication data in database
  try {
    const payload = req.body.courseApplication;

    if (
      !payload.participants ||
      payload.participants.length < 1
    ) {
      throw new Error();
    }

    const courseApplication = new CourseApplication(
      payload
    );

    await courseApplication.save();

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
