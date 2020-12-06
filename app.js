var app = require('./v1/config/app_config');
var db = require('./v1/config/db_config');
var usuario = require('./v1/routes/usuarioRouter');
var postoController = require('./v1/controllers/postoController');
var postos = require('./v1/routes/postoRouter');


app.get('/', function (req, res) {
  res.end("Bem-vindo a API de postos");

});

app.use('/api/v1/postos', postos);
app.use('/api/v1/usuario', usuario);

