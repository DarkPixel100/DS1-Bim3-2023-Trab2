const { render } = require("express/lib/response");
const { sequelize, Sequelize } = require("../config/database");

exports.showCadastro = (req, res) => {
  res.render("cadastro", { layout: false });
};

exports.showLogin = (req, res) => {
  res.render("login", { layout: false });
};

exports.showHome = (req, res) => {
  if (req.session && req.session.user) res.render("home", { layout: false });
  else res.redirect("/login");
};
