var Usuario = require('../models/Usuario');

exports.novoUsuario = function (dados, callback) {
  Usuario.create(dados, callback);
}


exports.login = function (nome, senha, callback) {
  Usuario.loginReturn(nome, senha, callback);
}

exports.refreshToken = function (refreshToken, callback) {
  Usuario.refreshTokenReturn(refreshToken, callback);
}

exports.dadosUsuario = function (id, callback) {
  Usuario.list(id, function (resp) {
    callback(resp);
  });
}