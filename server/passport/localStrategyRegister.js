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
      .createOneOrErrorLocal({'local.email': email}, {email, password})
      .then((data) => done(null, data))
      .catch((err) => done(err) );
  }
);

module.exports = {
  name: 'local-register',
  core: localStrategy
};
