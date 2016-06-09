var listar = (function(){

        var templateContainer = $('#templates');
        templateContainer.find('#todoTemplate').load('/templates/filacero.html', function(){
        filacero = templateContainer.find('#todoTemplate').html();
        });
        var templateContainer = $('#templates');
        templateContainer.find('#todoTemplate').load('/templates/filadatos.html', function(){
        filadatos = templateContainer.find('#todoTemplate').html();
        });
        
        tablafin = '</table>';

        function crearTablaYFilaCero(){
          var tablaini = '<table class="pure-table tabla margen-arriba">';
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

        return{
          crearTablaYFilaCero: crearTablaYFilaCero,
          construirPersonaHTML: construirPersonaHTML
        }
}());