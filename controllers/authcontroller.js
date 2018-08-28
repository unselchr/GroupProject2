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
    res.redirect("/index");
  });
};
