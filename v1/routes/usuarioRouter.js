const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');
var middlewares = require('../middlewares');

router.post('/cadastrar', middlewares.authenticateJWT, function (req, res, next) {
  next();
});

router.post('/cadastrar', function (req, res) {
  let nome = '';
  let senha = '';
  if (typeof req.body.nome === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo nome é requerido.' });
  else
    nome = req.body.nome;

  if (typeof req.body.senha === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo senha é requerido.' });
  else
    senha = req.body.senha;

  usuarioController.novoUsuario({ nome, senha }, function (resp) {
    if (resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});

router.post('/login', function (req, res) {
  let nome = '';
  let senha = '';
  if (typeof req.body.nome === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo nome é requerido.' });
  else
    nome = req.body.nome;

  if (typeof req.body.senha === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo senha é requerido.' });
  else
    senha = req.body.senha;

  usuarioController.login(nome, senha, function (resp) {
    if (resp.erro)
      res.status(401).json(resp);
    else
      res.status(200).json(resp);
  });
});

router.post('/refresh-token', function (req, res) {
  let refresh_token = req.headers.authorization;
  const split_refresh_token = refresh_token.split(' ')[1];
  usuarioController.refreshToken(split_refresh_token, function (resp) {
    if (resp.erro)
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
    if (resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});

module.exports = router;