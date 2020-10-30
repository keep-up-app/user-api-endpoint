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

module.exports = {
    create,
    update,
    destroy,
    find
}


/**
 * Creates new User while check for cred valididty with input
 * 
 * params = {
 *    email: example@email.com,
 *    password: password12345
 * }
 * 
 * @param {Object} params 
 */

function create(params) {
    return new Promise(async(resolve, reject) => {
        
        let invalid = validator.make(params);
        if (invalid) reject(invalid);
        
        let matching = find({ email: email }).catch(err => reject(err));
        if (matching) reject('User already exists.');

        let email = params.email;
        let password = params.password;

        var user = new User({
            username: generator.generateUsername,
            email: email,
            password: password,
        });

        user.save()
            .then(res => resolve(user))
            .catch(err => reject("An error occured while registering user."));
    });
}


/**
 * Finds any user matching given paramater. Example
 * 
 * params = {
 *    email: example@email.com,
 *    username: example,
 *    steamid: 12345567788513
 * }
 * 
 * @param {Object} params 
 */

function find(params) {
    return new Promise(async(resolve, reject) => {

        let invalid = validator.make(params);
        if (invalid) reject(invalid);

        var user = await User.find(params)
            .then(users => users[0])
            .catch(err => reject("Error finding User: " + err.message));
        
        if (!user) reject("Could not find any User")
        else resolve(user);
    });
};


/**
 * Updates user with given params:
 * 
 * params = {
 *    find: {
 *       id: 12345567788513
 *    },
 *    with: {
 *       username: newUsername,
 *    }
 * }
 * 
 * @param {Object} params 
 */

function update(params) {
    return new Promise(async(resolve, reject) => {

        let invalid = validator.make(params.find);
        if (invalid) reject(invalid);

        let user = await find(params.find).catch(err => reject(err));

        for(field in params.with)
            user.field = params.with[field];

        await user.save().catch(err => reject("Error updating User: " + err.message));
        
        resolve(user);
    });
};


/**
 * Destroys user based on params:
 * 
 * params = {
 *    email: example@email.com,
 *    username: example,
 *    steamid: 12345567788513
 * }
 * 
 * @param {Object} params
 */

function destroy(params) {
    return new Promise(async(resolve, reject) => {

        let invalid = validator.make(params);
        if (invalid) reject(invalid);

        let user = await find(params).catch(err => reject(err));

        user.destroy()
            .then(res => resolve("User profile deleted :("))
            .catch(err => reject("Error removing User porfile. Maybe he doesn't want you to go..."));
    });
}
