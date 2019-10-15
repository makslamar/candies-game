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
     //col-1
    if ((columnas[0]==columnas[1]) && (columnas[1]==columnas[2])){}
    //modifique llenarTablero poniedo el id que se incrementa ++, ahora la idea es usar el id para modificar la imagen de dulce cuando hay 3 iguales en cada if
    if ((columnas[1]==columnas[2]) && (columnas[2]==columnas[3])){}
    if ((columnas[2]==columnas[3]) && (columnas[3]==columnas[4])){}
    if ((columnas[3]==columnas[4]) && (columnas[4]==columnas[5])){}
    if ((columnas[4]==columnas[5]) && (columnas[5]==columnas[6])){}
    //col-2
    if ((columnas[7]==columnas[8]) && (columnas[8]==columnas[9])){}
    if ((columnas[8]==columnas[9]) && (columnas[9]==columnas[10])){}
    if ((columnas[9]==columnas[10]) && (columnas[10]==columnas[11])){}
    if ((columnas[10]==columnas[11]) && (columnas[11]==columnas[12])){}
    if ((columnas[11]==columnas[12]) && (columnas[12]==columnas[13])){}
    //col-3
    if ((columnas[14]==columnas[15]) && (columnas[15]==columnas[16])){}
    if ((columnas[15]==columnas[16]) && (columnas[16]==columnas[17])){}
    if ((columnas[16]==columnas[17]) && (columnas[17]==columnas[18])){}
    if ((columnas[17]==columnas[18]) && (columnas[18]==columnas[19])){}
    if ((columnas[18]==columnas[19]) && (columnas[19]==columnas[20])){}
    //col-4
    if ((columnas[21]==columnas[22]) && (columnas[22]==columnas[23])){}
    if ((columnas[22]==columnas[23]) && (columnas[23]==columnas[24])){}
    if ((columnas[23]==columnas[24]) && (columnas[24]==columnas[25])){}
    if ((columnas[24]==columnas[25]) && (columnas[25]==columnas[26])){}
    if ((columnas[25]==columnas[26]) && (columnas[26]==columnas[27])){}
    //col-5
    if ((columnas[28]==columnas[29]) && (columnas[29]==columnas[30])){}
    if ((columnas[29]==columnas[30]) && (columnas[30]==columnas[31])){}
    if ((columnas[30]==columnas[31]) && (columnas[31]==columnas[32])){}
    if ((columnas[31]==columnas[32]) && (columnas[32]==columnas[33])){}
    if ((columnas[32]==columnas[33]) && (columnas[33]==columnas[34])){}
    //col-6
    if ((columnas[35]==columnas[36]) && (columnas[36]==columnas[37])){}
    if ((columnas[36]==columnas[37]) && (columnas[37]==columnas[38])){}
    if ((columnas[37]==columnas[38]) && (columnas[38]==columnas[39])){}
    if ((columnas[38]==columnas[39]) && (columnas[39]==columnas[40])){}
    if ((columnas[39]==columnas[40]) && (columnas[40]==columnas[41])){}
    //col-7
    if ((columnas[42]==columnas[43]) && (columnas[43]==columnas[44])){}
    if ((columnas[43]==columnas[44]) && (columnas[44]==columnas[45])){}
    if ((columnas[44]==columnas[45]) && (columnas[45]==columnas[46])){}
    if ((columnas[45]==columnas[46]) && (columnas[46]==columnas[47])){}
    if ((columnas[46]==columnas[47]) && (columnas[47]==columnas[48])){}

};
