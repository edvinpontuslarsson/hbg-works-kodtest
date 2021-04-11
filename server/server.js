const express = require('express');

const db = require('./config/dbHandler');
const routes = require('./routes/routes');

const server = express();

// middleware settings to handle incoming data
server.use(express.json());
server.use(express.urlencoded());

// to use routes directory for http requests
server.use('/api', routes);

db.on('error', (err) => {
  console.error('db connection error', err);
});

const port = process.env.PORT || 8000;

db.once('open', () => {
  console.log('Database connected');

  server.listen(port, () =>
    console.log(`Server is running on port ${port}`)
  );
});
