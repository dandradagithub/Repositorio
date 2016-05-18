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