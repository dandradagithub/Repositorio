var map,
	marcador = 2;

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 12,
    center: {lat: -34.397, lng: 150.644}
  });

  var geolocalizacion = new google.maps.Geocoder();
  buscarDireccion(geolocalizacion, map);

  map.addListener('click', function(e) {
    agregarMarcador(e.latLng, map);
  });
}

function agregarMarcador(latLng, map){
	
	if(marcador){
		var marker = new google.maps.Marker({
			position: latLng,
    		map: map,
    		icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  strokeWeight:2,
                  strokeColor:"#B40404"
               },
  			});

  		map.panTo(latLng);
  		console.log(latLng.lat());
  		console.log(latLng.lng());
  		
  		marcador--;
	}
	else
		alert('Solo se pueden agregar 2 marcadores');
}

function buscarDireccion(localizar, map) {

  var address = "Francia, Virson";
  localizar.geocode( 

  		{'address': address}, 

  		function(results, status){
    	if (status === google.maps.GeocoderStatus.OK) 
    	{
    		map.setCenter(results[0].geometry.location);
    		console.log(results[0].geometry.location.lat());
    		console.log(results[0].geometry.location.lng());
      		var marker = new google.maps.Marker({
        	map: map,
        	position: results[0].geometry.location
      		});
    	} 
    	else
    		alert('Error: ' + status);
  });

}