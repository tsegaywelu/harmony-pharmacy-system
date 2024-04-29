const jwt = require("jsonwebtoken");
const redis = require("redis");
const { promisify } = require("util");

// Create a Redis client
const client = redis.createClient({
  host: 'localhost', // Your Redis server host
  port: 6379, // Your Redis server port
});

// Promisify Redis client methods
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = async (req, res, next) => {
  try {
    // Check for authorization header presence
    if (!req.headers.authorization) {
      return res.status(401).send({
        success: false,
        message: "Authorization header is missing",
      });
    }

    // Validate header format (assuming Bearer token)
    const parts = req.headers.authorization.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      return res.status(401).send({
        success: false,
        message: "Invalid authorization header format (expected Bearer <token>)",
      });
    }

    const token = parts[1];

    const decryptedToken = jwt.verify(token, process.env.jwt_secret);

    // Check user role
    if (decryptedToken.role !== 'super_admin' && decryptedToken.role !== 'user') {
      return res.status(403).send({
        success: false,
        message: "Access denied. Only super admins and users can access this resource.",
      });
    }

    // Update session in Redis
    const sessionKey = `session:${decryptedToken.userId}`;
    const sessionValue = JSON.stringify({ userId: decryptedToken.userId, role: decryptedToken.role });
    await setAsync(sessionKey, sessionValue);

    // Attach userId to the request
    req.body.userId = decryptedToken.userId;

    next();
  } catch (error) {
    console.error(error.message); // Log the error for debugging
    res.status(401).send({
      success: false,
      message: error.message || "An error occurred while processing the request", // Provide a generic error message for security
    });
  }
};
