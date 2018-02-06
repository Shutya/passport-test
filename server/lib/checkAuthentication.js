const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated() || ['/auth/github', '/register', '/login'].some(path => req.path.includes(path))) {
    return next();
  } else {
    const error = new Error();
    error.message = 'Unauthorized';
    error.status = 401;
    return next(error);
  }
};

module.exports = checkAuthentication;