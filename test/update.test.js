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



describe('GET/ update', function() {

    let validEmail = JsonUserProfile.email;
    let validUsername = JsonUserProfile.username;
    let validPassword = JsonUserProfile.password;
    let validSteamId = JsonUserProfile.steamid;

    let invalidUsername = null;
    let invalidSteamId = "1234_and_some_text";

    it('update user with VALID username, password, steamid', done => {
        request(server).put('/user/update')
            .set('Authorization', JsonUserProfile.token)
            .send({
                find: {
                    email: validEmail
                },
                with: {
                    steamid: validSteamId,
                    username: validUsername,
                    password: {
                        first: validPassword,
                        second: validPassword
                    }
                }
            }).end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.steamid).to.equal(validSteamId);
                expect(res.body.username).to.equal(validUsername);
                expect(res.body.password).to.equal(undefined);
                done();
            });
    });

    it('update user with INVALID steamid', done => {
        request(server).put('/user/update')
            .set('Authorization', JsonUserProfile.token)
            .send({
                find: {
                    email: validEmail
                },
                with: {
                    steamid: invalidSteamId,
                }
            }).end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.error).to.equal("Invalid SteamID.");
                done();
            });
    });

    it('update user with INVALID username', done => {
        request(server).put('/user/update')
            .set('Authorization', JsonUserProfile.token)
            .send({
                find: {
                    username: invalidUsername
                },
                with: {
                    steamid: validSteamId
                },
            }).end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.error).to.equal("Missing Username.");
                done();
            });
    });
});