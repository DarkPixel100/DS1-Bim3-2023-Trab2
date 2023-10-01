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
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
      },
    },
    { timestamps: true },
    { freezeTableName: true }
  );
  usuarios.prototype.validarSenha = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return usuarios;
};
