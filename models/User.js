/**
 * Loading all dependencies
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;


/**
 * Creating new user schema (ching what/how data is saved)
 */

const userSchema = new Schema({
    username: String,
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    steamid: {
        type: String,
        require: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: false
});


/**
 * Creating User model with set schema
 */

mongoose.model("User", userSchema);