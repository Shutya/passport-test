const { Strategy } = require('passport-github');
const User = require('../models/user');
const config = require('../config');

const githubStrategy = new Strategy(config.githubAuth,
function(accessToken, refreshToken, profile, done) {
  return User
    .findOne({'githubId': profile.id})
    .then(user => user ? user : new User({githubId: profile.id, username: profile.username}).save())
    .then(data => done(null, data.toJSON()))
    .catch(err => done(err) );
  }
);

module.exports = githubStrategy;
