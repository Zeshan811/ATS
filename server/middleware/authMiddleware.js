const jwt = require("jsonwebtoken");

// Vrify the JWT Token
exports.protect = (req, res, next) => {
  // Expecting header like: "Bearer <token>"
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adds userId and role to the request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Check if the user has the right role (HR vs Candidate)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: HR only" });
    }
    next();
  };
};
