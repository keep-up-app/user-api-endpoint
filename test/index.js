/**
 * Loading test dependencies
 */

const parser = require('body-parser');
const request = require('supertest');
const server = require('../server');
const JsonUserProfile = require('./json/profile.json');

server.use(parser.json());


/**
 * Specify which tests run first
 */

init([
    'server',
    'create',
    'find',
    'update',
    'delete'
]);


/**
 * Helper function to cycle through specified tests in array in order
 * 
 * @param {Array} tests 
 */

async function init(tests) {
    
    await removeEmail(JsonUserProfile);
    
    for (test in tests) require(`./tests/${tests[test]}.test`);

    await removeEmail(JsonUserProfile);
}


/**
 * Remove Helper function by email
 * @param {Object} json
 */

async function removeEmail(json) {
    request(server).delete("/user/destroy", { email: JsonUserProfile.email })
        .set('Authorization', JsonUserProfile.token)
}