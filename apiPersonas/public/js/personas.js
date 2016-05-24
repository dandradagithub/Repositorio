// cuando la pag este cargado y se haga clic, se envian los datos
$(function(){

    $('input[type=submit]').on('click', cargarTodo);

    cargarTodo();

    function cargarTodo(){
        $.get({

        url:'/persona',

        data:{
        },
            success: function(data){ // cuando el servidor esta listo, envia data
                console.log('respuesta del server', data); // muestra en la consola de front
                var tam = data.length;

                $('#personas').html("Personas")
                for(var i = 0 ; i < tam ; i++){
                $('#personas').append('<li>' +  "ID: " + data[i].id + 
                                                "   Nombre: " + data[i].nombre + 
                                                "   Edad: " + data[i].edad + 
                                                "   Email: " + data[i].email + 
                                     '</li>');
                }
            }
        });
    }

});	