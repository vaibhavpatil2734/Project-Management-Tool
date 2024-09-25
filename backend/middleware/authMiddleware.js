const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const authHeader = req.header('Authorization'); // Get the Authorization header
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or incorrect format. Please log in.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret
    
    // Attach the decoded user data to the request object for later use
    req.user = decoded; 
    console.log('Decoded token:', decoded);

    // Check if the user role is 'admin'
    if (decoded.role !== 'admin') {  // Access role directly from decoded
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error.message); // Log error message
    return res.status(400).json({ message: 'Invalid token. Please log in again. Middle last' });
  }
};

module.exports = verifyAdmin;
