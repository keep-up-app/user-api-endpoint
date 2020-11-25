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
const uuid = require('uuid-random');
const ung = require('unique-names-generator');
const axios = require('axios');
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
    return new Promise((resolve, reject) => {

        validator.make(params).then(async() => {
            let invPwd = validator.match(params.password);

            if (invPwd == null) {
    
                let email = params.email;
                let password = params.password.first;

                let match = await User.findOne({ email: email })
                    .catch(err => reject({
                        message: "An error occured.",
                        details: err.message,
                        code: 500
                    }));

                if (match) {
                    return reject({ 
                        message: "User already exists.",
                        code: 400 });
                    
                } else {

                    let user = new User({
                        _id: uuid(),
                        username: ung.uniqueNamesGenerator(generator.UngConfig),
                        email: email,
                        password: password,
                        token: generator.generateToken(),
                        auth: {
                            enabled: false,
                            secret: null
                        },
                        created_at: new Date().toDateString(),
                    });
            
                    await user.save().catch(err => reject({ 
                        message: "An error occured while registering user.",
                        details: err.message, 
                        code: 500
                    }));
        
                    return resolve(user);
                }
            } else {
                return reject(invPwd);
            }
        }).catch(err => reject(err));
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

        if (await !User.exists(params)) {
            return reject({
                message: "User not found.",
                code: 404 });

        } else {
            var user = await User.find(params)
            .then(users => users[0])
            .catch(err => reject({
                message: "Error finding user.",
                details: err.message,
                code: 500,
            }));
        
            if(!user) return reject({
                message: "User not found.",
                code: 404
            });

            return resolve(user);
        }
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

        var user = await this.find(params.find).catch(err => reject(err));
        
        if (!user) {
            return reject({
                message: "User not found.",
                code: 404 });

        } else {
            if (params.with.password) {
                let invPwd = validator.match(params.with.password)
                if (invPwd == null) user.password = params.with.password != undefined ? params.with.password.first : user.password;
                else return reject(invPwd);
            }

            if (params.with.auth != undefined) {
                if (params.with.auth.enabled && !user.auth.enabled) {
                    user.auth.secret = await axios.get(`${process.env.AUTH_BASE_URL}/auth/generate/secret/base32/20`)['secret'];
                    user.auth.enabled = true;
                }
                else {
                    user.auth.enabled = false;
                    user.auth.secret = null;
                }
            }

            user.steamid = params.with.steamid != undefined ? params.with.steamid : user.steamid;
            user.username = params.with.username != undefined ? params.with.username : user.username;
            user.email = params.with.email != undefined ? params.with.email : user.email;
    
            await user.save()
                .catch(err => reject({
                    message: "Error updating User",
                    details: err.message,
                    code: 500
                }));

            let returnedData = {
                _id: user._id,
                email: user.email,
                username: user.username,
                token: user.token,
                created_at: user.created_at,
                auth: {
                    enabled: user.auth.enabled
                }
            };

            console.log(returnedData);
            
            return resolve(returnedData);
        }
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
            message: "Operation not permitted.",
            details: "Cannot search User by password",
            code: 403
        });

        let user = await this.find(params).catch(err => reject(err));
        
        await validator.make(params).catch(err => reject(err));

        if (user)
            user.deleteOne()
                .then(res => resolve("User profile deleted :("))
                .catch(err => reject({
                    message: "Error removing User porfile. Maybe she doesn't want you to go...",
                    details: err.message,
                    code: 500
                }));
    });
}