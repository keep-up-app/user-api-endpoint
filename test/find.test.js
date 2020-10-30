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

    it('get user with valid _id', done => {
        request(server).get(`/user/find?_id=${validId}`)
            .expect(200)
            .expect(profile, done());
    });

    it.skip('get user with invalid _id', done => {
        chai.request(server).get(`/user/find?_id=${invalidId}`)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.equal("Invalid Uuid");
            done();
        });
    });
});