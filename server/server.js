const express = require('express');

const getFile = require('./utils/utils').getFile;
const uniqueDates = require('./utils/utils').uniqueDates;
const db = require('./config/dbHandler');
const CourseApplication = require('./models/CourseApplication');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO global error handling

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

db.on('error', (err) => {
  console.error('db connection error', err);
});

const port = process.env.PORT || 8000;

db.once('open', () => {
  console.log('Database connected');

  app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
  );
});
