// cuando la pag este cargado y se haga clic, se envian los datos
$(function(){

    $('#actualizar').on('click', actualizar);
    $('#agregar').on('click', agregar);
    $('#eliminar').on('click', eliminar);
    $('#modificar').on('click', modificar);
    $('#obtener').on('click', obtener);

    actualizar();

    function actualizar(){
        $.get({ 

        url:'/persona',

        data:{
        },
            success: function(data){ // cuando el servidor esta listo, envia data
                console.log('respuesta del server', data); // muestra en la consola de front
                var tam = data.length;

                var f1 = ['Id', 'Nombre', 'Edad', 'Email'];
                $('.tabla').remove();
                var tabla = $('<table></table>');
                tabla.addClass('tabla');
                tabla.addClass('margen-arriba');
                var fila1 = '<th>' + f1[0] + '</th>' + '<th>' + f1[1] + '</th>'
                         +  '<th>' + f1[2] +   '</th>' +  '<th>' + f1[3] +  '</th>';
                tabla.append(fila1);

                for(var i = 0 ; i < tam ; i++){

                    var fila = $('<tr></tr>'),

                        campos = '<th>' + data[i].id + '</th>' + '<th>' + data[i].nombre + '</th>'
                              +  '<th>' + data[i].edad +   '</th>' +  '<th>' + data[i].email +  '</th>';

                    fila.append(campos);        
                    tabla.append(fila);
                }

                $('#divtabla').append(tabla);
            }
        });
    }

    function obtener(){
        $.get({

        url:'/persona/' + $('#id').val(),

            success: function(data){ // cuando el servidor esta listo, envia data
                console.log('respuesta del server', data); // muestra en la consola de front

                var fila = $('<tr></tr>'),

                    campos = '<th>' + data.id + '</th>' + '<th>' + data.nombre + '</th>'
                          +  '<th>' + data.edad +   '</th>' +  '<th>' + data.email +  '</th>';

                    fila.append(campos);        
                    tabla.append(fila);
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

                var fila = $('<tr></tr>'),

                    campos = '<th>' + data.id + '</th>' + '<th>' + data.nombre + '</th>'
                          +  '<th>' + data.edad +   '</th>' +  '<th>' + data.email +  '</th>';

                    fila.append(campos);        
                    $('.tabla').append(fila);

                /*$('#personas').append('<li>' +  "ID: " + data.id + 
                                                "   Nombre: " + data.nombre + 
                                                "   Edad: " + data.edad + 
                                                "   Email: " + data.email + 
                                     '</li>');*/
            }
        });
    }

    function eliminar(){
        $.ajax({

        url:'/persona',
        method:'delete',
        data:{
            id:$('#id').val()
        },

            success: function(data){ // cuando el servidor esta listo, envia data
                
                console.log('respuesta del server', data); // muestra en la consola de front
            }
        });
    }

    function modificar(){
        $.ajax({

        url:'/persona',
        method:'post',
        data:{
            id:$('#id').val(),
            name:$('#nombre').val(),
            age:$('#edad').val(),
            email:$('#email').val()
        },

            success: function(data){ // cuando el servidor esta listo, envia data
                
                console.log('respuesta del server', data); // muestra en la consola de front
                console.log(id);
            }
        });
    }

});