const mongoose = require('mongoose');

const courseApplicationSchema = mongoose.Schema({
  courseId: { type: Number, required: true },
  courseName: { type: String, required: true },
  companyName: { type: String, required: true },
  companyPhone: { type: String, required: true },
  companyEmail: { type: String, required: true },
  participants: [
    {
      name: { type: String, required: true },
      phone: { type: String },
      email: { type: String },
    },
  ],
});

/**
 * Mongoose model, courseId has type Number, participants has type object[],
 * all other object properties have type String.
 * moddel structure: {
    courseId,
    courseName,
    companyName,
    companyPhone,
    companyEmail,
      participants: [
          {
            name,
            phone?,
            email?,
          },
      ],
    }
 */
const CourseApplication = mongoose.model(
  'CourseApplication',
  courseApplicationSchema
);

module.exports = CourseApplication;
