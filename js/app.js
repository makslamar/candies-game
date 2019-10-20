$(function(){
    $(document).ready(function(){
        colorTituloA();
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


           $(".btn-reinicio").click(function(){
                 //var columnas = [];
                 var contadorStarterTime=0;
                 $('.timer').startTimer({
                      onComplete: function(){
                           console.log('Complete');
                      }
                 });
                 var velocidadLLenado=0;
                 puntuacion=0;
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
           });
    });
});



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
                                        $(this).css({position: 'unset'});
                                        siguienteDulce = true;
                                        j++;
                                    }
                                 });

        };
    };
};


// Numeros aleatorios para poner los dulces
function numerosAleatorios(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


   //valida si hay dulces iguales y los elimina
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
