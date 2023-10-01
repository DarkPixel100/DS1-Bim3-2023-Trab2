const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewcontroller");
const authController = require("../controllers/authcontroller");
const generalController = require("../controllers/generalcontroller");
const { body } = require("express-validator");

router.get("/login", viewController.showLogin);
router.get("/cadastro", viewController.showCadastro);

router.post(
  "/cadastro",
  [
    body("nome").isString().notEmpty(),
    body("email").isEmail(),
    body("password")
      .isLength({ min: 8 }) // Minimum length of 8 characters
      .matches(/[A-Z]/),
  ],
  authController.criarUsuario
);
router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  authController.attemptLogin
);
router.get("/logout", authController.logout);

router.get("/", viewController.showHome);
router.post("/", viewController.showHome);
router.get("/admin", viewController.showAdmin);
router.post("/admin", viewController.showAdmin);

router.post(
  "/addLivro",
  [
    body("titulo").isString().notEmpty(),
    body("autores").isString().notEmpty(),
    body("ano").isInt().notEmpty(),
    body("editora").isString().notEmpty(),
    body("quantidade").isInt().notEmpty(),
  ],
  generalController.addLivro
);
router.post("/alugarLivro", generalController.alugarLivro);
router.post("/devolverLivro", generalController.devolverLivro);

router.post("/deletarLivro", generalController.deletarLivro);
router.post("/deletarUser", generalController.deletarUser);

module.exports = router;
