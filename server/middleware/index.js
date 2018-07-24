const bodyParser = require('body-parser');
const formData = require("express-form-data");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('../config');

const passportInitializer = require('../lib/passportInitializer');
const gitHubStrategy = require('../passport/githubStrategy');
const localStrategy = require('../passport/localStrategy');

module.exports = (app) => {
    app.use(cookieParser('passport_test'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors(config.corsOptions));
    app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    passportInitializer(passport, gitHubStrategy, localStrategy);
    app.use(formData.parse(config.multipartyOptions));
};
