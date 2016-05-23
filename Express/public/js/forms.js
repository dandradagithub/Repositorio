// cuando la pag este cargado y se haga clic, se envian los datos
$(function(){

	// seleccionamos un elemento como en css -> $('form input[type=text]')


	$('form input[type=submit]').on('click', onClick)

	

		function onClick(){
			
		$.post({

			url:'/persona',

			data:{
				usuario:$('#usuario').val(),
				contraseña:$('#contraseña').val()
			},

			success: function(data){ // cuando el servidor esta listo, envia data
				console.log('respuesta del server', data); // muestra en la consola de front
			}
		});

		return false; // evitar todo lo que sigue despues del click
		}
});

		