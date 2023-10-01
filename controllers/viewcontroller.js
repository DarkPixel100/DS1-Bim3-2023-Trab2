const { sequelize, Sequelize } = require("../config/database");

const usuarioModel = require("../config/associations").usuario;
const livroModel = require("../config/associations").livro;
const adminModel = require("../config/associations").admin;
const emprestimoModel = require("../config/associations").emprestimo;
const Op = Sequelize.Op;

const searchResults = async (req, res) => {
  let isAdmin = false;
  if (
    await adminModel.findOne({
      where: { usuarioId: req.session.user.id },
    })
  )
    isAdmin = true;
  const searchQuery = req.body.searchQuery ? req.body.searchQuery : "";
  const searchLivros = await livroModel.findAndCountAll({
    where: {
      [Op.or]: [
        {
          titulo: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
        { ano: searchQuery },
      ],
    },
  });
  return {
    admin: isAdmin,
    searchLivros: searchLivros,
  };
};

exports.showCadastro = (req, res) => {
  res.render("cadastro", {
    layout: false,
    reqFlash: {
      errAuth: req.flash("regError"),
    },
  });
};

exports.showLogin = (req, res) => {
  res.render("login", {
    layout: false,
    reqFlash: {
      noAuth: req.flash("authNecessary"),
      errAuth: req.flash("loginError"),
    },
  });
};

exports.showHome = async (req, res) => {
  if (req.session && req.session.user) {
    const emprestimos = await emprestimoModel.findAll({
      where: { usuarioId: req.session.user.id },
    });
    let livrosIDlist = [];
    emprestimos.forEach((emprestimo) => {
      livrosIDlist.push(emprestimo.livroId);
    });

    let livrosResult = { rows: [], count: 0 };
    for (let livroID of livrosIDlist) {
      livrosResult.rows.push(
        await livroModel.findOne({ where: { id: livroID } })
      );
      livrosResult.count++;
    }
    results = await searchResults(req, res);
    res.render("home", {
      layout: false,
      user: req.session.user,
      meusLivros: livrosResult,
      admin: results.admin,
      searchLivros: results.searchLivros,
    });
  } else {
    req.flash(
      "authNecessary",
      "Você precisa fazer login para acessar essa página!"
    );
    res.redirect("/login");
  }
};

exports.showAdmin = async (req, res) => {
  results = await searchResults(req, res);
  if (req.session && req.session.user && results.admin) {
    const users = await usuarioModel.findAll();

    res.render("admin", {
      layout: false,
      user: req.session.user,
      admin: results.admin,
      searchLivros: results.searchLivros,
      usuarios: users,
    });
  } else if (!req.session.user) {
    req.flash(
      "authNecessary",
      "Você precisa fazer login para acessar essa página!"
    );
    res.redirect("/login");
  } else {
    req.flash(
      "authForbidden",
      "Você não tem permissão para acessar essa página!"
    );
    res.send(403, req.flash("authForbidden"));
  }
};
