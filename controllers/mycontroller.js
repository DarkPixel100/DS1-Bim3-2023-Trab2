const { render } = require("express/lib/response");
const { sequelize, Sequelize } = require("../config/database");
const Op = Sequelize.Op;

const usuarioModel = require("../models/usuarios.js")(sequelize, Sequelize);
const livroModel = require("../models/livros.js")(sequelize, Sequelize);

exports.showCadastro = (req, res) => {
  res.render("cadastro", { layout: false });
};

exports.criarUsuario = async (req, res) => {
  const userInfo = {
    nome: req.body.nome,
    email: req.body.email,
    password: req.body.email,
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

exports.attemptLogin = (req, res, next) => {
  formData = {
    email: req.body.email,
    password: req.body.password,
  };
  usuarioModel
    .findOne({ where: { email: formData.email } })
    .then(async function (user) {
      const senhaValida = await user.validarSenha(formData.password);
      if (!user) {
        res.redirect("/login");
      } else if (!senhaValida) {
        console.log("Senha incorreta!");
        res.redirect("/login");
        next();
      } else {
        req.session.user = user.dataValues;
        req.session.save();
        res.redirect("/");
        next();
      }
    });
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) res.status(400).send("Falha no logout");
      else {
        console.log("Logout realizado com sucesso");
        res.redirect("/");
      }
    });
  } else res.end();
};

exports.showHome = (req, res) => {
  // console.log(req.session);
  res.render("home", { layout: false });
};

exports.alugar = (req, res) => {
  // livroModel.update();
};
