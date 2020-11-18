/**
 * Loading all dependencies
 */

const mongoose = require("mongoose");
require('mongoose-long')(mongoose);
const { Schema, Types: {Long} } = mongoose;


/**
 * Creating new user schema (ching what/how data is saved)
 */

const userSchema = new Schema({
    _id: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    steamid: {
        type: Long,
        require: true,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String,
        require: true
    }
}, {
    versionKey: false,
    timestamps: false,
    _id: false
});


/**
 * Creating User model with set schema
 */

mongoose.model("User", userSchema);