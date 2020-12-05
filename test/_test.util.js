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

function init(tests) {

    describe('TEST ENV INITIALIZATION', () => {
        it('', done => {
            request(server).delete("/user/destroy", { email: JsonUserProfile.email })
            .end((err, res) => { done(); }); }); });

    for(test in tests)
        require(`./${tests[test]}.test`);
}