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
                 //num=0;
                 $('div[class^="col"]').children().each(function(){$(this).remove()}); //reinicia, borrando los <img> en el tablero
                 llenar();
                 arrayDulcesColumnas();
                 arrayDulcesFilas();
                 $('img.eliminar').remove();
           });
    });
    //llenar();
});



var columnas = $(".panel-tablero div");
const cantidaddulces = 7;

function llenar() {
    for (var i = 0; i < columnas.length; i++) {
        var cantidad = $(columnas[i]).children().length;
        for (var j = 0; j < cantidaddulces - cantidad; j++) {
            num = numerosAleatorios(1, 5);
            $("<img src='image/" + num + ".png' class='elemento' width='100px' height='100px'>").prependTo(columnas[i]);
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
 function arrayDulcesColumnas() {
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
      };

   //valida si hay dulces iguales y los elimina
   function validadulces(dulces, dulceComparar) {
       var contador = 0;
       var posicionesDulces = [];
       for (var i = 1; i < dulces.length; i++) {
           var srcDulceComparar = $(dulceComparar).attr('src');
           var srcDulce = $(dulces[i]).attr('src');
           if (srcDulceComparar != srcDulce) {
               if (posicionesDulces.length < 3) {
                   posicionesDulces = [];
                   contador = 0;
               }
           } else {
               if (contador == 0) {
                   posicionesDulces.push(i - 1);
               }
               posicionesDulces.push(i);
               contador += 1;
           }
           dulceComparar = dulces[i];
       }
       if (posicionesDulces.length <= 2) { /* si hay 2 o menos dulces juntos vacia las posiciones de dulces a eliminar */
           posicionesDulces = [];
       }
       if (posicionesDulces.length >= 3) { /* si hay 3 o mas dulces juntos los enviara a eliminar en la funcion eliminaDulces*/
           eliminaDulces(posicionesDulces, dulces);
       }
   };

   //pone la clase eliminar a las <img>, esta clase identificara los elementos trio-iguales para ser borradas
   function eliminaDulces(posicionesDulces, dulces) {
        for (var i = 0; i < posicionesDulces.length; i++) {
            $(dulces[posicionesDulces[i]]).addClass("eliminar");
        }
    };
