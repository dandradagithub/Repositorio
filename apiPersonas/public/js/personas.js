// cuando la pag este cargado y se haga clic, se envian los datos
$(function(){

    var $form = $('form'),

        idInput = $form.find('#id'),
        nombreInput = $form.find('#nombre'),
        edadInput = $form.find('#edad'),
        emailInput = $form.find('#email'),

        actualizarBoton = $form.find('#actualizar'),
        agregarBoton = $form.find('#agregar'),
        eliminarBoton = $form.find('#eliminar'),
        modificarBoton = $form.find('#modificar'),
        obtenerBoton = $form.find('#obtener');

        actualizarBoton.on('click', actualizar);
        agregarBoton.on('click', agregar);
        eliminarBoton.on('click', eliminar);
        modificarBoton.on('click', modificar);
        obtenerBoton.on('click', obtener);

    var filacero = '<tr><th> ID</th>' + 
                       '<th> Nombre</th>' + 
                       '<th> Edad</th>' + 
                       '<th> Email</th> </tr>',

        filadatos,

        tablafin = '</table>',

        agregado = '<div id="A" class="alert alert-success margen-arriba" role="alert">' + 
                    'Se agrego %id%  %nombre%  %edad%  %email%</div>',

        noexiste = '<div id="NE" class="alert alert-danger margen-arriba" role="alert">' + 
                    '%mensaje% %id%</div>';

    var templateContainer = $('#templates');
        templateContainer.find('#todoTemplate').load('/templates/filadatos-template.html', function(){
        filadatos = templateContainer.find('#todoTemplate').html();
        });

    actualizar();

    function actualizar(){
        $.get({ 

        url:'/persona',

        data:{
        },
            success: function(data){ // cuando el servidor esta listo, envia data
                console.log('respuesta del server', data); // muestra en la consola de front
                var tam = data.length;

                borrarTablaYMensajes();

                var tablaini = crearTablaYFilaCero();
                
                for(var i = 0 ; i < tam ; i++){

                    tablaini += construirPersonaHTML(filadatos, data[i]);
                }

                tablaini += tablafin;

                $('#divtabla').append(tablaini);
            }
        });
    }

    function obtener(){
        $.get({

        url:'/persona/' + idInput.val(),

            success: function(data){ // cuando el servidor esta listo, envia data
                console.log('respuesta del server', data); // muestra en la consola de front

                if(data){

                    borrarTablaYMensajes();

                    var tablaini = crearTablaYFilaCero();

                    tablaini += construirPersonaHTML(filadatos, data);
                    
                    tablaini += tablafin;
                    $('#divtabla').append(tablaini);
                }
                else{

                    borrarTablaYMensajes();

                    var ide = idInput.val();
                    $('#divtabla').append(construirNoExisteHTML(noexiste, "No existe ID:", ide));
                }
            }
        });
    }

    function agregar(){ 
        $.ajax({

        url:'/persona',
        method:'put',
        data:{
            name:nombreInput.val(),
            age:edadInput.val(),
            email:emailInput.val()
        },

            success: function(data){ // cuando el servidor esta listo, envia data
                
                console.log('respuesta del server', data); // muestra en la consola de front

                borrarTablaYMensajes();

                var A = construirPersonaHTML(agregado, data);
                $('#divtabla').append(A);
            }
        });
    }

    function eliminar(){
        $.ajax({

        url:'/persona',
        method:'delete',
        data:{
            id:idInput.val()
        },

            success: function(data){ // cuando el servidor esta listo, envia data
                
                console.log('respuesta del server', data); // muestra en la consola de front

                if( !data ){

                    borrarTablaYMensajes();

                    var ide = idInput.val();
                    var NE = construirNoExisteHTML(noexiste, "No se puede eliminar ya que no existe ID:", ide);
                    $('#divtabla').append(NE);
                }
            }
        });
    }

    function modificar(){
        $.ajax({

        url:'/persona',
        method:'post',
        data:{
            id:idInput.val(),
            name:nombreInput.val(),
            age:edadInput.val(),
            email:emailInput.val()
        },

            success: function(data){ // cuando el servidor esta listo, envia data
                
                console.log('respuesta del server', data); // muestra en la consola de front
                console.log(id);
            }
        });
    }

    function construirPersonaHTML(cadenaHTML, persona){
        return cadenaHTML
                        .replace(/%id%/g, persona.id)
                        .replace(/%nombre%/g, persona.nombre)
                        .replace(/%edad%/g, persona.edad)
                        .replace(/%email%/g, persona.email);
        }
        function construirNoExisteHTML(cadenaHTML, msj, id){

            return cadenaHTML
                            .replace(/%mensaje%/, msj)
                            .replace(/%id%/, id);
        }
        function borrarTablaYMensajes(){

                    $('.tabla').remove();
                    $('#A').remove();
                    $('#NE').remove();
        }
        function crearTablaYFilaCero(){

                    var tablaini = '<table class="tabla margen-arriba">';
                    return tablaini += filacero;
        }

})