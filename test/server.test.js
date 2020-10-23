/**
 * Loading test dependencies
 */

const request = require('supertest')
const server = require('../server');


/**
 * Simple call to server
 */

describe('User API response', function() {
    it('checking server response', function(callback) {
        request(server).get('/')
            .expect(200)
            .expect({ message: "USER API Endpoint" }, callback);
    });
});