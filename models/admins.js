const { sequelize, Sequelize } = require("../config/database");

module.exports = (sequelize, DataTypes) => {
  var admins = sequelize.define("admin", {}, { timestamps: false });
  
  return admins;
};
