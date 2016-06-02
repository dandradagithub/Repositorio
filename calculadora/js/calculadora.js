$(function(){

	var $form = $('form'),

	operacionInput = $form.find('#operacion'),
	operacion_valor = operacionInput.val(),
	operacion_valor = 0,
	operando = 0,
	operandouno = 0,
	op,

	unoBoton = $form.find('#uno'),
	dosBoton = $form.find('#dos'),
	tresBoton = $form.find('#tres'),

	sumarBoton = $form.find('#sumar'),
	restarBoton = $form.find('#restar'),
	multiplicarBoton = $form.find('#multiplicar'),
	dividirBoton = $form.find('#dividir'),

	igualBoton = $form.find('#igual'),
	limpiarBoton = $form.find('#limpiar');


	igualBoton.on('click', igual);
	unoBoton.on('click', uno);
	dosBoton.on('click', dos);
	tresBoton.on('click', tres);

	sumarBoton.on('click', operar);
	restarBoton.on('click', operar);
	multiplicarBoton.on('click', operar);
	dividirBoton.on('click', operar);
	limpiarBoton.on('click', limpiar);

	$('form').on('click', '.operador', capturarBoton);

	function capturarBoton(){
		op = $(this).attr('id');
    	console.log(op);
	}

	function uno(){
		operando = 1;
		$('#operacion').val(1);
	}
	function dos(){
		operando = 2;
		$('#operacion').val(2);
	}
	function tres(){ 
		operando = 3;
		$('#operacion').val(3);
	}

	function operar(){
		operandouno = operando;
	}

	function limpiar(){
		operandouno = 0;
		operando = 0;
		$('#operacion').val(0);
	}

	function igual(){
		console.log(op);

		if(op === 'sumar')
		{
			$('#operacion').val(operandouno + operando);
		}
		else{

				if(op === 'restar')
				{
					$('#operacion').val(operandouno - operando);
				}
				else{
						if(op === 'multiplicar')
						{
							$('#operacion').val(operandouno * operando);
						}
						else{
							$('#operacion').val(operandouno / operando);
						}
					}
			}
	}
})