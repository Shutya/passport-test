const { Strategy } = require('passport-local');
const config = require('../config');
const User = require('../models/user');
const { comparePasswords } = require('../lib/bcrypt');

const localStrategy = new Strategy(config.githubAuth,
  async function (username, password, done) {
    try {
      const user = await User.findOne({ username });
      const matchPasswords = user && await comparePasswords(password, user && user.password);
      if (user && matchPasswords) {
        done(null, user.toJSON());
      } else {
        done(null, null);
      }
    } catch (err) {
      done(err);
    }
  }
);

module.exports = localStrategy;