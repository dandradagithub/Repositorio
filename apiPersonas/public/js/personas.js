// cuando la pag este cargado y se haga clic, se envian los datos
$(function(){

    $('#actualizar').on('click', actualizar);
    $('#agregar').on('click', agregar);
    $('#eliminar').on('click', eliminar);
    $('#modificar').on('click', modificar);

    actualizar();

    function actualizar(){
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

    function agregar(){
        $.ajax({

        url:'/persona',
        method:'put',
        data:{
            name:$('#nombre').val(),
            age:$('#edad').val(),
            email:$('#email').val()
        },

            success: function(data){ // cuando el servidor esta listo, envia data
                
                console.log('respuesta del server', data); // muestra en la consola de front

                //$('#personas').html("Personas")
                /*for(var i = 0 ; i < tam ; i++){*/
                $('#personas').append('<li>' +  "ID: " + data.id + 
                                                "   Nombre: " + data.nombre + 
                                                "   Edad: " + data.edad + 
                                                "   Email: " + data.email + 
                                     '</li>');
                //}
            }
        });
    }

    function eliminar(){
        $.ajax({

        url:'/persona',
        method:'delete',
        data:{
            id:$('#ide').val()
        },

            success: function(data){ // cuando el servidor esta listo, envia data
                
                console.log('respuesta del server', data); // muestra en la consola de front
            }
        });
    }

    /*function modificar(){
        $.ajax({

        url:'/persona',
        method:'post',
        data:{
            id:$('#ide').val(),
            name:$('#nombre').val(),
            age:$('#edad').val(),
            email:$('#email').val()
        },

            success: function(data){ // cuando el servidor esta listo, envia data
                
                console.log('respuesta del server', data); // muestra en la consola de front
            }
        });
    }*/

});