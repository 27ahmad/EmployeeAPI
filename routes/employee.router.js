// employee.router.js
const express = require('express');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controller/controller'); // Use controller functions

const router = express.Router();

// Define routes
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;