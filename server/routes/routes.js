const router = require('express').Router();

const applications = require('./applications');
const courses = require('./courses');

// defines modules to use for different routes (api uri paths)
router.use('/applications', applications);
router.use('/courses', courses);

module.exports = router;
