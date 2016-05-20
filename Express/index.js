var express = require('express'),
	server = express();

//todos los archivos static los saca de la carpeta public
server.use(express.static('public'));

/*server.get('/', function(req, res, next){
	res.send('hello word');
});*/

server.listen(3000, function(){
	console.log('escuchando en 3000...')
});