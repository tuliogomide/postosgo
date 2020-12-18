const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');
var middlewares = require('../middlewares');

router.post('/cadastrar', middlewares.authenticateJWT, function (req, res, next) {
  next();
});

router.post('/cadastrar', function (req, res) {
  let dados = req.body;  
  usuarioController.novoUsuario(dados, function (resp) {
    if(resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});

router.post('/login', function (req, res) {
  let nome = req.body.nome;
  let senha = req.body.senha;
  usuarioController.login(nome, senha, function (resp) {
    if(resp.erro)
      res.status(401).json(resp);
    else
      res.status(200).json(resp);
  });
});

router.post('/refresh-token', function (req, res) {
  let refresh_token = req.headers.authorization;
  const split_refresh_token = refresh_token.split(' ')[1];
  usuarioController.refreshToken(split_refresh_token, function (resp) {
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
  let id = req.params.id;
  usuarioController.dadosUsuario(id, function (resp) {
    if(resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});

module.exports = router;