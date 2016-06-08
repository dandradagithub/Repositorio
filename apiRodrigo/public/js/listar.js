var service = (function(){

    var filacero = '<thead><tr><th> Nombre</th>' + 
                       '<th> Apellido</th>' + 
                       '<th> Sexo</th>' + 
                       '<th> Fecha Nac</th>' +
                       '<th> Direccion</th>' +
                       '<th> Foto</th>' +
                       '<th> Contraseña</th>' +
                       '<th> Email</th> </tr></thead>',

        filadatos = '<tr><th> %Nombre%</th>' + 
                       '<th> %Apellido%</th>' + 
                       '<th> %Sexo%</th>' + 
                       '<th> %Fecha Nac%</th>' +
                       '<th> %Direccion%</th>' +
                       '<th> %Foto%</th>' +
                       '<th> %Contraseña%</th>' +
                       '<th> %Email%</th>' +
                       '<th> <span class="input-group-btn">' + 
                          '<button class="btn editardatos" data-id="%id%" type="button">' +
                          '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
                          '</button>' + 
                       '</span> </th> </tr>',


        tablafin = '</table>';

        function init(){
          $('body').on('click', '.editardatos', editar);
        }

        function editar(){
          console.log($(this).data('id'));
          var user = {'firstName': 'bbbbbb'}
          $.ajax({
          url: 'https://connectedin.herokuapp.com/person/:' + $(this).data('id'),
          method: 'PUT',
          data: JSON.stringify(user),
          contentType:'application/json'
        })
        }

        init();

	function listarUsuarios(){ 
        $.ajax({
	        url: 'https://connectedin.herokuapp.com/person',
	        method: 'GET',
	        contentType:'application/json',

            success: function(data){ 

                //console.log('respuesta del server', data);

                var tam = data.length;

                $('.tabla').remove();

                var tablaini = crearTablaYFilaCero();
                
                for(var i = 0 ; i < tam ; i++){

                    tablaini += construirPersonaHTML(filadatos, data[i]);
                }

                tablaini += tablafin;

                $('#divtabla').append(tablaini);
            }
        });
    }

    function crearTablaYFilaCero(){

        var tablaini = '<table class="tabla margen-arriba">';
        return tablaini += filacero;
        }
    function construirPersonaHTML(cadenaHTML, persona){

        return cadenaHTML
                        .replace(/%id%/g, persona._id)
                        .replace(/%Nombre%/g, persona.firstName)
                        .replace(/%Apellido%/g, persona.lastName)
                        .replace(/%Sexo%/g, persona.gender)
                        .replace(/%Fecha Nac%/g, persona.birthday)
                        .replace(/%Direccion%/g, persona.address)
                        .replace(/%Foto%/g, persona.photo)
                        .replace(/%Contraseña%/g, persona.password)
                        .replace(/%Email%/g, persona.email);
        }

    return {
    	listarUsuarios: listarUsuarios
    }
}());

$(function(){

    service.listarUsuarios();
})