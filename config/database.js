const Sequelize = require("sequelize");

sequelize = new Sequelize("biblioteca", "root", "", {
  host: "localhost",
  password: "mysqluser",
  dialect: "mysql",
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};