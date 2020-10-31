/**
 * Loading test dependencies
 */

const request = require('supertest')
const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


/**
 * Short hands for chai functions
 */

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();


/**
 * Standard JSON reponse for User model
 */

const profile = require("./json/profile.json");


/**
 * GET/ request tests to create user
 */

describe('GET/ create', function() {

    let validEmail = "example@email.com";
    let invalidEmail = "invalid_email.com";

    let validPassword = "password1234";
    let invalidPassword = "1234";

    it('create user with VALID email, password', done => {
        request(server).post("/user/create", {
            email: validEmail,
            password: {
                first: validPassword,
                second: validPassword
        }})
        .end((err, res) => {
            expect(res.statusCode).to.equal(234);
            expect(res.body.email).to.equal(profile.email);
            done();
        });
    });

    it('create user with INVALID email', done => {
        request(server).post("/user/create", {
            email: invalidEmail,
            password: {
                first: validPassword,
                second: validPassword
        }})
            .expect(400)
            .expect(profile, done());
    });

    it('create user with NOT MATCHING passwords', done => {
        request(server).post("/user/create", {
            email: validEmail,
            password: {
                first: validPassword,
                second: invalidPassword
        }})
            .expect(454)
            .expect(profile, done());
    });
});