var express = require('express');
var bodyParser = require('body-parser');
var port = '3000';

var app = module.exports = express();

app.listen(port);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*"); // allow request from all origin
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
})