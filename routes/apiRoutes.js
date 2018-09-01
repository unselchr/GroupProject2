//var db = require("../models");
var authController = require("../controllers/authcontroller");
module.exports = function(app, passport) {
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  //signup stuff below
  app.get("/signup", authController.signup);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureFlash:true,
      failureRedirect: "/signup"
    })
  );
  app.get("/logout", authController.logout);
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureFlash:true,
      failureRedirect: "/signin"
    })
  );
  app.get("/signin", authController.signin);
  app.get("/allPlans", isLoggedIn, authController.allPlans); //gets all plans by a users id and sends it as json
  app.get("/plan:planID", isLoggedIn, authController.plan); //gets plan by id and sends it as json
  app.get("/newPlan", isLoggedIn, authController.newPlan); //renders new plan page
  app.get("/myID",isLoggedIn,authController.myID);
  app.post("/newPlan",isLoggedIn,authController.postNewPlan);
  //must be last
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }

};
