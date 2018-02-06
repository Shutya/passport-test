const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const config = require('./config');
const middlewares = require('./middleware');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true,
});

middlewares(app);

routes(app);

const server = app.listen(config.port);

module.exports = server;
