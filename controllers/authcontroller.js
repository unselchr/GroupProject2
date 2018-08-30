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
  res.render("dashboard", {});
};
exports.plan = function(req, res) {
  res.render("plan", {});
};
exports.newPlan = function(req, res) {
  res.render("/newPlan");
};
