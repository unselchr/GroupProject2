var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/plans", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    console.log("in beforeEach");
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all plans", function(done) {
    // Add some examples to the db to test with
    db.plan
      .bulkCreate([
        {
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
        },
        {
          planTitle: "Test Plan 2",
          numHeadsPurchased: 20,
          aveStartingWeight: 400,
          costPerHeadPer100Pounds: 40.5,
          isManualCPHP100: true,
          pastureAcresPerHead: 4,
          pastureRentPerHead: 20.25,
          vetCostPerHead: 50.0,
          truckTripPerHead: 2.0,
          interestRate: 10.0,
          weightGainPerDay: 40.0,
          numDaysOnPasture: 60,
          pricePerHeadPer100Pounds: 100.5
          // userId: 1
        }
      ])
      .then(function() {
        // Request the route that returns all examples
        request.get("/api/plans").end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;

          // Run assertions on the response

          expect(err).to.be.null;

          expect(responseStatus).to.equal(200);

          expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(2);

          expect(responseBody[0])
            .to.be.an("object")
            .that.includes({
              planTitle: "Test Plan 1",
              numHeadsPurchased: 10,
              aveStartingWeight: 200,
              costPerHeadPer100Pounds: "20.50",
              isManualCPHP100: true,
              pastureAcresPerHead: 2,
              pastureRentPerHead: "10.25",
              vetCostPerHead: "25.00",
              truckTripPerHead: "1.00",
              interestRate: "5.00",
              weightGainPerDay: "20.00",
              numDaysOnPasture: 30,
              pricePerHeadPer100Pounds: "50.50"
            });

          expect(responseBody[1])
            .to.be.an("object")
            .that.includes({
              planTitle: "Test Plan 2",
              numHeadsPurchased: 20,
              aveStartingWeight: 400,
              costPerHeadPer100Pounds: "40.50",
              isManualCPHP100: true,
              pastureAcresPerHead: 4,
              pastureRentPerHead: "20.25",
              vetCostPerHead: "50.00",
              truckTripPerHead: "2.00",
              interestRate: "10.00",
              weightGainPerDay: "40.00",
              numDaysOnPasture: 60,
              pricePerHeadPer100Pounds: "100.50"
            });
          console.log(
            "costPerHeadPer100Pounds = " +
              responseBody[0].costPerHeadPer100Pounds
          );
          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
  });
});
