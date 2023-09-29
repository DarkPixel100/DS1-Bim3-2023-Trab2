const express = require("express");
const router = express.Router();
var viewController = require("../controllers/viewcontroller");
var authController = require("../controllers/authcontroller");

router.get("/", viewController.showHome);
router.get("/login", viewController.showLogin);
router.get("/cadastro", viewController.showCadastro);

// router.post("/", viewController.alugar);

router.post("/cadastro", authController.criarUsuario);
router.post("/login", authController.attemptLogin);
router.post("/logout", authController.logout);

module.exports = router;
