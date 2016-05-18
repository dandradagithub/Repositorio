module.exports = function(server){
	var UsersModel = function(){
		var usuarios = [
		{
			name: 'pablo',
			email: '@globallogic.com'
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
				res.send(200, 'usuario no existe');
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

		/*this.putUser = function(req, res, next){
			var user = { nombre:'', email:''};

			user.nombre = req.params.name;
			user.email = req.params.email;

			usuarios.push(user);
			res.send(200, user);
			console.log('Nombre: %s - Email: %s', user.nombre, user.email);

			return next();
		}*/

		this.putUser = function(req, res, next){
			var tam = usuarios.length,
				i = 0;

			res.send(200, usuarios);

			while(i < tam)
			{
				console.log('Nombre: %s - Email: %s', usuarios[i].name, usuarios[i].email);
				i++;
			}

			console.log('%s', tam);
			return next;
		}
	};

	var User = new UsersModel();

	server.get({
		path: '/user/:id',
		version: '1.0.0'
	}, User.getUser);

	server.post({
		path: '/user/:id',
		version: '1.0.0'
	}, User.editUser);

	server.put({
		path: '/user',
		version: '1.0.0'
	}, User.putUser);

	/*server.view({
		path: '/user',
		version: '1.0.0'
	}, User.viewUser);*/
};