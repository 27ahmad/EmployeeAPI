// index.js
const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employee.router');
const authRoutes = require('./routes/auth.router');
const { authenticateJWT } = require('./middleware/auth.middleware');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use('/auth', authRoutes); // Routes for authentication
app.use('/employees', authenticateJWT, employeeRoutes); // Protect employee routes

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Employee Management API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

