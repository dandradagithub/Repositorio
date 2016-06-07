var express = require('express'),
	server = express(),
	bodyParser = require('body-parser');

server.use(express.static('public')); //todos los archivos static los saca de la carpeta public
//server.use(bodyParser.json()); // convierte bodyPaerser en objeto json
//server.use(bodyParser.urlencoded({ extended: true }));

server.listen(3000, function(){
	console.log('escuchando en 3000...')
});