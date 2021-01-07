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



describe('GET/ destroy', function() {

    let validEmail = JsonUserProfile.email;
    let unknownEmail = "unknown@email.com";
    let validPassword = JsonUserProfile.password;

    it('delete user with VALID email', done => {
        request(server).delete('/user/destroy')
            .set('Authorization', JsonUserProfile.token)
            .send({
                email: validEmail
            }).end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.success).to.equal("User profile deleted :(");
                done(); 
            });
    });

    it('delete user with UNKNOWN email', done => {
        request(server).delete('/user/destroy')
            .set('Authorization', JsonUserProfile.token)
            .send({
                email: unknownEmail
            }).end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    it('delete user with INVALID OPERATION', done => {
        request(server).delete('/user/destroy')
            .set('Authorization', JsonUserProfile.token)
            .send({
                password: validPassword
            }).end((err, res) => {
                expect(res.statusCode).to.equal(403);
                done();
            });
    });
});