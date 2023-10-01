const { sequelize, Sequelize } = require("../config/database");

module.exports = (sequelize, DataTypes) => {
  var emprestimos = sequelize.define("emprestimo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return emprestimos;
};
