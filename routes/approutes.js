const express = require("express")
const router = express.Router()
var myController = require("../controllers/mycontroller")


router.get("/", myController.showHome);
router.post("/", myController.alugar);

router.get("/cadastro", myController.showCadastro);
// router.post("/cadastro", myController.criarUsuario);
// router.get("/login", myController.showLogin);
// router.post("/login", myController.showLogin);

module.exports = router