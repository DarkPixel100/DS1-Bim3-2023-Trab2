const { render } = require("express/lib/response");
const { sequelize, Sequelize } = require("../config/database");
const Op = Sequelize.Op;

const bcrypt = require("bcrypt");

const usuarioModel = require("../models/usuarios.js")(sequelize, Sequelize);
const livroModel = require("../models/livros.js")(sequelize, Sequelize);

exports.showCadastro = (req, res) => {
  res.render("cadastro", { layout: false });
};

/*exports.criarUsuario = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const userInfo = {
    nome: req.body.nome,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
  };
  usuarioModel
    .create(userInfo)
    .then((data) => {
      console.log("Data saved");
      res.redirect("/login");
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};

exports.showLogin = (req, res) => {
  res.render("login", { layout: false });
};

exports.login = (req, res, next) => {
  User.findOne({ where: { username: username } }).then(async function (user) {
    if (!user) {
      res.redirect("/login");
    } else if (!(await user.validPassword(password))) {
      res.redirect("/login");
      next();
    } else {
      req.session.user = user.dataValues;
      res.redirect("/home");
      next();
    }
  });
};*/

exports.showHome = (req, res) => {
  res.render("home", { layout: false });
};

exports.alugar = (req, res) => {
  // livroModel.update();
};
