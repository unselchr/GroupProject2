var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/users", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    console.log("in beforeEach");
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all users", function(done) {
    // Add some examples to the db to test with
    db.user
      .bulkCreate([
        {
          firstname: "Fred",
          lastname: "Flinstone",
          username: "Fstone",
          about: "about",
          email: "fredf@somewhere.com",
          password: "flint",
          lastLogin: "2018-08-29T09:05:02.000Z",
          createdAt: "2018-08-29T09:05:02.000Z",
          updatedAt: "2018-08-29T09:05:02.000Z"
        },
        {
          firstname: "George",
          lastname: "Jetson",
          username: "GJet",
          about: "about",
          email: "george@future.com",
          password: "Jet",
          lastLogin: "2018-08-29T09:05:02.000Z",
          createdAt: "2018-08-29T09:05:02.000Z",
          updatedAt: "2018-08-29T09:05:02.000Z"
        }
      ])
      .then(function() {
        // Request the route that returns all examples
        request.get("/api/users").end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;

          // Run assertions on the response

          expect(err).to.be.null;

          expect(responseStatus).to.equal(200);

          // expect(responseBody)
          //   .to.be.an("array")
          //   .that.has.lengthOf(2);

          expect(responseBody[0])
            .to.be.an("object")
            .that.includes({
              firstname: "Fred",
              lastname: "Flinstone",
              username: "Fstone",
              about: "about",
              email: "fredf@somewhere.com",
              password: "flint"
            });

          expect(responseBody[1])
            .to.be.an("object")
            .that.includes({
              firstname: "George",
              lastname: "Jetson",
              username: "GJet",
              about: "about",
              email: "george@future.com",
              password: "Jet"
            });

          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
  });
});
