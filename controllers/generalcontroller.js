const { render } = require("express/lib/response");
const { sequelize, Sequelize } = require("../config/database");

const livroModel = require("../models/livros.js")(sequelize, Sequelize);
const Op = Sequelize.Op;
