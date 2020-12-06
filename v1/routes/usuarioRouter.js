var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');

function pegarToken(req, res, next) {
  var header = req.headers['authorization'];
  if (typeof header !== 'undefined') {
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.post('/cadastrar', pegarToken, function (req, res) {
  var token = req.token;
  var dados = req.body;  
  usuarioController.novoUsuario(token, dados, function (resp) {
    res.json(resp);
  });
});

router.post('/login', function (req, res) {
  var nome = req.body.nome;
  var senha = req.body.senha;
  usuarioController.login(nome, senha, function (resp) {
    res.json(resp);
  });
});

router.get('/listar/:id', function (req, res) {
  var id = req.params.id;
  usuarioController.dadosUsuario(id, function (resp) {
    res.json(resp);
  });
});

module.exports = router;