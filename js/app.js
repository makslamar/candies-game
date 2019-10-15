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
                llenarTablero();
                columnas.lenght=0; //pone la matriz en cero al usar el boton
                cuadriculaDulce=0;
                validarImagenesColumnas();

           });
    });
});

var cuadriculaDulce;


// Numeros aleatorios para poner los dulces
function numerosAleatorios(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//Llenar tablero aleatoriamente, asigna id de cuadriculas de la matriz de dulces
//error: se llena debajo del contenedor de dulces, esto despues de implementar cuadriculaDulce. se recomienda usar window.reload() con un contador de clicks, carga dulces al rimer click, despues reinicia toda la ventana.
function llenarTablero(){
  $('div[class^="col"]').each(function(){
     for(var i=1; i<8; i++){
         num = numerosAleatorios(1, 5);
         $(this).append("<img class='elemento' src='image/" + num + ".png' id="+ cuadriculaDulce +">");
         cuadriculaDulce++;
     };
  });
};

//Para validar dulces, si tiene 3 dulces iguales. se apunta a los hijos de cada columna $('div[class^="col"]').children().each() y a cada hijo le consulta su src y lo pone al final del array
var columnas = new Array();
function validarImagenesColumnas(){
   $('div[class^="col"]').children().each(function(){
           columnas.push($(this).attr("src"));
   });
   console.log(columnas);
};
