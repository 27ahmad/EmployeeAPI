const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

// Basic database connection info
const dbConfig = {
  database: 'test_db',
  username: 'root',
  password: 'admin',
  host: 'localhost',
  dialect: 'mysql',
};

// Create database if it doesn't exist
const createDatabaseIfNotExists = async () => {
  const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
  });
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject('Error connecting to MySQL: ' + err.message);
        return;
      }
      const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`;
      connection.query(createDbQuery, (err2) => {
        if (err2) {
          reject('Error creating database: ' + err2.message);
        } else {
          console.log('Database created or already exists.');
        }
        connection.end();
        resolve();
      });
    });
  });
};

// Initialize Sequelize without syncing yet
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

// Export both the sequelize instance and the setup function
module.exports = {
  createDatabaseIfNotExists,
  sequelize,
};