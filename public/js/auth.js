var uid = null;
$("document").ready(
  $.ajax({
    url: "myID",
    method: "GET"
  }).then(function(response) {
    $("#userID").text(response.id);
    uid = response.id;
  })
);
$("#createPlan").on("click", function() {
  //event.preventDefault();
  //takes a json object with keys title,heads,rentPerHead,startingWeight,costPerHundredLbs,acresPerHead,otherCostPerHead,interestRate,lbsPerDay,daysOnPasture,vetCostPerHead,transportPerHead,userID,futurePrice
  console.log("auth.js - createPlan on submit click");
  var newPlan = {
    title: $("#name")
      .val()
      .trim(),
    heads: $("#heads")
      .val()
      .trim(),
    rentPerHead: $("#rentPerHead")
      .val()
      .trim(),
    startingWeight: $("#startingWeight")
      .val()
      .trim(),
    costPerHundredLbs: $("#costPer100")
      .val()
      .trim(),
    acresPerHead: $("#acresPerHead")
      .val()
      .trim(),
    otherCostPerHead: $("#otherPerHead")
      .val()
      .trim(),
    interestRate: $("#interestRate")
      .val()
      .trim(),
    lbsPerDay: $("#weightPerDay")
      .val()
      .trim(),
    daysOnPasture: $("#daysOnPasture")
      .val()
      .trim(),
    vetCostPerHead: $("#vetPerHead")
      .val()
      .trim(),
    transportPerHead: $("#transitPerHead")
      .val()
      .trim(),
    futurePrice: $("#futurePrice")
      .val()
      .trim(),
    userID: uid
  };
  console.log("auth.js - newPlan = " + newPlan);

  $.ajax({
    url: "newPlan",
    method: "POST",
    data: newPlan
  }).then(function(response) {
    console.log("auth.js - response = " + response);
    console.log("auth.js - newPlan = " + newPlan);
    response.render("dashboard", uid);
  });
});
