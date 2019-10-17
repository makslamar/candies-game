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
                 num=0;
                 llenarTablero();
                 //validarDulcesIguales();
           });
    });
});



// Numeros aleatorios para poner los dulces
function numerosAleatorios(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


//Llenar tablero aleatoriamente, al precionar inicio o reinicio
var num;
function llenarTablero(){
  $('div[class^="col"]').children().each(function(){
          $(this).remove();
  });
  $('div[class^="col"]').each(function(){
     for(var i=1; i<8; i++){
         num = numerosAleatorios(1, 5);
         $(this).append("<img class='elemento' src='image/" + num + ".png'>");
     };
  });
};

// Valida los dulces iguales en trio
