const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const createModel = require('../lib/mongoose').createModel;
const findOneOrCreateGithub = require('../lib/mongoose').findOneOrCreateGithub;
const createOneOrErrorLocal = require('../lib/mongoose').createOneOrErrorLocal;
const findOneAndLoginLocal = require('../lib/mongoose').findOneAndLoginLocal;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    github: {
        id: String,
        username: String,
        login: String
    },
    local: {
        email: String,
        password: String,
    }
});

UserSchema.pre('save', function(next) {
    return this.local.password ? bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        return bcrypt.hash(this.local.password, salt, null, (error, hash) => {
            if (error) return next(error);
            this.local.password = hash;
            return next();
        });
    }) : next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    let result;
    await bcrypt.compare(candidatePassword, this.local.password, (err, isMatch) => {
        result = !err && isMatch;
    });
    return result;
};

const userModel = createModel(
    'User',
    UserSchema,
    findOneOrCreateGithub,
    findOneAndLoginLocal,
    createOneOrErrorLocal
);

module.exports = userModel;
