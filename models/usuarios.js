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
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("password", bcrypt.hash(value, 10));
        },
      },
    },
    { timestamps: false },
    { freezeTableName: true }
  );
  usuarios.prototype.validarSenha = function (password) {
    return bcrypt.compare(password, this.password);
  };

  return usuarios;
};
