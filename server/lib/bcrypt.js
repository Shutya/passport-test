const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    throw new Error(err);
  }
}

const comparePasswords = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { hashPassword, comparePasswords };