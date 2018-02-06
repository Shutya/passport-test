const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/user');
const config = require('../config');

const githubStrategy = new GithubStrategy({
  clientID: config.githubClientId,
  clientSecret: config.githubClientSecret,
  callbackURL: config.githubCallbackUrl
},
function(accessToken, refreshToken, profile, done) {
  return User
      .findOneOrCreateGithub({'github.id': profile.id}, profile)
      .then((data) => done(null, data))
      .catch((err) => done(err) );
  }
);

module.exports = {
  name: 'github',
  core: githubStrategy
};