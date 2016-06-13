var service = (function(){

  $('#divtabla').on('click', '.editdata', editar);

  function editar(){
    var usuario = {};

    usuario.id = $(this).data('id');
    usuario.firstName = $(this).data('firstname');
    usuario.lastName = $(this).data('lastname');
    usuario.gender = $(this).data('gender');
    usuario.birthday = $(this).data('birthday');
    usuario.address = $(this).data('address');
    usuario.photo = $(this).data('photo');
    usuario.password = $(this).data('password');
    usuario.email = $(this).data('email');
    console.log(usuario);
    $.ajax({
        url:'/usuario/',
        method:'put',
        data:{
            id: usuario.id,
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            gender: usuario.gender,
            birthday: usuario.birthday,
            address: usuario.address,
            photo: usuario.photo,
            password: usuario.password,
            email: usuario.email
        },
            success: function(data){
                console.log('respuesta del server', data);
            }
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
                var tablaini = template_html.crearTablaYFilaCero();

                for(var i = 0 ; i < tam ; i++){
                    tablaini += template_html.construirPersonaHTML(template_html.filaDatos(), data[i]);
                }

                tablaini += tablafin;
                $('#divtabla').append(tablaini);
            }
        });
    }
    return{
      listarUsuarios: listarUsuarios
    }
}());

var template_html = (function(){

        var templateContainer = $('#templates'),
            filacero,
            filadatos;

            templateContainer.find('#todoTemplate').load('/templates/filacero.html', function(){
            filacero = templateContainer.find('#todoTemplate').html();
            });

        templateContainer.find('#todoTemplate').load('/templates/filadatos.html', function(){
        filadatos = templateContainer.find('#todoTemplate').html();
        });

        tablafin = '</table>';

        function filaDatos(){
          return filadatos;
        }
        function crearTablaYFilaCero(){
          var tablaini = '<table id="tabla" class="pure-table tabla margen-arriba">';
          return tablaini += filacero;
        }
        function construirPersonaHTML(cadenaHTML, persona){
          return cadenaHTML
                          .replace(/%id%/g, persona._id)
                          .replace(/%firstname%/g, persona.firstName)
                          .replace(/%lastname%/g, persona.lastName)
                          .replace(/%gender%/g, persona.gender)
                          .replace(/%address%/g, persona.address)
                          .replace(/%birthday%/g, persona.birthday)
                          .replace(/%email%/g, persona.email)
                          .replace(/%password%/g, persona.password)
                          .replace(/%summary%/g, persona.summary)
                          .replace(/%photo%/g, persona.photo);
        }

        return{
          crearTablaYFilaCero: crearTablaYFilaCero,
          construirPersonaHTML: construirPersonaHTML,
          filaDatos: filaDatos
        }
}());

$(function(){

  service.listarUsuarios();
})
