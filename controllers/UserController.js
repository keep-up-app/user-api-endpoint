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
    find,
    update,
    destroy
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
        
        await validator.make(params).catch(err => reject(err));
        validator.match(params.password).catch(err => reject(err));
        
        let email = params.email;
        let password = params.password.first;

        let anyMatching = await User.findOne({ email: email })
            .catch(err => reject(err));

        if (anyMatching) return reject({ 
            message: "User already exists.",
            code: 400 
        });

        let user = new User({
            _id: generator.generateUUID,
            username: generator.generateUsername,
            email: email,
            password: password,
        });

        await user.save().catch(err => reject({ 
            message: "An error occured while registering User",
            details: err.message, 
            code: 500
        }));
        
        return resolve(user);
    });
}


/**
 * Finds any user matching given paramaters
 * 
 * params = {
 *    email: example@email.com,
 *    username: example,
 *    steamid: 76561198017260430
 * }
 * 
 * @param {Object} params 
 */

function find(params) {
    return new Promise(async(resolve, reject) => {
        
        await validator.make(params).catch(err => reject(err));

        var user = await User.find(params)
            .then(users => users[0])
            .catch(err => reject({
                message: "Error finding User",
                details: err.message,
                code: 500,
            }));
        
        if (!user) return reject({
            message: "User not found.",
            code: 404
        });
        
        return resolve(user);
    });
};


/**
 * Updates user with given params:
 * 
 * params = {
 *    find: {
 *       _id: 693e6779-a6a2-484f-84d4-abc898f50bd2
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

        await validator.make(params.find).catch(err => reject(err));
        await validator.make(params.with).catch(err => reject(err));

        if (params.with.password) {
            let passwords = params.with.password;
            await validator.match(passwords).catch(err => reject(err));
        }
        
        var updatedUser = await this.find(params.find).catch(err => reject(err));
        
        updatedUser.steamid = parseInt(params.with.steamid) || updatedUser.steamid;
        updatedUser.username = params.with['username'] || updatedUser.username;
        updatedUser.password = params.with.password['first'] || updatedUser.password;
        updatedUser.email = params.with['email'] || updatedUser.email;

        await updatedUser.save().catch(err => reject({
            message: "Error updating User",
            details: err.message,
            code: 500
        }));

        return resolve(updatedUser);
    });
};


/**
 * Destroys user based on params:
 * 
 * params = {
 *    email: example@email.com,
 *    username: example,
 *    steamid: 76561198017260430
 * }
 * 
 * @param {Object} params
 */

function destroy(params) {
    return new Promise(async(resolve, reject) => {

        if (params.password) return reject({
            message: "Operation not permitted",
            details: "Cannot search User by password",
            code: 403
        });

        let user = await this.find(params).catch(err => reject(err));
        
        await validator.make(params).catch(err => reject(err));

        if (user)
            user.deleteOne()
                .then(res => resolve("User profile deleted :'("))
                .catch(err => reject({
                    message: "Error removing User porfile. Maybe she doesn't want you to go...",
                    details: err.message,
                    code: 500
                }));
    });
}