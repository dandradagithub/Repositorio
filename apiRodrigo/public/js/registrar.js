var registrar = (function(){

	var $form;

    function init(){
        $form = $('form');
        setupListeners();
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