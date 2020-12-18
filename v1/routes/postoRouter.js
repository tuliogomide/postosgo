var express = require('express');
var router = express.Router();
var postoController = require('../controllers/postoController');
//var fornecedorController = require('../controllers/fornecedorController');
var middlewares = require('../middlewares');


router.post('/cadastrar', middlewares.authenticateJWT, function (req, res, next) {
  next();
});

router.post("/cadastrar", function (req, res) {
  
  let dados = new Object();

  if (typeof req.body.razao_social === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo razao_social é requerido.' });
  else
    dados.razao_social = req.body.razao_social;

  if (typeof req.body.nome_fantasia === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo nome_fantasia é requerido.' });
  else
    dados.nome_fantasia = req.body.nome_fantasia;

  if (typeof req.body.municipio === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo municipio é requerido.' });
  else
    dados.municipio = req.body.municipio;

  if (typeof req.body.bairro === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo bairro é requerido.' });
  else
    dados.bairro = req.body.bairro;

  if (typeof req.body.diesel_comum === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo diesel_comum é requerido.' });
  else
    dados.diesel_comum = req.body.diesel_comum;

  if (typeof req.body.diesel_s10_comum === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo diesel_s10_comum é requerido.' });
  else
    dados.diesel_s10_comum = req.body.diesel_s10_comum;

  if (typeof req.body.etanol_comum === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo etanol_comum é requerido.' });
  else
    dados.etanol_comum = req.body.etanol_comum;

  if (typeof req.body.gasolina_comum === "undefined")
    res.status(400).json({ erro: true, mensagem: 'campo gasolina_comum é requerido.' });
  else
    dados.gasolina_comum = req.body.gasolina_comum;

  postoController.novoPosto(dados, function (resp) {
    if (resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});


router.get("/listar/:lat/:lng/:municipio/:ordem", function (req, res) {
  var municipio = req.params.municipio;
  var ordem = req.params.ordem;
  var origem = {
    "lat": req.params.lat,
    "lng": req.params.lng
  };
  postoController.postoProcura(municipio, ordem, origem, function (resp) {
    if (resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});

/*
router.get('/loja/:storeid/:category/:search',function(req, res){
    postoController.list(storeid, category, search, function(resp){
      res.json(resp);
    });
});
*/

router.put('/alterar/:razao_social', middlewares.authenticateJWT, function (req, res, next) {
  next();
});

router.put("/alterar/:razao_social", function (req, res) {
  var razao_social = req.params.razao_social;
  var dados = JSON.parse(req.body.dados);

  postoController.alteraPosto(razao_social, dados, function (resp) {
    if (resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});


router.delete('/deletar', middlewares.authenticateJWT, function (req, res, next) {
  next();
});

router.delete("/deletar", function (req, res) {

  postoController.deletaPosto(function (resp) {
    if (resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});


module.exports = router;

