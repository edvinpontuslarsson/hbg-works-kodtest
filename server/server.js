const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

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

app.get('/api', async (req, res) => {
  const courses = await getFile('kurser/kurser.json');
  const coursesUniqueDates = uniqueDates(courses);
  res.json(coursesUniqueDates);
});

app.post('/api', async (req, res) => {
  // const messageData = req.body.message;
  // console.log(messageData);

  // const message = new Message({
  //   message: messageData,
  // });

  // await message.save();

  console.log(JSON.stringify(req.body.courseApplication));

  res.sendStatus(201);
});

const port = 8000;

app.listen(port, () =>
  console.log('The server is running...')
);
