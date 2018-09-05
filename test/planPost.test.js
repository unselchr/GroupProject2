var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("POST /api/plans", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should save a Plan with a Title of Test Plan 1", function(done) {
    // Create an object to send to the endpoint
    var reqBody = {
      planTitle: "Test Plan 1",
      numHeadsPurchased: 10,
      aveStartingWeight: 200,
      costPerHeadPer100Pounds: 20.5,
      isManualCPHP100: true,
      pastureAcresPerHead: 2,
      pastureRentPerHead: 10.25,
      vetCostPerHead: 25.0,
      truckTripPerHead: 1.0,
      interestRate: 5.0,
      weightGainPerDay: 20.0,
      numDaysOnPasture: 30,
      pricePerHeadPer100Pounds: 50.5
      // userId: 1
    };

    // POST the request body to the server
    request
      .post("/api/plans")
      .send(reqBody)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes(reqBody);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});
