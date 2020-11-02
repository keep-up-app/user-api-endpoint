/**
 * Loading test dependencies
 */

const parser = require('body-parser');
const request = require('supertest');
const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const JsonUserProfile = require('./json/profile.json');


/**
 * Apply deps.
 */

chai.use(chaiHttp);
server.use(parser.json());


/**
 * Short hands for chai functions
 */

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();



describe('GET/ find', function() {

    let validEmail = JsonUserProfile.email;
    let invalidEmail = "this_is_an_invalid_email";
    let unknownEmail = "unknown@email.com";

    it('find user with VALID _id', done => {
        request(server).get(`/user/find?email=${validEmail}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.email).to.equal(JsonUserProfile.email);
                done();
            });
    });

    it('find user with INVALID _id', done => {
        request(server).get(`/user/find?email=${invalidEmail}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.error).to.equal("Invalid Email.");
                done();
            });
    });

    it('find user with UNKNOWN _id', done => {
        request(server).get(`/user/find?email=${unknownEmail}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });
});