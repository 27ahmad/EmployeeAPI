 const { DataTypes } = require('sequelize');
const { createDatabaseIfNotExists, sequelize } = require('../config/database');

// Define Employee model using the existing Sequelize instance
const Employee = sequelize.define('Employee', {
  emp_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'employees',
  timestamps: true,
});

// Initialize and sync
createDatabaseIfNotExists()
  .then(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync({ alter: true });
      console.log('The table for the Employee model was just (re)created!');
    } catch (error) {
      console.error('Error initializing the database:', error);
    }
  })
  .catch(error => console.error(error));

module.exports = Employee;