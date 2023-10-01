const emprestimoModel = require("../config/associations").emprestimo;

const helpers = {
  ifAlugavel: (arr, id, qtde, options) => {
    let result = true;
    if (qtde > 0) {
      arr.forEach((livro) => {
        console.log(livro.dataValues.id == id);
        if (livro.dataValues.id == id) result = false;
      });
      if (result) return options.fn(this);
      else return options.inverse(this);
    }
  },
};

module.exports = helpers;
