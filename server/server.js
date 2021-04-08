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

app.get('/api', async (req, res) => {
  const courses = await getFile('kurser/kurser.json');
  res.json(courses);
});

app.post('/api', async (req, res) => {
  const message = req.body.message;
  console.log(message);

  res.sendStatus(201);
});

const port = 8000;

app.listen(port, () =>
  console.log('The server is running...')
);
