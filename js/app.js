$(function(){
    $(document).ready(function(){
        colorTituloA();
        //Animacion bucle para Titulo Neon
        function colorTituloA(){
              $(".main-titulo").animate({color:"#CB04FC"},
                                         500,
                                         colorTituloB);
        };
        function colorTituloB(){
              $(".main-titulo").animate({color:"#DCFF0E"},
                                         500,
                                         colorTituloA);
        };

           // Carga el juego al oprimir boton Inicio
           $(".btn-reinicio").click(function(){
                 $(".game-over").remove();
                 $(".panel-score").css("width", "25%");
                 $(".panel-tablero").show("fade", 1000);
                 $(".timer").children().remove(); //reinicia timer
                 $(".timer").remove(); //reinicia timer
                 $("#timer-titulo").append('<div class="timer data-info" data-seconds-left="120"></div>'); //inicia un timer nuevo
                 setTimeout(function(){
                     $('.timer').startTimer({
                          onComplete: function(){ //cuando termina el conteo de tiempo, ejecuta esta funcion
                               $(".panel-tablero").hide("fade", 1500);
                               setTimeout(function(){
                               $(".panel-score").animate({width:"100%"}, 1500);
                               $(".main-titulo").append('<h1 class="game-over">- GAME OVER -</h1>');
                             }, 1850);
                          }
                     });
                 }, 10);
                 var velocidadLLenado=0;
                 puntuacion=0;
                 movimientosCounter=0;
                 $("#movimientos-text").text(movimientosCounter); //reinicia contador
                 $('div[class^="col"]').children().each(function(){$(this).remove()}); //reinicia, borrando los <img> en el tablero
                 llenar(1);
                 validadulces();
                 setTimeout(function(){
                       $('img.eliminar').hide('pulsate', 1500);
                       }, 1500);
                 setTimeout(function () {
                       $('img.eliminar').remove();
                       }, 3001);
                 setTimeout(function(){llenar(600);}, 3200);

                 setInterval(function(){
                     llenar(1);
                     validadulces();
                     setTimeout(function(){
                           $('img.eliminar').hide('pulsate', 1500);
                         }, 1500);
                     setTimeout(function () {
                           $('img.eliminar').remove();
                           }, 3001);
                     setTimeout(function(){llenar(600);}, 3500);
                 }, 3530);

                $(".btn-reinicio").text("Reiniciar"); // Carmbia titulo del boton Inicio, por Reinicio
           });
    });
});


// Llena el tablero y animacion de los dulces
var elementoDrag = "";
var elementoDrop = "";
var movimientosCounter = 0;
var columnas = $(".panel-tablero div");
const cantidaddulces = 7;
var velocidadLLenado=0;
function llenar(velocidadLLenado) {
    for (var i = 0; i < columnas.length; i++) {
        var siguienteDulce = true;
        var cantidad = $(columnas[i]).children().length;
        for (var j = 0; j < cantidaddulces - cantidad; j++) {
            num = numerosAleatorios(1, 5);
            var dulce = $("<img src='image/" + num + ".png' class='elemento' width='100px' height='100px'>");
            dulce.css({display: 'none'}).prependTo(columnas[i]);
            var width = dulce.width();
            var height = dulce.height();
            dulce.css({
                        width: width,
                        height: height,
                        display: 'none',
                        top: '0px',
                        position: 'absolute'
                      }).delay(50 * j)
                        .fadeIn()
                        .animate({ top: ((cantidaddulces - cantidad - j - 1) * 100) + 'px'},
                                 { duration: velocidadLLenado,
                                   queue: true,
                                   complete: function(){
                                        $(this).addClass("displayed");
                                        $(this).css({ position: 'relative', top: 'unset' });
                                        siguienteDulce = true;
                                        j++;
                                    }
                                 });
        };
    };
    // Drag and Drop
    $(".elemento").draggable({
        disabled: false,
        revert: "invalid",
        containment: ".panel-tablero",
        scroll: false,
        //grid: [100, 100]
        /*start: function (event, ui) {

        },
        stop: function (event, ui) {
        },*/

    });
    $(".elemento").droppable({
        disabled: false,
        revert: "invalid",
        containment: ".panel-tablero",
        grid: [100, 100],
        accept:".elemento",
        drop: function(event,ui){
            elementoDrop = $(this);
            elementoDrag = $(ui.draggable);
            movimientosCounter++;
            $("#movimientos-text").text(movimientosCounter);

        }
     });
};


// Numeros aleatorios para poner los dulces
function numerosAleatorios(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


   //valida si hay dulces iguales y les pone la clase .eliminar, que seran borrados en $(".btn-reinicio").click(function())
   var puntuacion = 0;
   function validadulces() {
          for (var i = 1; i <= 7; i++) {
            for (var z = 0; z <= 6; z++) {
                /* Valida Columnas */
                var dulcec1 = $($('.col-' + [i]).find("img")[z]);
                var dulcec2 = $($('.col-' + [i]).find("img")[z + 1]);
                var dulcec3 = $($('.col-' + [i]).find("img")[z + 2]);
                if (dulcec1.attr('src') == dulcec2.attr('src') && dulcec2.attr('src') == dulcec3.attr('src')) {
                    dulcec1.addClass("eliminar");
                    dulcec2.addClass("eliminar");
                    dulcec3.addClass("eliminar");
                    puntuacion++;
                    $("#score-text").text(puntuacion);
                };
                /* Valida Filas */
                var dulcef1 = $($('.col-' + [i]).find("img")[z]);
                var dulcef2 = $($('.col-' + [i + 1]).find("img")[z]);
                var dulcef3 = $($('.col-' + [i + 2]).find("img")[z]);
                if (dulcef1.attr('src') == dulcef2.attr('src') && dulcef2.attr('src') == dulcef3.attr('src')) {
                    dulcef1.addClass("eliminar");
                    dulcef2.addClass("eliminar");
                    dulcef3.addClass("eliminar");
                    puntuacion++;
                    $("#score-text").text(puntuacion);
                };
            };

        };


   };
