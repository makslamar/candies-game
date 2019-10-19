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


//Llenar tablero aleatoriamente, al precionar inicio o reinicio
//**var num;
//function llenarTablero(){
//$('div[class^="col"]').children().each(function(){
//          $(this).remove();
//  });
//  $('div[class^="col"]').each(function(){
//     for(var i=1; i<8; i++){
//         num = numerosAleatorios(1, 5);
//         $(this).append("<img class='elemento' src='image/" + num + ".png' width='100px' height='100px'>");
//     };
//  });
//}; **//

//solicita y entrega arreglos de dulces en las filas, para luego envialas a validardulces()
 /*function arrayDulcesColumnas() {
     for (var j = 0; j < 7; j++) {
         var dulcescolumna = getDulcesArreglo('columna', j);
         var dulceComparar = dulcescolumna.eq(0);
         validadulces(dulcescolumna, dulceComparar);
     }
 }
//solicita y entrega arreglos de dulces en las filas, para luego envialas a validardulces()
 function arrayDulcesFilas() {
       for (var j = 0; j < 7; j++) {
           var dulcesfila = getDulcesArreglo('fila', j);
           var dulceComparar = dulcesfila[0];
           validadulces(dulcesfila, dulceComparar);
       }
   }

   //retorna arreglos con los elementos de las columnas y las filas
      function getDulcesArreglo(arrayType, index) {
          var columna1 = $('.col-1').children();
          var columna2 = $('.col-2').children();
          var columna3 = $('.col-3').children();
          var columna4 = $('.col-4').children();
          var columna5 = $('.col-5').children();
          var columna6 = $('.col-6').children();
          var columna7 = $('.col-7').children();
          switch (arrayType) {
              case 'columna':
                  var dulcescolumnas =
                      $([
                          columna1,
                          columna2,
                          columna3,
                          columna4,
                          columna5,
                          columna6,
                          columna7
                      ]);
                  return dulcescolumnas[index];
              case 'fila':
                  var dulcesfila =
                      $([
                          columna1.eq(index),
                          columna2.eq(index),
                          columna3.eq(index),
                          columna4.eq(index),
                          columna5.eq(index),
                          columna6.eq(index),
                          columna7.eq(index)
                      ]);
                  return dulcesfila;
          }
      };*/

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

      /* for (var i = 1; i < dulces.length; i++) {
           var srcDulceComparar = $(dulceComparar).attr('src');
           var srcDulce = $(dulces[i]).attr('src');
           if (srcDulceComparar != srcDulce) {
               if (posicionesDulces.length < 3) {
                   posicionesDulces = [];
                   contador = 0;
               }
           }else  {
                   if (contador == 0) {
                       posicionesDulces.push(i - 1);
                      }
                   posicionesDulces.push(i);
                   contador += 1;
                 };
           dulceComparar = dulces[i];
       };
       if (posicionesDulces.length <= 2) { /* si hay 2 o menos dulces juntos vacia las posiciones de dulces a eliminar */
      //     posicionesDulces = [];
    //  };
    //   if (posicionesDulces.length >= 3) { /* si hay 3 o mas dulces juntos los enviara a eliminar en la funcion eliminaDulces*/
    //       dulcesRemove(posicionesDulces, dulces);
    //   };
   };

   //pone la clase eliminar a las <img>, esta clase identificara los elementos trio-iguales para ser borradas

   /*function dulcesRemove(posicionesDulces, dulces) {
        for (var i = 0; i < posicionesDulces.length; i++) {
            $(dulces[posicionesDulces[i]]).addClass("eliminar");
        }
    };*/
