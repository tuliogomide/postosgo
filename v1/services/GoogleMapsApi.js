
var fetch = require("isomorphic-fetch");


exports.retornaDados = function (endereco, callback) {

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(endereco)}&key=<YOUR_KEY>`)
    .then(response => response.json()).then(response => callback(response.results[0]))

}

exports.retornaDistancia = function (origem, destinos, callback) {
  fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${encodeURI(origem)}&destinations=${encodeURI(destinos)}&language=pt-BR&key=<YOUR_KEY>`)
    .then(response => response.json()).then(response => callback(response)).catch(response => callback(response.json()));

}



