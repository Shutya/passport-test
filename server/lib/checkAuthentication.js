const { verifyToken } = require('./jwt');

const checkAuthentication = async (req, res, next) => {
  try {
    if (req.isAuthenticated() || ['/auth/github', '/register', '/login'].some(path => req.path.includes(path))) {
      return next();
    }
    const token = req.cookies.auth;
    const decodedToken = token && await verifyToken(token);
    if (decodedToken) {
      req.user = decodedToken;
      return next();
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }

};

module.exports = checkAuthentication;