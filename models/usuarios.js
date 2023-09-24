const { sequelize } = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  var usuarios = sequelize.define(
    "usuario",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false },
    {
      freezeTableName: true,
      instanceMethods: {
        generateHash(password) {
          return bcrypt.hash(password, bcrypt.genSaltSync(10));
        },
        validPassword(password) {
          return bcrypt.compare(password, this.password);
        },
      },
    }
  );

  return usuarios;
};
