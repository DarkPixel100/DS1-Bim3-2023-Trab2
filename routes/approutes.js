const express = require("express");
const router = express.Router();
var viewController = require("../controllers/viewcontroller");
var authController = require("../controllers/authcontroller");
var generalController = require("../controllers/generalcontroller");

router.get("/login", viewController.showLogin);
router.get("/cadastro", viewController.showCadastro);

router.post("/cadastro", authController.criarUsuario);
router.post("/login", authController.attemptLogin);
router.post("/logout", authController.logout);

router.get("/", viewController.showHome);
router.post("/", viewController.showHome);
router.get("/admin", viewController.showAdmin);
router.post("/admin", viewController.showAdmin);

router.post("/addLivro", generalController.addLivro);
router.post("/alugarLivro", generalController.alugarLivro);
router.post("/devolverLivro", generalController.devolverLivro);

router.post("/deletarLivro", generalController.deletarLivro);
router.post("/deletarUser", generalController.deletarUser);

module.exports = router;
