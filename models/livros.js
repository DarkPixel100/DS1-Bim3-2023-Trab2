const { sequelize } = require("../config/database");

module.exports = (sequelize, DataTypes) => {
  var livros = sequelize.define(
    "livro",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      autores: {
        type: DataTypes.STRING(1234),
      },
      titulo: {
        type: DataTypes.STRING,
      },
      ano: {
        type: DataTypes.INTEGER,
      },
      editora: {
        type: DataTypes.STRING,
      },
      quantidade: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
  
  return livros;
};
