//var db = require("../models");
var authController = require("../controllers/authcontroller");
var plansController = require("../controllers/plansController");
module.exports = function(app, passport) {
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  //signup stuff below
  // app.get("/dashboard/:id");
  // app.get.findall({
  //   where: {
  //     id: "req.params.id"
  //   }
  // });

  app.get("/signup", authController.signup);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureFlash: true,
      failureRedirect: "/signup"
    })
  );
  app.get("/logout", authController.logout);
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureFlash: true,
      failureRedirect: "/signin"
    })
  );
  app.get("/signin", authController.signin);
  app.get("/allPlans", isLoggedIn, authController.allPlans); //gets all plans by a users id and sends it as json
  app.get("/plan:planID", isLoggedIn, plansController.showPlan); //gets plan by id and sends it as json
  app.get("/newPlan", isLoggedIn, authController.newPlan); //renders new plan page
  app.get("/myID", isLoggedIn, authController.myID);
  app.post("/newPlan", isLoggedIn, authController.dashboard);
  //must be last
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
