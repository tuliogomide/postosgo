var express           = require('express');
var router            = express.Router();
var postoController = require('../controllers/postoController');
//var fornecedorController = require('../controllers/fornecedorController');




function pegarToken(req, res, next){
	var header = req.headers['authorization'];
	if(typeof header !== 'undefined'){
		req.token = header;
		next();
	}else{
		res.sendStatus(403);
	}
}


router.post("/cadastrar", pegarToken,function(req, res){
	var token = req.token;
	var dados = req.body.dados;
	
	postoController.novoPosto(dados, token, function(resp){
		res.json(resp);
	});
});


router.get("/listar/:lat/:lng/:municipio/:ordem",function(req, res){
		var municipio	= req.params.municipio;
		var ordem 	    = req.params.ordem;
		var origem		= {
							"lat" : req.params.lat,
							"lng" : req.params.lng
						  };
		postoController.postoProcura(municipio, ordem, origem, function(resp){
			res.json(resp);
		});
});

/*
router.get('/loja/:storeid/:category/:search',function(req, res){
		postoController.list(storeid, category, search, function(resp){
			res.json(resp);
		});
});
*/

router.put("/alterar/:razao_social", pegarToken, function(req, res){
	var token           = req.token;
	var razao_social    = req.params.razao_social;
	var dados           = JSON.parse(req.body.dados);

	postoController.alteraPosto(razao_social, dados, token, function(resp){
		res.json(resp);
	}); 
});


router.delete("/deletar/", pegarToken, function(req, res){
	var token = req.token;

	postoController.deletaPosto(token, function(resp){
		res.json(resp);
	});
});


module.exports = router;

