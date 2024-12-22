// controller.js
const EmployeeRepository = require('../repository/repository');
const bcrypt = require('bcrypt');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeRepository.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await EmployeeRepository.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newEmployee = await EmployeeRepository.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await EmployeeRepository.update(req.params.id, req.body);
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const success = await EmployeeRepository.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
