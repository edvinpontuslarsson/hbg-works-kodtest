const express = require('express');

const getFile = require('./utils/utils').getFile;
const uniqueDates = require('./utils/utils').uniqueDates;
const db = require('./config/dbHandler');
const CourseApplication = require('./models/CourseApplication');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO global error handling

app.use('/api', routes);

app.get('/api/courses', async (req, res) => {
  // TODO try catch wrap
  const courses = await getFile('kurser/kurser.json');
  const coursesUniqueDates = uniqueDates(courses);
  res.json(coursesUniqueDates);
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
