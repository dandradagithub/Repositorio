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

        /*var data = serializar.getData($form);
            service.crearUsuario(data);*/

        if(!validar.password($form)){
            $form.find('#passuno').parents('.form-group').addClass('has-error');
            $form.find('#passdos').parents('.form-group').addClass('has-error');
            $form.find('#passdos').parents('.form-group').addClass('pass-dif');
        }
    	
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

    return {
    	crearUsuario: crearUsuario
    }
}());

var validar = (function(){

        function password($form){
            
            var inputpassuno = $form.find('#passuno'),
                inputpassdos = $form.find('#passdos');

            return inputpassuno.val() === inputpassdos.val();
        }
        
        return{
            password: password
        }
}());