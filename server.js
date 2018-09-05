require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");
require("dotenv").load();

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
//passport
app.use(
  session({ secret: "cattleMath", resave: true, saveUninitialized: true })
); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    extname: ".handlebars"
  })
);
app.set("view engine", "handlebars");
var models = require("./models");
// Routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app);
//passport strats
require("./config/passport/passport")(passport, models.user);
//
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
//mysql://b91ddbd3dbcd14:4393ecdf@us-cdbr-iron-east-01.cleardb.net/heroku_5de9537cc37f621?reconnect=true

