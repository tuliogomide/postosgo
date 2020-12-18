var Usuario = require('../models/Usuario');

exports.novoUsuario = function (dados, callback) {
  if (dados.nome.trim().length < 3)
    return callback({ erro: true, mensagem: 'Campo nome deve possuir 3 ou mais digitos' })

  if (dados.senha.trim().length < 3)
    return callback({ erro: true, mensagem: 'Campo senha deve possuir 3 mais digitos' })

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