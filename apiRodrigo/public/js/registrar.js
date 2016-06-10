var registrar = (function(){

	var $form;

    function init(){
        $form = $('form');
        setupListeners();
        levantarID($form);
    }

    function setupListeners(){
        $form.on('submit', onFormSubmit);
    }

    function onFormSubmit(e){
    	e.preventDefault();

        var data = serializar.getData($form);
            service.crearUsuario(data);
            console.log(data);
    }

    function levantarID($form){

        $.get({

        url:'/usuario/',
        data:{
        },
            success: function(data){
                console.log('respuesta del server', data);

                $form.find('#nom').val(data.firstName);
                $form.find('#ape').val(data.lastName);
                $form.find('#sex').val(data.gender);
                $form.find('#fenac').val(data.address);
            }
        });
    }

    init();

}());

var serializar = (function(){

	function getData($form){
        var serializeData = $form.serializeArray();
        var registro = {};

        serializeData.forEach(function (keyValue){
            registro[keyValue.name] = keyValue.value;
        });

        return registro;
	}

	return{
		getData: getData
	}
}());

var service = (function(){

    function crearUsuario(user){ 
        $.ajax({
            url: 'https://connectedin.herokuapp.com/person',
            method: 'POST',
            data: JSON.stringify(user),
            contentType:'application/json'
        });
    }

    return{
        crearUsuario: crearUsuario
    }
}());