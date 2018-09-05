"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
// var env = "test";

//DEBUG CODE
console.log("index.js - process.env.NODE_ENV = " + process.env.NODE_ENV);
console.log("index.js - env = " + env);
// console.log(__filename);
// console.log(__dirname);
// console.log(process.cwd());
// console.log(process.cwd() + "\\config\\");
//END DEBUG CODE

var config = require(process.cwd() + "\\config\\config.json")[env];
var db = {};

//DEBUG CODE
console.log("index.js - config.use_env_variable = " + config.use_env_variable);
//END DEBUG CODE

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
  console.log("index.js - config.use_env_variable is true");
} else {
  console.log("index.js - config.use_env_variable is false");
  console.log("index.js - config.database = " + config.database);
  console.log("index.js - config.username = " + config.username);
  console.log("index.js - config.password = " + config.password);
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
