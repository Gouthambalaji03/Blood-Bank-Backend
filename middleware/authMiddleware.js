const JWT = require("jsonwebtoken");

// Express 5.x compatible async middleware
module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token not provided",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    // Initialize req.body for GET requests where it's undefined
    if (!req.body) {
      req.body = {};
    }
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: error.name === "JsonWebTokenError" ? "Invalid token" : "Auth Failed",
      error: error.message,
    });
  }
};