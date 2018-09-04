var db = require("../modules");

var plans = {
  selectAll: function(cb) {
    db.Plans.selectAll("plans", condition, function(res) {
      console.log("plansCode.js - selectAll");
      cb(res);
    });
  }
  // insertOne: function(objColVals, condition, cb) {
  //   db.Plans.insertOne("plans", objColVals, condition, function(res) {
  //     cb(res);
  //   });
  // },
  // updateOne: function(objColVals, condition, cb) {
  //   db.Plans.updateOne("plans", objColVals, condition, function(res) {
  //     cb(res);
  //   });
};
// };

// ************************************************************
// Export the database functions for the controller
// (plansController.js).
// ************************************************************
module.exports = plans;
