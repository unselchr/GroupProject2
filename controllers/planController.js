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
        //console.log(data[0].id);
        res.render("plan", { data: data[0] });
      } else {
        res.render("404");
      }
    });
};

exports.deletePlan = function(req, res) {
  plan
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function() {
      console.log("planController.js - export.deletePlan");
      // res.json(dbPlan);
      res.redirect("/appPlans");
      // res.render("dashboard")
    });
};

exports.jsonPlan = function(req, res) {
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
        //console.log(data[0].id);
        res.json(data);
      } else {
        res.send("404");
      }
    });
};
