var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
  nome: String,
  senha: String,
  token: String
});

Usuario = mongoose.model('Usuario', UsuarioSchema);

function gerarToken(nome) {
  return jwt.sign({
    'nome': nome,
  }, 'fbbdf33639da90cc80adf56732c41cb30772b61c');
}

function gerarSenha(senha) {
  return bcrypt.hashSync(senha, bcrypt.genSaltSync(9));
}
function validarSenha(senha, UsuarioSenha) {
  return bcrypt.compareSync(senha, UsuarioSenha);
}

exports.authorize = function (token, callback) {
  Usuario.findOne({ 'token': token }, function (erro, Usuario) {
    if (erro) {
      callback(false);
    }
    else if (Usuario) {
      callback(Usuario);
    }
    else {
      callback(false);
    }
  });

}


exports.create = function (dados, callback) {

  Usuario.findOne({ 'nome': dados.nome }, function (erro, usuario) {
    if (erro) {
      callback({ erro: true, mensagem: 'Erro desconhecido' });
    } else if (usuario) {
      callback({ erro: true, mensagem: 'Usuario já existe' });
    } else {
      new Usuario({
        'nome': dados.nome,
        'senha': gerarSenha(dados.senha),
        'token': gerarToken(dados.nome)


      }).save(function (erro, Usuario) {
        if (erro) {
          callback({ erro: true, mensagem: 'Erro ao inserir' });
        } else {
          callback({ erro: false, mensagem: 'Usuario criado com sucesso' });
        }
      });
    }
  });

}




exports.loginReturn = function (nome, senha, callback) {
  Usuario.findOne({ 'nome': nome }, function (erro, Usuario) {
    if (erro) {
      callback({ erro: true, mensagem: 'Erro desconhecido' });
    } else if (Usuario) {
      if (validarSenha(senha, Usuario.senha)) {
        callback({ erro: false, mensagem: 'Logado com sucesso!', 'token': Usuario.token });
      } else {
        callback({ erro: true, mensagem: 'Senha incorreta' });
      }
    } else {
      callback({ erro: true, mensagem: 'Usuário inexistente' });
    }

  });
}

/*
exports.list = function(id, callback){
  Usuario.findOne({'_id':id}, function(erro, Usuario){
    if(erro){
      callback({erro:true, mensagem:'Erro desconhecido'});
    }
    else if(Usuario){
      callback({erro:false, 'cnpj':Usuario.nome});
    }
    else{
      callback({erro:true, mensagem:"Usuario não encontrado"});
    }
  });
}
*/



