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



describe('GET/ create', function() {

    let validEmail = JsonUserProfile.email;

    let validPassword = "password1234";
    let invalidPassword = "123432523432";

    it('create user with VALID email, password', done => {
        request(server).post("/user/create")
        .send({
            email: validEmail,
            password: {
                first: validPassword,
                second: validPassword
        }}).end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.email).to.equal(JsonUserProfile.email);
            done();
        });
    });

    it('create user with INVALID password', done => {
        request(server).post("/user/create")
        .send({
            email: validEmail,
            password: {
                first: invalidPassword,
                second: invalidPassword
        }}).end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equal("Password must be alphanumerical.");
            done();
        });
    });

    it('create user with NOT MATCHING passwords', done => {
        request(server).post("/user/create")
        .send({
            email: validEmail,
            password: {
                first: validPassword,
                second: invalidPassword
        }}).end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equal("Password does not match.");
            done();
        });
    });
});