const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const authHeader = req.header('Authorization'); // Get the Authorization header

  // Check if Authorization header is present and has the correct format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or incorrect format. Please log in.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token payload (user data) to the request object for later use
    req.user = decoded;

    // Log the decoded token for debugging purposes (optional)
    console.log('Decoded token authmiddl:', decoded);

    // Check if the user's role is 'admin'
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Proceed to the next middleware or route handler if everything is OK
    next();
  } catch (error) {
    console.error('Token verification error:', error.message); // Log the error message

    // Return a specific error message based on the type of error
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    } else {
      return res.status(400).json({ message: 'Invalid token. Please log in again.' });
    }
  }
};

module.exports = verifyAdmin;
