const { sequelize, Sequelize } = require("../config/database");

const usuarioModel = require("../models/usuarios.js")(sequelize, Sequelize);
const livroModel = require("../models/livros.js")(sequelize, Sequelize);
const adminModel = require("../models/admins.js")(sequelize, Sequelize);
const emprestimoModel = require("../models/emprestimos.js")(
  sequelize,
  Sequelize
);

usuarioModel.hasOne(adminModel, { onDelete: "CASCADE" });
adminModel.belongsTo(usuarioModel);

usuarioModel.hasOne(emprestimoModel, { onDelete: "CASCADE" });
emprestimoModel.belongsTo(usuarioModel);

livroModel.hasOne(emprestimoModel, { onDelete: "CASCADE" });
emprestimoModel.belongsTo(livroModel);

module.exports = {
  usuario: usuarioModel,
  livro: livroModel,
  admin: adminModel,
  emprestimo: emprestimoModel,
};
