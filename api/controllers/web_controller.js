'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('User');
const jwt = require('jsonwebtoken');

exports.add_user = async (req, res) => {
    try {
        const { username, password, country } = req.body;
        const user = new User({ username, password, country });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Append new works to author's works
exports.login_user = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) throw new Error('Invalid username or password');
        const match = await user.comparePassword(password);
        if (!match) throw new Error('Invalid username or password');
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.get_profile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


