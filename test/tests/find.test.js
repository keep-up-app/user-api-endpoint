/**
 * Loading test dependencies
 */

const parser = require('body-parser');
const request = require('supertest');
const server = require('./../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const JsonUserProfile = require('./../json/profile.json');


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
    let unknownEmail = "unknown@email.com";

    let validPassword = JsonUserProfile.password;
    let invalidPassword = '123';

    it('find user with VALID email, password', done => {
        request(server).post('/user/find')
            .send({
                email: validEmail,
                password: validPassword
            }).end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.email).to.equal(JsonUserProfile.email);
                done();
            });
    });

    it('find user with INVALID password', done => {
        request(server).post('/user/find')
            .send({
                email: validEmail,
                password: invalidPassword
            }).end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.error).to.equal("Password too short.");
                done();
            });
    });

    it('find user with UNKNOWN email', done => {
        request(server).post('/user/find')
            .send({
                email: unknownEmail,
                password: validPassword
            }).end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });
});