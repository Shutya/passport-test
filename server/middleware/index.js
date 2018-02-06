const bodyParser = require('body-parser');
const logger = require('morgan');
const formData = require("express-form-data");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('../config');

const passportInitializer = require('../lib/passportInitializer');
const gitHubStrategy = require('../passport/githubStrategy');
const localStrategyRegister = require('../passport/localStrategyRegister');
const localStrategyLogin = require('../passport/localStrategyLogin');

module.exports = (app) => {
    app.use(cookieParser('passport_test'));
    app.use(session(config.sessionOptions));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors(config.corsOptions));
    app.use(passport.initialize());
    app.use(passport.session());
    passportInitializer(passport, gitHubStrategy, localStrategyRegister, localStrategyLogin);
    app.use(logger('dev'));
    app.use(formData.parse(config.multipartyOptions));
};
