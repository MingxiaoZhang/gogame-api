'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    country: String,
    games: {
        type: [Number],
        default: undefined,
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

// Compare password hash with user input
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
