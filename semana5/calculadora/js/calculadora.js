var calculadora = (function(){

	 var valor;
    function sumar(input){
        input = intentarConvetir(input);
        valor += input;
        return valor;
    }
    
    function intentarConvetir(input){
        input = parseInt(input, 10);
        if(isNaN(input)){
            throw 'Invalid Number';
        }
        return input;
    }

    function restar(input){
        input = intentarConvetir(input);        
        valor -=input;
        return valor;
    }
    function multiplicar(input){
        input = intentarConvetir(input);
        valor *=input;
        return valor;
    }
    function dividir(input){
        input = intentarConvetir(input);
        if(input === 0){
            throw 'Math Error';
        }
        valor = valor / input;
        return valor;

    }
    function clear(){
        init();
        return valor;        
    }    
    function init(){
        valor = 0;
    }
    
    function asignarValor(input){
        input = intentarConvetir(input);
        valor = input;
        return valor;
    }
    
    function obtenerValor(){
        return valor;
    }
    
    init();
    
    return{
      sumar: sumar,
      restar: restar,
      multiplicar: multiplicar,
      dividir: dividir,
      clear: clear,
      asignarValor: asignarValor,
      obtenerValor: obtenerValor
    };

})();

$(function(){

	var $cal = $('.cal'),

	numeroInput = $cal.find('#numeroInput'),
	operacion,
	concatenarNumero;

	$cal.on('click', '.operador', botonOperador);
	$cal.on('click', '.numero', botonNumero);
	$('#igual').on('submit', igual);

	function igual(){
		var resultado = calculadora[operacion](numeroInput.val());
            numeroInput.val(resultado);
	}
	function botonOperador(){

    	var nuevaOperacion = $(this).attr('id');
        concatenarNumero = false;
        
        if(nuevaOperacion === 'limpiar')
        	return clear();

        if(nuevaOperacion === 'igual' && operacion)
        	igual();

        if(nuevaOperacion != 'igual')
            operacion = nuevaOperacion;
	}
	
	function botonNumero(){

    	var numero = $(this).html();
        if(concatenarNumero){
            numero = parseInt(numeroInput.val() + numero, 10);            
        }
        concatenarNumero = true;
        numeroInput.val(numero);
        
        if(!operacion){
            calculadora.asignarValor(numero); 
        }
	}

	function clear(){
        numeroInput.val(calculadora.clear());
        concatenarNumero = true;
        operacion = null;
    }
	//atributo de boton  $($0).data().operacion; valor del attr data-opera
	// $($0). elmento que esta seleccionado
})