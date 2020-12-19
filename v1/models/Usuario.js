var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var tools = require('../utils/tools');

var UsuarioSchema = new Schema({
  nome: String,
  senha: String,
  auth: {
    token: String,
    refresh_token: String,
    status: Number,
    expired_at: Date,
  },
});

Usuario = mongoose.model('Usuario', UsuarioSchema);

function gerarToken(id, nome) {

  let expiredAt = 3600;

  let tokenPayLoad = {
    'id': id,
    'nome': nome,
  };
  let token = jwt.sign(tokenPayLoad, 'fbbdf33639da90cc80adf56732c41cb30772b61c', { expiresIn: expiredAt });

  let refreshTokenPayLoad = {
    'id': id,
    'nome': nome,
    'uniq_token': tools.uniqid()
  }
  let refreshToken = jwt.sign(refreshTokenPayLoad, '6d94ae1a897f3d10b01cadbc8a1224c5');

  return { token, refreshToken, expiredAt, status: 1 };
}

function gerarSenha(senha) {
  return bcrypt.hashSync(senha, bcrypt.genSaltSync(9));
}
function validarSenha(senha, UsuarioSenha) {
  return bcrypt.compareSync(senha, UsuarioSenha);
}

function verificaStatusRefreshToken(refresh_token) {

  return Usuario.findOne({ 'auth.refresh_token': refresh_token, 'auth.status': 1 }, function (erro, usuario) {
    if (erro) {
      return ({ erro: true, mensagem: 'Erro desconhecido' });
    }
    else if (usuario) {
      return ({ erro: false, mensagem: 'Token Ativo' });
    }
    else {
      return ({ erro: true, mensagem: 'Token inativo' });
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
  Usuario.findOne({ 'nome': nome }, function (erro, usuario) {
    if (erro) {
      callback({ erro: true, mensagem: 'Erro desconhecido' });
    } else if (usuario) {
      if (validarSenha(senha, usuario.senha)) {
        let auth = gerarToken(usuario.id, usuario.nome);
        let actualDate = new Date();
        console.log(actualDate);
        let expiredAt = actualDate.setSeconds(actualDate.getSeconds() + auth.expiredAt);
        Usuario.updateOne({ '_id': usuario.id }, {
          'auth': {
            'token': auth.token,
            'refresh_token': auth.refreshToken,
            'expired_at': expiredAt,
            'status': auth.status
          }
        }, function (erro2, usuario2) {
          if (erro2) {
            callback({ erro: true, mensagem: 'Erro desconhecido Auth' });
          }
          else if (usuario2) {
            callback({
              erro: false,
              access_token: auth.token,
              refresh_token: auth.refreshToken,
              expired_at: auth.expiredAt
            });
          }
          else {
            callback({ erro: true, mensagem: 'Não foi possível logar.' });
          }
        });

      } else {
        callback({ erro: true, mensagem: 'Senha incorreta' });
      }
    } else {
      callback({ erro: true, mensagem: 'Usuário inexistente' });
    }

  });
}

exports.refreshTokenReturn = function (refreshToken, callback) {
  jwt.verify(refreshToken, '6d94ae1a897f3d10b01cadbc8a1224c5', (err, decoded) => {
    if (err) {
      callback({ erro: true, mensagem: err.message });
    }
    else {
      let statusRefreshToken = verificaStatusRefreshToken(refreshToken);
      if (statusRefreshToken.erro) {
        callback({ erro: true, mensagem: statusRefreshToken.mensagem });
      }
      else {
        Usuario.findOne({ '_id': decoded.id }, function (erro, usuario) {
          if (erro) {
            callback({ erro: true, mensagem: 'Erro desconhecido' });
          } else if (usuario) {
            let auth = gerarToken(usuario.id, usuario.nome);
            let actualDate = new Date();
            console.log(actualDate);
            let expiredAt = actualDate.setSeconds(actualDate.getSeconds() + auth.expiredAt);
            Usuario.updateOne({ '_id': usuario.id }, {
              'auth': {
                'token': auth.token,
                'refresh_token': auth.refreshToken,
                'expired_at': expiredAt,
                'status': auth.status
              }
            }, function (erro2, usuario2) {
              if (erro2) {
                callback({ erro: true, mensagem: 'Erro desconhecido Refresh_token' });
              }
              else if (usuario2) {
                callback({
                  erro: false,
                  access_token: auth.token,
                  refresh_token: auth.refreshToken,
                  expired_at: auth.expiredAt
                });
              }
              else {
                callback({ erro: true, mensagem: 'Não foi possível logar.' });
              }
            });

          } else {
            callback({ erro: true, mensagem: 'Usuário inexistente' });
          }

        });
      }
    }


  });
}


exports.list = function (id, callback) {
  Usuario.findOne({ '_id': id }, function (erro, usuario) {
    if (erro) {
      callback({ erro: true, mensagem: 'Erro desconhecido' });
    }
    else if (usuario) {
      callback({ erro: false, usuario: { id: usuario.id, nome: usuario.nome } });
    }
    else {
      callback({ erro: true, mensagem: "Usuario não encontrado" });
    }
  });
}



