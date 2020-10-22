/**
 * Getting User Model
 */

require('../models/User');


/**
 * Load all dependencies
 */

const validator = require('../util/validator');
const generator = require('../util/generator');
const mongoose = require("mongoose");
const User = mongoose.model("User");


/**
 * Creates new User while check for cred valididty with input:
 * params = {
 *    email: example@email.com,
 *    password: password12345
 * }
 * 
 * @param {Object} params 
 */

function create(params) {
    return new Promise(async(resolve, reject) => {

        let email = params.email;
        let password = params.password;

        let invalid = validator.make({
            'email': email,
            'password': password
        });
        if (invalid) reject(invalid);

        let matching = await findAnyMatching({ email: email });
        if (matching) reject('User already exists.');

        var user = new User({
            username: generator.generateUsername,
            email: email,
            password: password,
        });

        user.save().catch(err => reject("An error occured while saving user."));

        resolve(user);
    });
}


module.exports = {
    create
}








/**
 * Finds any user matching given paramater. Example:
 * 
 * params = {
 *    username: example,
 *    email: example@email.com
 * }
 * 
 * will return the first user with matching paramaters
 * 
 * @param {Object} params 
 * @returns {User}
 */

async function findAnyMatching(params) {

    var user = null;

    await User.find(params)
        .then((users) => {
            user = users[0];
        })
        .catch((err) => { throw err });

    return user;
}


/**
 * Finds user asynchronously by Id while also handling whether id is a valid ObjectId to prevent errors
 * 
 * @param {ObjectId} id
 * @returns {User}
 */

async function findById(id) {

    var user = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {

        await User.findById(id)
            .then((users) => {
                user = users;
            })
            .catch((err) => { throw err });
    }

    return user;
}