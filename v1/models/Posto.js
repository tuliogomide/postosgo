var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostoSchema = new Schema({
  razao_social: String,
  nome_fantasia: String,
  municipio: String,
  bairro: String,
  endereco_completo: String,
  diesel_comum: Number,
  diesel_s10_comum: Number,
  etanol_comum: Number,
  gasolina_comum: Number,
  lng: String,
  lat: String,
  tags: String,
  favoritos: Number,
  ultima_atualizacao: String
});


var Posto = mongoose.model('posto', PostoSchema);


exports.create = function (dados, callback) {
  var dayName = new Array("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado");
  var monName = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro");
  var now = new Date();
  var data = dayName[now.getDay()] + ", " + now.getDate() + " de " + monName[now.getMonth()] + " de " + now.getFullYear() + " às " + now.getHours() + " : " + now.getMinutes() + " : " + now.getSeconds();
  new Posto({
    'razao_social': dados.razao_social,
    'nome_fantasia': dados.nome_fantasia,
    'municipio': dados.municipio,
    'bairro': dados.bairro,
    'endereco_completo': dados.endereco_completo,
    'diesel_comum': dados.diesel_comum,
    'diesel_s10_comum': dados.diesel_s10_comum,
    'etanol_comum': dados.etanol_comum,
    'gasolina_comum': dados.gasolina_comum,
    'lng': dados.lng,
    'lat': dados.lat,
    'tags': "0",
    'favoritos': 0,
    'ultima_atualizacao': data.toString()

  }).save(function (error) {
    if (error) {
      callback({ erro: true, mensagem: "Não foi possível salvar" });
    }
    else {
      callback({ erro: false, mensagem: "Posto criado com sucesso" });

    }
  });

}

exports.listSearch = function (municipio, ordem, callback) {
  if (ordem == "geolocal") {
    Posto.find({ "municipio": new RegExp(municipio) }, function (error, postos) {
      if (error) {
        callback({ erro: true, mensagem: "Não foi possível encontrar os postos" });
      }
      else {
        var destinos = "";
        callback({ erro: false, postos });

      }
    }).lean();

  }
  else {
    callback({ erro: true, mensagem: "Ordem inexistente" });
  }

}


exports.change = function (razao_social, dados, callback) {
  Posto.find({ "razao_social": razao_social }, function (error, posto) {

    if (posto == null) {
      callback({ resposta: "Posto não encontrado" });
    }
    else {
      Posto.update({ 'razao_social': razao_social }, dados, function () {

        callback({ resposta: "Posto alterado com sucesso" });

      });

    }

  });
}



exports.delete = function (callback) {

  Posto.remove({}, function (error) {
    if (!error) {
      callback({ resposta: "Limpeza da tabela Posto foi um sucesso!" })
    }
    else {
      callback({ resposta: "Erro não conhecido" });
    }
  });

}


