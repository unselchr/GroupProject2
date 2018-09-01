var db = require("../models");
var authController = require("../controllers/authcontroller");
module.exports = function(app, passport) {
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  //signup stuff below
  app.get("/signup", authController.signup);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",

      failureRedirect: "/404"
    })
  );
  app.get("/logout", authController.logout);
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",

      failureRedirect: "/signin"
    })
  );
  app.get("/signin", authController.signin);
  //must be last
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
  // };

  // ************************************************************
  // Plans API routes
  // ************************************************************
  // Get all plans
  app.get("/api/plans", function(req, res) {
    db.plan.findAll({}).then(function(dbPlans) {
      res.json(dbPlans);
    });
  });

  // Create a new plan
  app.post("/api/plans", function(req, res) {
    db.plan.create(req.body).then(function(dbPlans) {
      res.json(dbPlans);
    });
  });

  // Delete an Plan by id
  app.delete("/api/plans/:id", function(req, res) {
    db.plan.destroy({ where: { id: req.params.id } }).then(function(dbPlans) {
      res.json(dbPlans);
    });
  });

  // ************************************************************
  // Users API routes
  // ************************************************************
  // Get all Users
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.user.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Delete an User by id
  app.delete("/api/users/:id", function(req, res) {
    db.user.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
};
