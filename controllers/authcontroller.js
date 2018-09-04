var models= require("../models");
var user = models.user;
var plan = models.Plans;
var exports = (module.exports = {});
exports.dashboard = function(req, res) {
  res.render("dashboard");
};
exports.signin = function(req, res) {
  res.render("signin");
};
exports.signup = function(req, res) {
  res.render("signup");
};
exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      throw err;
    }
    res.redirect("/");
  });
};
exports.allPlans = function(req, res) {
  res.json();
};
exports.plan = function(req, res) {
  res.render("plan", {});
};
exports.newPlan = function(req, res) {
  res.render("newPlan");
};
exports.myID = function(req, res) {
  res.json({id:req.session.passport.user});
}
exports.postNewPlan = function(req, res) {
  //takes a json object with keys title,heads,rentPerHead,startingWeight,costPerHundredLbs,acresPerHead,otherCostPerHead,interestRate,lbsPerDay,daysOnPasture,vetCostPerHead,transportPerHead,userID,futurePrice
  var newPlan=req.body;
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
