const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const config = require('./config');
const middlewares = require('./middleware');
const checkAuthentication = require('./lib/checkAuthentication');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true,
});

middlewares(app);

app.use('/api', checkAuthentication, routes);

const server = app.listen(config.port);

module.exports = server;
