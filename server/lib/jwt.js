const jwt = require('jsonwebtoken');

const signToken = (data) => {
  try {
    return jwt.sign(data, 'test', { expiresIn: '1h' });
  } catch (error) {
    throw error;
  }
};

const verifyToken = (token) => new Promise((resolve, reject) =>
  jwt.verify(token, 'test', (err, decoded) => err ? reject(err) : resolve(decoded)));

module.exports = {
  signToken,
  verifyToken
}
