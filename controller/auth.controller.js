// auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const EmployeeRepository = require('../repository/repository'); // Using the repository for DB operations

// Use SECRET_KEY from environment variables
const SECRET_KEY = process.env.SECRET_KEY;

// Controller to handle user registration
const register = async (req, res) => {
  try {
    const { emp_name, email, password } = req.body;

    // Check if user already exists
    const existingEmployee = await EmployeeRepository.findByEmail(email);
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12); // Increase salt rounds for better security

    // Create new employee
    const newEmployee = await EmployeeRepository.create({
      emp_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Email from request:', email);
        console.log('Password from request:', password);

        // Find user by email
        const employee = await EmployeeRepository.findByEmail(email);
        if (!employee) {
            console.log('No user found with this email');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Employee fetched from database:', employee);

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
        }
        console.log('Password comparison result:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: employee.id, email: employee.email }, SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: error.message });
    }
};  

module.exports = {
  register,
  login,
  SECRET_KEY,
};
