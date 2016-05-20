module.exports = function(server){
	var UsersModel = function(){
		var usuarios = [
		{
			name: 'pablo',
			email: 'pablo@globallogic.com'
		},
		{
			name: 'agustin',
			email: 'agustin.diaz@gl.com'	
		}
		];
		this.getUser = function(req, res, next){
			var userId = req.params.id; // va .params.id porque es un get, si es POST va .body.id

			if(usuarios[userId]){ //si encontro un usuario me devuelve los datos de ese usuario
				res.send(200, usuarios[userId]);
			}
			else{
				res.send(404, 'no existe usuario');
				console.log('usuario %s no existe', userId);
			}
			return next(); //siempre se hace esto
		}

		this.editUser = function(req, res, next){
			var userId = req.params.id,
			newName = req.params.name;

			if(usuarios[userId]){
				usuarios[userId].name = newName;
				res.send(200, usuarios[userId]);
			}
			return next();
		}

		this.putUser = function(req, res, next){
			var user = { name:'', email:''};

			user.name = req.params.name;
			user.email = req.params.email;

			usuarios.push(user);
			res.send(200, user);
			console.log('Nombre: %s - Email: %s', user.name, user.email);

			return next();
		}

		this.viewUser = function(req, res, next){ // ver todos los usuarios
			var tam = usuarios.length,
				i = 0;
			
			res.send(200, usuarios);
			console.log("\nUsuarios: %s", tam);
			while(i < tam)
			{
				
				console.log('Nombre: %s - Email: %s', usuarios[i].name, usuarios[i].email);
				i++;
			}

			return next;
		}

		this.deleteUser = function(req, res, next){
			var eliminado = usuarios.pop();
			res.send(200, "Se elimino el ultimo usuario");
			console.log('\nUsuario eliminado: -%s-  -%s-', eliminado.name, eliminado.email);
			return next();
 		}

		this.filtrarPorParametro = function(req, res, next){
			var userId = req.params.id;
			var variable = req.params.parametro;

			if(usuarios[userId])
				res.send(200, usuarios[userId][variable]);
			else{
				res.send(404, 'no existe usuario');
			}
			return next();
		}

		this.deleteSplice = function(req, res, next){
			var userId = req.params.id;

			if(usuarios[userId]){
				var eliminado = usuarios.splice(userId, 1);
				res.send(200, "Se elimino");
				console.log('\nUsuario eliminado: -%s-  -%s-', eliminado[0].name, eliminado[0].email);
			}
			else{
				res.send(404, 'no se puede eliminar ya que no existe');
			}

			return next();
		}

	};

	var User = new UsersModel();

	/* consulta */
	server.get({
		path: '/user/:id',
		version: '1.0.0'
	}, User.getUser);

	server.get({
		path: '/user',
		version: '1.0.0'
	}, User.viewUser);

	server.get({
		path: '/user/:id/:parametro',
		version: '1.0.0'
	}, User.filtrarPorParametro);


	/* modificar */
	server.post({
		path: '/user/:id',
		version: '1.0.0'
	}, User.editUser); // busco por id y edito

	server.del({
		path: '/user',
		version: '1.0.0'
	}, User.deleteUser); // elimino el ultimo

	server.del({
		path: '/user/:id',
		version: '1.0.0'
	}, User.deleteSplice);// elimino por id


	/* alta */
	server.put({ // agrego al final
		path: '/user',
		version: '1.0.0'
	}, User.putUser);
};