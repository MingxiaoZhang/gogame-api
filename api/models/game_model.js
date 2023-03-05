'use strict';
const User = require('./user_model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MoveSchema = new Schema({
    move_number: Number,
    player: {
        type: Number,
        enum: [1, 2]
    },
    row: Number,
    col: Number,
});

const GameSchema = new Schema({
    game_type: {
        type: String,
        enum: ['go', 'gomoku']
    },
    player1: {
        type: Number,
        required: 'Enter player 1'
    },
    player2: {
        type: Number,
        required: 'Enter player 2'
    },
    game_date: Date,
    moves: [{
        type: MoveSchema
    }],
    result: {
        type: Number,
        enum: [1, 2],
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Game', GameSchema);
