// cuando la pag este cargado y se haga clic, se envian los datos
$(function(){

	// seleccionamos un elemento como en css -> $("form input[type=text]")
	/*$("form input[type=text]").on("click", onClick)

	function onClick(){}*/

	$(function(){ /* $(function(){ usar uno por pagina */

			$("#primero").css({"background-color":"blue", "color":"yellow"});
			$(".segundo").css({"background-color":"white", "color":"red"});
			$(".menu li:eq(2)").remove(); // tercer elemento li

			/* .on('evento', callback) setear evento
				
				obtener valor del atributo
				.attr('nombre del atributo')

				obtener el html del tag
				.html()

				setear html
				.html(valor)

				.empty() borra lo que hay dentro
			*/

		});
});