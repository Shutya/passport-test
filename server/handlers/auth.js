const jwt = require('jsonwebtoken');
const User = require('../models/user');

const config = require('../config');


exports.logout = (req, res) => {
    req.logout();
    res.status(201).send({
        message: 'Redirect to base page'
    });
}

exports.getUser = (req, res, next) => {
    User.findById(req.user._id, (err, user) => {
        if (!user) {
            return res.status(401).json({ error: 'Not found' });
        }
        const data = user.github.username ? user.github : {email: user.local.email};
        return res.status(200).json(data);
    })
};

exports.github = (req, res, next) => {
    return res.redirect(config.successRedirect);
}

exports.localRegister = (req, res, next) => {
    return res.status(201).json({ status: 'OK' });
}

exports.localLogin = (req, res, next) => {
    return res.status(201).json({ status: 'OK' });
}
