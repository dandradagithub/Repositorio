var map;
var i = 0, marcador = 2;
var icon_BACKWARD, icon_FORWARD;
var id_map;
var iconos = ['a', 'b'];
var color = ['#07D300', '#0091FF'];
var coordinate = [];
var user = {};

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 12
    })

    icon_BACKWARD = google.maps.SymbolPath.BACKWARD_CLOSED_ARROW;
    icon_FORWARD = google.maps.SymbolPath.FORWARD_CLOSED_ARROW;
    iconos[0] = icon_BACKWARD; 
    iconos[1] = icon_FORWARD;

    obtenerID();

    /*var geolocalizacion = new google.maps.Geocoder();
    buscarDireccion(geolocalizacion, map);*/

    map.addListener('click', function(e){
    agregarMarcador(e.latLng, map);
    user.lat = coordinate[0].lat;
    user.lng = coordinate[0].lng;
    });

    //var enviar_coor = user.coordinate ? user.coordinate.lat+'-'+user.coordinate.lng : 'error';

    document.getElementById('editcoordinate').onclick = enviarCoordenadas;
}

function obtenerID(){
        $.get({

        url:'/usuario/',
        data:{
        },
            success: function(data){
                console.log('respuesta del server', data);
                id_map = data.id;
                console.log(id_map);
            }
        });
    }

function enviarCoordenadas(){
    console.log(id_map);
    console.log(user);
      $.ajax({
      url: 'https://connectedin.herokuapp.com/person/' + id_map,
      method: 'PUT',
      data: JSON.stringify(user),
      contentType:'application/json'
      })
}

function agregarMarcador(latLng, map){
  var coor = {};
	if(marcador){
    var marker = new google.maps.Marker({
      position: latLng,
        map: map,
        icon: {
                  path: iconos[i],
                  scale: 10,
                  strokeWeight:2,
                  strokeColor: color[i]
               },
        });
    map.panTo(latLng);
  	console.log(latLng.lat()); console.log(latLng.lng());

    coor.lat = latLng.lat();
    coor.lng = latLng.lng();

    console.log(coor);
    coordinate.push(coor);
    console.log(coordinate);
    console.log(coordinate.length);

  	i++; marcador--;
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