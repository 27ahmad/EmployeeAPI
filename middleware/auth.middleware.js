// auth.middleware.js
const jwt = require('jsonwebtoken');
// const { SECRET_KEY } = require('./auth.controller.js');
// Middleware to authenticate JWT tokens
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization header missing or malformed' });
  }
};

module.exports = { authenticateJWT };
