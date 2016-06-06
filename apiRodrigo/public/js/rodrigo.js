// cuando la pag este cargado y se haga clic, se envian los datos

(function () {

    var $form;

    function init(){
        $form = $('form');
        setupListeners();
    }

    function setupListeners(){
        $form.on('submit', onFormSubmit);
    }

    function onFormSubmit(){
        var serializeData = $form.serializeArray();
        var data = {};

        serializeData.forEach(function (keyValue){
            data[keyValue.name] = keyValue.value;
        });
    }
}());

var service = (function(){
        var CREAR_URL = '';

        function createUser(user){
            return $.post(crear, user);
        }

        return {
            createUser: createUser;
        }
    }