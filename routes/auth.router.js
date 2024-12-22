// auth.router.js
const express = require('express');
const { register, login } = require('../controller/auth.controller'); // Import auth controller

const router = express.Router();

// Define authentication routes
router.post('/register', register); // Route for user registration
router.post('/login', login); // Route for user login

module.exports = router;
