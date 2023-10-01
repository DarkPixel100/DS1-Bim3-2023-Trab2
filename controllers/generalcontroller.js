const { sequelize, Sequelize } = require("../config/database");

const usuarioModel = require("../config/associations").usuario;
const emprestimoModel = require("../config/associations").emprestimo;
const livroModel = require("../config/associations").livro;

exports.addLivro = (req, res) => {
  const livro = req.body;
  livroModel
    .create(livro)
    .then((data) => {
      req.flash("dataRegister", "Data saved:" + data);
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("addError", err);
      res.send(req.flash("addError"));
    });
};

exports.alugarLivro = async (req, res) => {
  const emprestimo = {
    usuarioId: req.session.user.id,
    livroId: parseInt(req.body.livroID),
  };

  const qtde = (await livroModel.findOne({ where: { id: emprestimo.livroId } }))
    .quantidade;

  if (qtde == 0) {
    req.flash(
      "lendError",
      "Esse livro não pode ser emprestado (quantidade insuficiente)."
    );
    res.send(req.flash("lendError"));
  } else if (
    await emprestimoModel.findOne({
      where: { usuarioId: emprestimo.usuarioId, livroId: emprestimo.livroId },
    })
  ) {
    req.flash(
      "lendError",
      "Esse livro não pode ser emprestado (você já possui esse livro)."
    );
    res.send(req.flash("lendError"));
  } else
    emprestimoModel
      .create(emprestimo)
      .then((data) => {
        livroModel.update(
          { quantidade: qtde - 1 },
          { where: { id: emprestimo.livroId } }
        );
        req.flash("dataRegister", "Data saved:" + data);
        res.redirect("/");
      })
      .catch((err) => {
        req.flash("addError", err);
        res.send(req.flash("addError"));
      });
};

exports.devolverLivro = async (req, res) => {
  const emprestimo = {
    usuarioId: req.session.user.id,
    livroId: req.body.livroID,
  };

  emprestimoModel
    .destroy({ where: { livroId: emprestimo.livroId } })
    .then(async (data) => {
      const qtde = (
        await livroModel.findOne({ where: { id: emprestimo.livroId } })
      ).quantidade;
      livroModel.update(
        { quantidade: qtde + 1 },
        { where: { id: emprestimo.livroId } }
      );
      req.flash("dataRegister", "Data deleted:" + data);
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("addError", err);
      res.send(req.flash("addError"));
    });
};

exports.deletarLivro = (req, res) => {
  livroModel
    .destroy({ where: { id: req.body.livroID } })
    .then((data) => {
      req.flash("dataRegister", "Data deleted:" + data);
      res.redirect("/admin");
    })
    .catch((err) => {
      req.flash("addError", err);
      res.send(req.flash("addError"));
    });
};

exports.deletarUser = (req, res) => {
  usuarioModel
    .destroy({ where: { id: req.body.usuarioId } })
    .then((data) => {
      req.flash("dataRegister", "Data deleted:" + data);
      res.redirect("/admin");
    })
    .catch((err) => {
      req.flash("addError", err);
      res.send(req.flash("addError"));
    });
};
