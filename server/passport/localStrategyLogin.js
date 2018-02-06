const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config');

const localStrategy = new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done) {
  return User
      .findOneAndLoginLocal({'local.email': email}, {email, password})
      .then((data) => data instanceof Error ? done(null, false) : done(null, data))
      .catch((err) => done(err) );
  }
);

module.exports = {
  name: 'local-login',
  core: localStrategy
};
