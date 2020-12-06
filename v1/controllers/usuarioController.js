var Usuario = require('../models/Usuario');



exports.novoUsuario = function(token, dados, callback){
  Usuario.authorize(token, function(resp){
    if(resp!=false){
      Usuario.create(dados, callback);
    }
    else{
      callback(false);
    }
  });
}


exports.login = function (nome, senha, callback) {
  Usuario.loginReturn(nome, senha, function (resp) {
    callback(resp);
  });
}

/*
exports.dadosUsuario = function(id, callback){
  Usuario.list(id, function(resp){
    callback(resp);
  });
}
*/

exports.autorizaUsuario = function (token, callback) {
  Usuario.authorize(token, function (resp) {
    callback(resp);
  });
}