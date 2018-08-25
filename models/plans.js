// ************************************************************
// Program: Stocker Calf Projection Tool
// Authors: Matt Schiereck
//          Chris Unsell
//          Randy Schwartz
//          Rod Skoglund
// File: plans.js
// Description: This defines the Sequalized Model for the
//              Plans
// ************************************************************

module.exports = function(sequelize, DataTypes) {
  var Plans = sequelize.define("Plans", {
    planTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    numHeadsPurchased: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { len: [1] }
    },
    aveStartingWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { len: [1] }
    },
    costPerHeadPer100Pounds: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { len: [1] }
    },
    isManualCPHP100: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    pastureAcresPerHead: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { len: [1] }
    },
    pastureRentPerHead: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { len: [1] }
    },
    vetCostPerHead: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { len: [1] }
    },
    truckTripPerHead: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { len: [1] }
    },
    interestRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { len: [1] }
    },
    weightGainPerDay: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { len: [1] }
    },
    numDaysOnPasture: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { len: [1] }
    },
    pricePerHeadPer100Pounds: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { len: [1] }
    }
  });

  Plans.associate = function(models) {
    // A Plan belonsg to an User in a one-to-many relationship.
    // A Plan can't be created without an User due to the
    // foreign key constraint.
    Plans.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Plans;
};
