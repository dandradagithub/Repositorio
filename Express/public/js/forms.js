// cuando la pag este cargado y se haga clic, se envian los datos
$(function(){

	var form = $('form'),
		campo_usuario = form.find('input.username'), // $('#usuario')
		campo_contraseña = form.find('input.password'); // $('#contraseña')
        
    form
        .find('input[type=submit]')
        .on('click', onClick);

        function validateEmail(email) {
    		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	
    	return re.test(email);
		}


	function onClick(){
        
        // usuario
        if(!campo_usuario.val().length){
        	campo_usuario.parents('.form-group').addClass('has-error');	
           	campo_usuario.parents('.form-group').addClass('required');
           	campo_usuario.parents('.form-group').removeClass('invalid');
        }
        else{
        		campo_usuario.parents('.form-group').removeClass('has-error');
        		campo_usuario.parents('.form-group').removeClass('required');

        		if(!validateEmail(campo_usuario.val())){
        			campo_usuario.parents('.form-group').addClass('has-error');	
           			campo_usuario.parents('.form-group').addClass('invalid');
        		}
        		else{
        			campo_usuario.parents('.form-group').removeClass('has-error');
        			campo_usuario.parents('.form-group').removeClass('invalid');
        		}
        	}

		/*if(campo_usuario.parents('.form-group.required, .form-group.invalid').length){
			campo_usuario.parents('.form-group').addClass('has-error');	
		}
		else{
			campo_usuario.parents('.form-group').removeClass('has-error');		
		}*/


		// contraseña
        if(!campo_contraseña.val().length){
            campo_contraseña.parents('.form-group').addClass('has-error');
        }
        else{
        	campo_contraseña.parents('.form-group').removeClass('has-error');
        }

        if(form.find('has-error').length){
            return false;
        }
			
	$.post({

		url:'/persona',

		data:{
			usuario:campo_usuario.val(),
			contraseña:campo_contraseña.val()
		},
			success: function(data){ // cuando el servidor esta listo, envia data
				console.log('respuesta del server', data); // muestra en la consola de front
			}
		});

		return false; // evitar todo lo que sigue despues del click
	}
});

		