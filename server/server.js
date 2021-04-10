const express = require('express');

const db = require('./config/dbHandler');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

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
