var Posto              = require('../models/Posto');
var usuarioController  = require('../controllers/usuarioController');
var GoogleApi          = require('../services/GoogleMapsApi');
//var Usuario = require('../models/Usuario');

function retira_acentos(palavra) {

com_acento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
nova = "";

for(i=0;i<palavra.length;i++) {
   if (com_acento.search(palavra.substr(i,1))>=0)
       nova += sem_acento.substr(com_acento.search(palavra.substr(i,1)),1);
   else 
       nova += palavra.substr(i,1);
}
	return nova;
}

function CalcRadiusDistance(lat1, lon1, lat2, lon2) {
    var RADIUSMILES = 3961,
        RADIUSKILOMETERS = 6373,
        latR1 = lat1 * Math.PI / 180,
        lonR1 = lon1 * Math.PI / 180,
        latR2 = lat2 * Math.PI / 180,
        lonR2 = lon2 * Math.PI / 180,
        latDifference = latR2 - latR1,
        lonDifference = lonR2 - lonR1,
        a  = Math.pow(Math.sin(latDifference / 2), 2) + Math.cos(latR1) * Math.cos(latR2) * Math.pow(Math.sin(lonDifference / 2), 2),
        c  = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        dm = c * RADIUSMILES,
        dk = c * RADIUSKILOMETERS;
    	return Math.round(dk* 10) / 10;
}


exports.novoPosto = function(dados, token,callback){
	usuarioController.autorizaUsuario(token, function(usuario){
		if(usuario!==false){
			var endereco = dados.nome_fantasia+", "+dados.municipio;
			GoogleApi.retornaDados(endereco, function(resp){
				dados.nome_fantasia     = retira_acentos(dados.nome_fantasia);
				dados.lat               = resp.geometry.location.lat;
				dados.lng               = resp.geometry.location.lng;
				dados.endereco_completo = resp.formatted_address;
				dados.diesel_comum      = parseFloat(dados.diesel_comum.replace(",","."));
				dados.diesel_s10_comum  = parseFloat(dados.diesel_s10_comum.replace(",","."));
				dados.etanol_comum      = parseFloat(dados.etanol_comum.replace(",","."));
				dados.gasolina_comum    = parseFloat(dados.gasolina_comum.replace(",","."));
				dados.lat               = dados.lat.toString();
				dados.lng               = dados.lng.toString();
				Posto.create(dados, function(resp2){
					callback(resp2);
				});
				
			});
			
		}
		else{
			callback({erro:true, mensagem:'Solicitação negada'});
		}
	});
}

exports.postoProcura = function(municipio, ordem, origem, callback){
	
	Posto.listSearch(retira_acentos(municipio).toUpperCase(), ordem, function(resp){
		var postos=[];
		var	destinos = "";
		for(let i=0; i < resp.postos.length; i++){
			var raio = CalcRadiusDistance(Number(origem.lat),Number(origem.lng),Number(resp.postos[i].lat), Number(resp.postos[i].lng));
			if(raio < 4 && postos.length < 100){
				postos.push(resp.postos[i]);
				postos[postos.length-1].raio = raio;
			}
			
		}	
		postos = postos.sort(function(a, b){return a.raio - b.raio});		
		for(let i=0; i < postos.length && i < 100; i++){
			destinos += postos[i].lat+","+postos[i].lng+"|";
		}	
					
					GoogleApi.retornaDistancia(origem.lat+","+origem.lng, destinos, function(resp2){
						for(let i=0; i < postos.length && i < 100; i++){
							postos[i].rota = resp2.rows[0].elements[i];
						}
						postos = postos.sort(function(a, b){return a.rota.distance.value - b.rota.distance.value});	
						callback({postos});
					});

	});

	
}

exports.alteraPosto = function(razao_social, dados, token, callback){
usuarioController.autorizaUsuario(token, function(usuario){	
		if (usuario!==false) {
			if(dados.diesel_comum)
				dados.diesel_comum      = parseFloat(dados.diesel_comum.replace(",","."));
			if(dados.diesel_s10_comum)
				dados.diesel_s10_comum  = parseFloat(dados.diesel_s10_comum.replace(",","."));
			if(dados.etanol_comum)
				dados.etanol_comum      = parseFloat(dados.etanol_comum.replace(",","."));
			if(dados.gasolina_comum)
				dados.gasolina_comum    = parseFloat(dados.gasolina_comum.replace(",","."));
			Posto.change(razao_social, dados, function(resp){
				callback(resp);
			});			
		}
		else{
			callback({erro:true, mensagem:'Token inválido'});
		}		
	});
}

exports.deletaPosto = function(token, callback){
	usuarioController.autorizaUsuario(token, function(usuario){
		if(usuario!==false){
			Posto.delete(function(resp){
				callback(resp);
			});
		}
		else{
			callback({erro:true, mensagem:"Token inválido"});
		}
	});
}