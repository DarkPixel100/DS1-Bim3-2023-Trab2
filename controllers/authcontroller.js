const { render } = require("express/lib/response");
const { sequelize, Sequelize } = require("../config/database");

const usuarioModel = require("../models/usuarios.js")(sequelize, Sequelize);

exports.criarUsuario = async (req, res) => {
  const userInfo = {
    nome: req.body.nome,
    email: req.body.email,
    password: req.body.password,
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

exports.attemptLogin = (req, res, next) => {
  formData = {
    email: req.body.email,
    password: req.body.password,
  };
  usuarioModel
    .findOne({ where: { email: formData.email } })
    .then(async function (user) {
      if (!user) {
        console.log("Email incorreto!");
        res.redirect("/login");
      } else if (!(await user.validarSenha(formData.password))) {
        console.log("Senha incorreta!");
        res.redirect("/login");
        next();
      } else {
        req.session.user = user;
        console.log("Login realizado com sucesso!");
        req.session.success =
          "Authenticated as " +
          user.name +
          ' click to <a href="/logout">logout</a>. ';
        res.redirect("/");
        next();
      }
    });
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) res.status(400).send("Falha no logout!");
      else {
        console.log("Logout realizado com sucesso!");
        res.redirect("/");
      }
    });
  } else res.end();
};
