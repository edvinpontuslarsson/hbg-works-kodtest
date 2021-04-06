// for now just testing that
// docker + database set up works

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
  .connect('mongodb://mongo:27017/hbg-works-kodtest')
  .then(() => console.log('database connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello Helsingborg!');
});

const port = 3000;

app.listen(port, () =>
  console.log('The server is running...')
);
