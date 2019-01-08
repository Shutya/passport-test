const User = require('../models/user');
const { hashPassword } = require('../lib/bcrypt');

const config = require('../config');
const {signToken} = require('../lib/jwt');

exports.register = async (req, res, next) => {
    try {
        const data = req.body;
        const userExists = await User.findOne({ username: data.username });
        if (userExists) {
            res.status(409).send('User already exists');
        } else {
            const user = new User({ username: data.username, password: await hashPassword(data.password)});
            const savedUser = await user.save();
            const token = signToken(savedUser.toJSON());
            res.cookie('auth', token);
            res.send('Ok');
        }
    } catch (err) {
        res.status(404).send(err);
    }
};

exports.logout = (req, res) => {
    req.logout();
    res.clearCookie('auth');
    res.send('Ok');
};

exports.getUser = (req, res, next) => {
    User.findById(req.user._id)
        .then(user => res.status(200).json(user))
        .catch(() => res.status(404).json('Not found'))
};

exports.localAuthHandler = (req, res) => {
    if (req.user) {
        const token = signToken(req.user);
        res.cookie('auth', token);
        res.send('Ok')
    } else {
        res.status(500).send('Send user please')
    }
};

exports.githubAuthHandler = (req, res) => {
    if (req.user) {
        const token = signToken(req.user);
        res.cookie('auth', token);
        res.redirect(config.successRedirect)
    } else {
        res.redirect(config.failureRedirect)
    }
};
