$(function(){
    var form = $('form'),
        username = form.find('input.username'),
        password = form.find('input.password');
        
    form
        .find('input[type=submit]')
        .on('click', onClick);


	function onClick(){
        var errors = [];
        
        if(!username.val().length){
           errors.push('le pifiaste');
        }
        
        if(!password.val().length){
            errors.push('password invalido');
        }

        if(errors.length){
            
            for(var i=0; i< errors.length; i++){
                alert(errors[i]);
            }
            
            return false;
        }
        
		$.post({
			url:'/login',
			data:{
				username:username.val(),
                password:password.val()
			},
			success: function(data){
                if(data.ok){
                    console.log('todo ok');
                }
                else{
                    console.error('password invalido');
                }
			}
		});		
		return false;
	}
});

/*<form>
            <input id="usuario" type="text"></input>
            <input id="contraseña" type="text"></input>
            <input type="submit" value="enviar"></input>
        </form>*/