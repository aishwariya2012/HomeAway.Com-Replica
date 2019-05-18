var assert = require("assert");
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3001");

it("should validate traveler with given credentials", function(done) {
    server
      .post("/Login")
      .send({"username": "q", " password": "q" })
      
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });