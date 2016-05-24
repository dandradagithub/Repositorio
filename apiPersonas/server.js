var express = require('express'),
	server = express();
	bodyParser = require('body-parser'),
	personas = [
	{
		id: 1,
		nombre: 'Persona1',
		edad: 24,
		email: 'persona1@sarasa.com'
	},
	{
		id: 2,
		nombre: 'Persona2',
		edad: 25,
		email: 'persona2@sarasa.com'
	},
	{
		id: 3,
		nombre: 'Persona3',
		edad: 26,
		email: 'persona3@sarasa.com'
	}
	];

server.use(express.static('public')); //todos los archivos static los saca de la carpeta public
server.use(bodyParser.json()); // convierte bodyPaerser en objeto json
server.use(bodyParser.urlencoded({ extended: true }));

// listar todas las personas
server.get('/persona', function(req, res, next){
	res.send(personas);
	return next();
});

// detalle de una persona
server.get('/persona/:id', function(req, res, next){
	var id = req.params.id;

	if(personas[id-1])
		res.send(personas[id-1]);
	else
		res.send('no existe');
	return next();
});

server.put('/persona', function(req, res, next){

	var user = { id:2 , name:'dfg', edad:44 , email:'sdfsd'};

		/*user.id = req.params.id; NO AGREGA
	    user.name = req.params.nombre;
	    user.edad = req.params.edad;
	    user.email = req.params.email;*/

	    personas.push(user);
	    res.send(200, user);
	    return next();
});

server.listen(3000, function(){
	console.log('escuchando en 3000...')
});