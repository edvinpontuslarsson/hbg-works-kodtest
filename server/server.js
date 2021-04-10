const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const CourseApplication = require('./models/CourseApplication');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO global error handling

mongoose
  .connect('mongodb://mongo:27017/hbg-works-kodtest')
  .then(() => console.log('database connected'))
  .catch((err) => console.log(err));

const getFile = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, file) => {
      if (err) return resolve([]);
      resolve(JSON.parse(file));
    });
  });

// TODO maybe instead feed into db,
// then unique prop for dates
const uniqueDates = (courses) =>
  courses.map((course) => {
    return {
      ...course,
      dates: [...new Set(course.dates)],
    };
  });

app.get('/api/courses', async (req, res) => {
  // TODO try catch wrap
  const courses = await getFile('kurser/kurser.json');
  const coursesUniqueDates = uniqueDates(courses);
  res.json(coursesUniqueDates);
});

app.get('/api/applications', async (req, res) => {
  try {
    const applications = await CourseApplication.find();
    res.json(applications);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/api/applications', async (req, res) => {
  // TODO try catch wrap
  // can quickly test works by
  // adding required field to schema not coming from client
  const payload = req.body.courseApplication;

  const courseApplication = new CourseApplication(payload);

  await courseApplication.save();

  res.sendStatus(201);
});

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log('The server is running...')
);
