var models = require("../models");
// var user = models.user;
var plan = models.Plans;
var exports = (module.exports = {});
exports.dashboard = function(req, res) {
  // console.log("authcontroller - exports.dashboard - res = " + json(res));
  console.log("authcontroller - exports.dashboard");
  res.render("dashboard");
};
exports.signin = function(req, res) {
  console.log("authcontroller - exports.signin");
  res.render("signin");
};
exports.signup = function(req, res) {
  console.log("authcontroller - exports.signup");
  res.render("signup");
};
exports.logout = function(req, res) {
  console.log("authcontroller - exports.signout");
  req.session.destroy(function(err) {
    if (err) {
      throw err;
    }
    res.redirect("/");
  });
};

exports.allPlans = function(req, res) {
  console.log("authcontroller - exports.allPlans");
  // $.get("/api/plans" + myID, function(data) {
  //   thePlans = data;
  //   initializePlanRows();
  // });

  res.json();
};
exports.plan = function(req, res) {
  console.log("authcontroller - exports.plan");
  res.render("plan", plan);
};
exports.newPlan = function(req, res) {
  console.log("authcontroller - exports.newPlan");
  res.render("newPlan");
};
exports.myID = function(req, res) {
  console.log("authcontroller - exports.myID");
  res.json({ id: req.session.passport.user });
};
exports.postNewPlan = function(req, res) {
  //takes a json object with keys title,heads,rentPerHead,startingWeight,costPerHundredLbs,acresPerHead,otherCostPerHead,interestRate,lbsPerDay,daysOnPasture,vetCostPerHead,transportPerHead,userID,futurePrice
  console.log("authcontroller - exports.postNewPlan");
  var newPlan = req.body;
  plan.create({
    planTitle:newPlan.title,
    numHeadsPurchased:newPlan.heads,
    aveStartingWeight:newPlan.startingWeight,
    costPerHeadPer100Pounds:newPlan.costPerHundredLbs,
    isManualCPHP100:true,
    pastureAcresPerHead:newPlan.acresPerHead,
    pastureRentPerHead:newPlan.rentPerHead,
    vetCostPerHead:newPlan.vetCostPerHead,
    truckTripPerHead:newPlan.transportPerHead,
    interestRate:newPlan.interestRate,
    weightGainPerDay:newPlan.lbsPerDay,
    numDaysOnPasture:newPlan.daysOnPasture,
    pricePerHeadPer100Pounds:newPlan.futurePrice,
    userId:newPlan.userID
  })
  res.send("/dashboard");
}
