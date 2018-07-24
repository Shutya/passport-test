const express = require('express');
const passport = require('passport');

const auth = require('../handlers/auth');
const config = require('../config');

const router = express.Router();

router.get('/me', auth.getUser);
router.get('/logout', auth.logout);
router.post('/register', auth.register);
router.post('/login', passport.authenticate('local'), auth.localAuthHandler);
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: config.failureRedirect
}), auth.githubAuthHandler);

module.exports = router;
