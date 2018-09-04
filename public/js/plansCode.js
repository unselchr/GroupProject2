// var db = require("../modules");

$("#delete-plan").on("click", function() {
  event.preventDefault();
  //takes a json object with keys title,heads,rentPerHead,startingWeight,costPerHundredLbs,acresPerHead,otherCostPerHead,interestRate,lbsPerDay,daysOnPasture,vetCostPerHead,transportPerHead,userID,futurePrice
  // };
  console.log("plansCode - delete-plan on click event handler");
  console.log("plansCode - delete-plan on click event handler id = " + thisID);
  var thisID = $(this).data("data-id");
  $.ajax({
    url: "dashboard",
    method: "DELETE",
    data: { id: thisID }
  }).then(function(response) {
    console.log("plansCode.js - Delete on click");
    console.log(response);
    window.location.href = response;
  });
});

// ***********************************************************
// var plans = {
//   selectAll: function(cb) {
//     db.Plans.selectAll("plans", condition, function(res) {
//       console.log("plansCode.js - selectAll");
//       cb(res);
//     });
//   }
//   // insertOne: function(objColVals, condition, cb) {
//   //   db.Plans.insertOne("plans", objColVals, condition, function(res) {
//   //     cb(res);
//   //   });
//   // },
//   // updateOne: function(objColVals, condition, cb) {
//   //   db.Plans.updateOne("plans", objColVals, condition, function(res) {
//   //     cb(res);
//   //   });
// };
// // };

// // ************************************************************
// // Export the database functions for the controller
// // (plansController.js).
// // ************************************************************
// module.exports = plans;
