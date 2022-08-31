var entrada = document.querySelector("#entrada");
// console.log(entrada.value);
var encriptar = document.querySelector("#encriptar");
var desencriptar = document.querySelector("#desencriptar");
// menus para mostrar y ocultar
var noMenu = document.querySelector(".cuadro-no-menu");
var textoEncriptado = document.querySelector(".texto-encriptado");
var botonCopiar = document.querySelector("#boton-copiar");

var salidaTexto = document.querySelector("#salida");
// ocultarElemento(textoEncriptado);


function ocultarElemento(elemento){
    elemento.style.display = "none";
}
function mostrarElemento(elemento){
    elemento.style.display = "block";
}
function encriptarMensaje(mensaje){
    var lowerMensaje = mensaje.toLowerCase();
    var retorno = "";
    for(let i = 0; i < lowerMensaje.length; i++){
        var arrVocales = ["a", "e", "i", "o", "u"];
        var arrEncriptado =["i","nter","mes","ber","fat"];
        var vocal = "";
        for(let j = 0; j < arrVocales.length; j++){
            // console.log(j);
            if(lowerMensaje[i] == arrVocales[j]){
                vocal = arrEncriptado[j];
                break;//importante para que no cambie el valor de Vocal en las siguientes iteraciones
            }else{
                vocal= "";
            }
        }
        // console.log(i);
        retorno = retorno + lowerMensaje[i] + vocal; 
    }
    return retorno;
}
function desencriptarMensaje(mensaje){
    var lowerMensaje = mensaje.toLowerCase();
    var retorno = "";
    for(let i = 0; i < lowerMensaje.length; i++){
        retorno = retorno + lowerMensaje[i];
        // console.log(i);
        var arrVocales = ["a", "e", "i", "o", "u"];
        var arrEncriptado =["i","nter","mes","ber","fat"];

        var palabraEncriptada = "";
        for(let j = 0; j < arrVocales.length; j++){
            // console.log(j);
            if(lowerMensaje[i] == arrVocales[j]){//revisa si es una vocal
                palabraEncriptada = lowerMensaje.slice(i+1,i+arrEncriptado[j].length+1);//cuanta a partir de la vocal +1 hasta el largo del texto encriptado que le corresponde segun arrEncriptado +1 ya que alice no cuenta el ultimo entonces tenemos q aumentar uno ams
                if(arrEncriptado[j] == palabraEncriptada){
                    i=i + arrEncriptado[j].length;//salta lo espacios que estan encriptados.
                    break;
                }
                console.log(arrEncriptado[j]+"<encriptado>");
                console.log(palabraEncriptada + "<br>");
            }
        }
    }
    console.log(retorno); 
    return retorno;
}
function obtenerTextoEncriptado(){
    var valorEntrada = entrada.value;
    if(valorEntrada != ""){
        mostrarElemento(textoEncriptado);
        ocultarElemento(noMenu);
    }
    var entradaEncriptada = encriptarMensaje(valorEntrada);
    salidaTexto.value = entradaEncriptada;
}
function obtenerTextoDesencriptado(){
    var valorEntrada = entrada.value;
    if(valorEntrada != ""){
        mostrarElemento(textoEncriptado);
        ocultarElemento(noMenu);
    }
    var entradaDesencriptada = desencriptarMensaje(valorEntrada);
    salidaTexto.value = entradaDesencriptada;
}
function copiarPortaPapeles() {

    var contenido = document.getElementById('salida');
    
    contenido.select();//selecciona todo el valor del elemento
    document.execCommand("copy");//copia todos los elementos seleccionados
}

encriptar.onclick = obtenerTextoEncriptado;
desencriptar.onclick = obtenerTextoDesencriptado;
botonCopiar.onclick = copiarPortaPapeles;