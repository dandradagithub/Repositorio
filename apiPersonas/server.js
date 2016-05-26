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


// Agregar
server.put('/persona', function(req, res, next){
	
	    var tam = personas.length,
	    	user = {};

	    	user.id = tam+1,
	    	user.nombre = req.body.name;
	    	user.edad = req.body.age;
	    	user.email = req.body.email;

	    	personas.push(user);
	    	res.send(user);
	    return next();
});

// Eliminar
server.delete('/persona', function(req, res, next){
	
	var ide = req.body.id,
		tam = personas.length,
		i = 0;

		while( i < tam && !(personas[i].id == ide) )
			i++;

		if(i < tam){
			var eliminado = personas.splice(i, 1);
			res.send(eliminado);
		}
		else
			res.send('no se puede eliminar');
		return next();
});

// Modificar
server.post('/persona', function(req, res, next){
	
	var ide = req.body.id,
		nombre = req.body.nombre,
		edad = req.body.edad,
		email = req.body.email,

		tam = personas.length,
		i = 0;

		while( i < tam && !(personas[i].id == ide) )
			i++;

		if(i < tam){
			personas[i].nombre = nombre;
			personas[i].edad = edad;
			personas[i].email = email;
			res.send(personas[i]);
		}
		else
			res.send(404, 'no existe');
			
		return next();
});

// Obtener
server.get('/persona', function(req, res, next){
	res.send(personas);
	return next();
});

server.get('/persona/:id', function(req, res, next){
	
	var ide = req.params.id,
		tam = personas.length,
		i = 0;

		while( i < tam && !(personas[i].id == ide) )
			i++;

		if(i < tam)
			res.send(personas[i]);
		else
			res.send(404, 'no existe');
			
		return next();
});

server.listen(3000, function(){
	console.log('escuchando en 3000...')
});