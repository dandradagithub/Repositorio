var service = (function(){

    function init(){
        $('.contenedor').on('click', '.editardatos', editar);
    }

    function editar(){
          console.log($(this).data('id'));
          var persona = {firstName: ' ', lastName: ' '};
          $.ajax({
          url: 'https://connectedin.herokuapp.com/person/' + $(this).data('id'),
          method: 'PUT',
          data: JSON.stringify(persona),
          contentType:'application/json'
        })
    }

	function crearUsuario(user){ 
        $.ajax({
	        url: 'https://connectedin.herokuapp.com/person',
	        method: 'POST',
	        data: JSON.stringify(user),
	        contentType:'application/json'
        });
    }

    function listarUsuarios(){ 
        $.ajax({
            url: 'https://connectedin.herokuapp.com/person',
            method: 'GET',
            contentType:'application/json',

            success: function(data){ 
                var tam = data.length;
                $('.tabla').remove();
                var tablaini = listar.crearTablaYFilaCero();

                for(var i = 0 ; i < tam ; i++){
                    tablaini += listar.construirPersonaHTML(filadatos, data[i]);
                }

                tablaini += tablafin;
                $('#divtabla').append(tablaini);
            }
        });
    }

    init();

    return {
    	crearUsuario: crearUsuario,
        listarUsuarios: listarUsuarios
    }
}());

(function(){

    service.listarUsuarios();
}());