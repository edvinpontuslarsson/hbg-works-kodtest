const mySql = require('mysql');
const fs = require('fs');

(async () => {
  const connection = getDbConnection();
  const fileContent = await getFileContent();
  await createTable(connection);
  await insert(connection, fileContent);
  connection.end(() => console.log('Db connection closed'));
})();

function getFileContent() {
  return new Promise((resolve) => {
    fs.readFile('kurser.json').then((result) => {
      resolve(result);
    });
  });
}

function getDbConnection() {
  return mySql.createConnection({
    host: process.env.hostname,
    user: process.env.mysql_username,
    password: process.env.mysql_password,
    database: process.env.database_name,
    charset: 'utf8mb4',
    debug: false,
  });
}

function createTable(connection) {
  const createTableQuery =
    'CREATE TABLE courses (json TEXT(60000))';

  return new Promise((resolve) => {
    connection.query(createTableQuery, (err) => {
      if (err) throw err;
      console.log('Table created');
      resolve();
    });
  });
}

function insert(connection, fileContent) {
  const insertQuery = `INSERT INTO courses (json) VALUES ('${fileContent}')`;

  return new Promise((resolve) => {
    connection.query(insertQuery, (err, result) => {
      if (err) throw err;
      console.log('inserted', result);
      resolve();
    });
  });
}
