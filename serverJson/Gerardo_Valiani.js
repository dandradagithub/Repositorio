Aca esta el ejercicio:
1. Mostar el listado de items
2. Si hago click en uno de ellos, me lo carga en un formulario para poder editarlo
3. Pongo y saco el feedback de loading al usuario
4. Muestro un mensaje de success o error segun corresponda.
5. Refresco la lista de items con el valor nuevo.
6. Exitos!

$(document).on('ready', function()
  {
      $('#jqueryAjaxButton').on('click', function(){
      $.ajax({
   // url: "https://polls.apiblueprint.org/questions",
   url: "http://localhost:3000/users/1",
   method: 'put', // get, post, put, delete, patch y option
   data: {
    name: 'John'
   }
   statusCode: {
    404: function() {
     console.error('Page not found.');
    },
    500: function() {
     // Call server loggear
     console.error('Server error.');
    }
   },
   beforeSend: function(jqXHR, config) {
    // Loading ...
    // Transform
    console.log('Before call.');
   },
   complete: function() {
    
    console.log('Call completed. Success and Error callbacks have been called.');
   },
    success: function( result ) { // 2xx
     // Sacar loading
      console.log('Success: ', result);
     },
     error: function( result ) { // 4xx o 5xx
      console.log('Some error: ', result.responseText)
     }
  });
 });
});