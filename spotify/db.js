const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: 'spoty',
  password: 'spotypwd',
  database: 'spotify'
});

module.exports = connection;
