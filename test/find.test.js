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
 * GET/ request tests to find user
 */

describe('GET/ find', function() {

    let validId = profile._id;
    let invalidId = "this_is_an_invalid_id";
    let unknownId = "12713a26-94c4-40d5-ad4e-014f8b22a060";

    it('find user with VALID _id', done => {
        request(server).get(`/user/find?_id=${validId}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.email).to.equal(profile.email);
                done();
            });
    });

    it('find user with INVALID _id', done => {
        request(server).get(`/user/find?_id=${invalidId}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.equal({ error: "Invalid UUID." });
                done();
            });
    });

    it('find user with UNKNOWN _id', done => {
        request(server).get(`/user/find?_id=${unknownId}`)
        .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            done();
        });
    });
});