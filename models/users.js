// ************************************************************
// Program: Stocker Calf Projection Tool
// Authors: Matt Schiereck
//          Chris Unsell
//          Randy Schwartz
//          Rod Skoglund
// File: user.js
// Description: This defines the Sequalized Model for the User
// ************************************************************

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    }
  });

  Users.associate = function(models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Plans
    Users.hasMany(models.Plans, {
      onDelete: "cascade"
    });
  };

  return Users;
};
