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
                 $(".game-over").remove(); //quita aviso game over, antes de reiniciar
                 $(".panel-score").css("width", "25%");//regresa el panel score a su tamaño pequeño a la derecha
                 $(".panel-tablero").show("fade", 1000);//pone de nuevo el panel de dulces, al usar reiniciar
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
                       $('img.eliminar').hide('pulsate', 1100);
                     }, 1100);
                 setTimeout(function () {
                       $('img.eliminar').remove();
                     }, 2601);
                 setTimeout(function(){llenar(600);}, 2800);

                 setInterval(function(){
                     llenar(1);
                     validadulces();
                     setTimeout(function(){
                           $('img.eliminar').hide('pulsate', 1500);
                         }, 1500);
                     setTimeout(function () {
                           $('img.eliminar').remove();
                         }, 3101);
                     setTimeout(function(){llenar(600);}, 2800);
                 }, 3101);

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
        revert: true, //regresa el .elemento a su posicion original
        containment: ".panel-tablero",
        scroll: false, //apaga la barra scroll
        grid: [100, 100],
        snap: true,
        snapMode: "inner",
        revertDuration: 0,
        //snapTolerance: 30,
        stack: ".elemento",
        opacity: 0.66,
        /*start: function (event, ui) {
        },
        stop: function (event, ui) {
        },*/
    });
    $(".elemento").droppable({
        disabled: false,
        revert: true, //regresa los elementos dulces a su posicion original despues del intercambio de src
        containment: ".panel-tablero",
        grid: [100, 100],
        accept:".elemento",
        drop: function(event,ui){
            elementoDrop = $(this).attr("src");//se consulta el src de drop
            elementoDrag = $(ui.draggable).attr("src");//se consulta el src de drag
            movimientosCounter++; //se suman movimientos
            $("#movimientos-text").text(movimientosCounter);//muestra movimientos en tablero
            $(ui.draggable).attr("src", elementoDrop);//intercambia el src de drag y pone el de drop
            $(this).attr("src", elementoDrag);//intercambia el src de drop y pone el de drag
            validadulces();
            llenar(1);
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
                    setTimeout(function(){puntuacion++;},2000);//suma puntos
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
                    setTimeout(function(){puntuacion++;},2000);//suma puntos
                    $("#score-text").text(puntuacion);
                };
            };

        };


   };
