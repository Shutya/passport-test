const express = require('express');
const passport = require('passport');

const auth = require('../handlers/auth');
const config = require('../config');
const checkAuthentication = require('../lib/checkAuthentication');

const apiRouter = express.Router();

module.exports = (app) => {
    apiRouter.get('/me', auth.getUser);
    apiRouter.get('/logout', auth.logout);
    apiRouter.post('/register', passport.authenticate('local-register'), auth.localRegister);
    apiRouter.post('/login', passport.authenticate('local-login'), auth.localLogin);
    apiRouter.get('/auth/github', passport.authenticate('github'));
    apiRouter.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: config.failureRedirect
    }), auth.github);

    app.use('/api', checkAuthentication, apiRouter);
};
