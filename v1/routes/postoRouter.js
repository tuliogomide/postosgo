var express = require('express');
var router = express.Router();
var postoController = require('../controllers/postoController');
//var fornecedorController = require('../controllers/fornecedorController');
var middlewares = require('../middlewares');


router.post('/cadastrar', middlewares.authenticateJWT, function (req, res, next) {
  next();
});

router.post("/cadastrar", function (req, res) {
  var dados = req.body.dados;
  postoController.novoPosto(dados, function (resp) {
    if(resp.erro)
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
    if(resp.erro)
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
    if(resp.erro)
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
    if(resp.erro)
      res.status(400).json(resp);
    else
      res.status(200).json(resp);
  });
});


module.exports = router;

