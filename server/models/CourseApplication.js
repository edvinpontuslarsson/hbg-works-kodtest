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

const CourseApplication = mongoose.model(
  'CourseApplication',
  courseApplicationSchema
);

module.exports = CourseApplication;
