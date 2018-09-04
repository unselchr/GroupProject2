// ************************************************************
// Dependencies
// ************************************************************
var models = require("../models");
// var user = models.user;
var plan = models.Plans;
// var express = require("express");

// ************************************************************
// Import the model (plan.js) to use its database functions.
// ************************************************************
// var plan = require("../models/plan.js");

// var router = express.Router();

// ************************************************************
// Create all our routes and set up logic within those routes
// where required.
// ************************************************************
exports.showPlan = function(req, res) {
  console.log("plansController.js - export.showPlan");
  // console.log("plansController - res = " + JSON.stringify(req));
  plan.findAll({ where: { userID: req.session.passport.user } }, function(
    data
  ) {
    // var hbsObject = {
    //   plans: data
    // };
    console.log("plansController - findAll - data = " + data);
    res.render("dashboard", data);
    // });
  });
};

// router.get("/api/plans/:id", function(req, res) {
//   // var condition = "id = " + req.params.id;
//   console.log("plansController.js - router.get");
//   plan.selectAll({ where: { id: req.params.id } }, function(data) {
//     var hbsObject = {
//       plans: data
//     };
//     res.render("dashboard", hbsObject);
//   });
// });

// // ************************************************************
// // Add new plan to the db.
// // ************************************************************
// router.post("/api/plans", function(req, res) {
//   plan.insertOne(
//     ["plan_name", "devoured"],
//     [req.body.plan_name, req.body.devoured],
//     function(result) {
//       // Send back the ID of the new plan
//       res.json({ id: result.insertId });
//     }
//   );
// });

// // ************************************************************
// // Devour the plan (set devoured to true)
// // ************************************************************
// router.put("/api/plans/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   plan.updateOne({ devoured: req.body.devoured }, condition, function(
//     result
//   ) {
//     if (result.changedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// ************************************************************
// Export routes for server.js to use.
// ************************************************************
// module.exports = router;
