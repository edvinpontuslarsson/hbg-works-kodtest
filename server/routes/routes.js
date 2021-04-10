const router = require('express').Router()

const applications = require('./applications');
const courses = require('./courses');

router.use('applications', applications);
// router.use('courses', courses);

module.exports = router;
