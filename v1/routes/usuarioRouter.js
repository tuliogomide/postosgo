const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');
var middlewares = require('../middlewares');

router.post('/cadastrar', middlewares.authenticateJWT, function (req, res, next) {
  next();
});

router.post('/cadastrar', function (req, res) {
  var dados = req.body;  
  usuarioController.novoUsuario(dados, function (resp) {
    if(resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});

router.post('/login', function (req, res) {
  var nome = req.body.nome;
  var senha = req.body.senha;
  usuarioController.login(nome, senha, function (resp) {
    if(resp.erro)
      res.status(401).json(resp);
    else
      res.status(200).json(resp);
  });
});

router.post('/refresh_token', function (req, res) {
  var refresh_token = req.body.refresh_token;
  usuarioController.refreshToken(refresh_token, function (resp) {
    if(resp.erro)
      res.status(401).json(resp);
    else
      res.status(200).json(resp);
  });
});

router.post('/listar/:id', middlewares.authenticateJWT, function (req, res, next) {
  next();
});

router.get('/listar/:id', function (req, res) {
  var id = req.params.id;
  usuarioController.dadosUsuario(id, function (resp) {
    if(resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});

module.exports = router;