exports.showCadastro = (req, res) => {
  res.render("cadastro", {
    layout: false,
    reqFlash: { errAuth: req.flash("regError") },
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

exports.showHome = (req, res) => {
  if (req.session && req.session.user) res.render("home", { layout: false });
  else {
    req.flash(
      "authNecessary",
      "Você precisa fazer login para acessar essa página!"
    );
    res.redirect("/login");
  }
};
