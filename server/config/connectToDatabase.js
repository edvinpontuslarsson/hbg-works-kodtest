const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect('mongodb://mongo:27017/hbg-works-kodtest')
    .then(() => console.log('database connected'))
    .catch((err) => console.log(err));
};
