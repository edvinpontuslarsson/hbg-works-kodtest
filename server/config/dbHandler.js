const mongoose = require('mongoose');

const dbConnection =
  process.env.DB_CONNECTION ||
  'mongodb://mongo:27017/hbg-works-kodtest';

mongoose.connect(dbConnection);

module.exports = mongoose.connection;
