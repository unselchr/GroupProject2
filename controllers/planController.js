var models = require("../models");
// var user = models.user;
var plan = models.Plans;
var exports = (module.exports = {});
exports.allPlans = function(req, res) {
  plan
    .findAll({
      where: {
        userId: req.session.passport.user
      }
    })
    .then(function(data) {
      console.log("planController - findAll");
      // console.log("planController - findAll - data = " + res.json(data));
      // res.json(data);
      res.render("dashboard", { data: data });
    });
};
exports.onePlan = function(req, res) {
  plan
    .findAll({
      where: {
        id: req.params.planID.replace(/\D/g, ""),
        userId: req.session.passport.user
      }
    })
    .then(function(data) {
      //console.log("\n\n" + data + "\n\n");
      if (!(data === null || data === {} || data === [])) {
        res.render("plan", { data: data });
      } else {
        res.render("404");
      }
    });
};
