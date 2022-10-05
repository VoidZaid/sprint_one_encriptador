// let array_words = ["ORACLE", "ONE", "ALURA", "JAVASCRIPT", "CSS"];
let array_words = ["ALURA", "JAVASCRIPT", "CSS"];
let secret_word= getRandomWord(array_words);

let canvas = document.querySelector('#canvas');
let brush = canvas.getContext("2d");
let btn_new_game = document.getElementById('new-game');

function getRandomWord(arr){
    let arr_len= Math.floor(Math.random()*arr.length);
    return arr[arr_len];
};


function changeStrokeStyle(colorStroke){
    brush.strokeStyle = colorStroke;
}
function changeLineWidth(lineWidth = 4){
    brush.lineWidth = lineWidth;
}
function changeFillColor(color = "#333"){
    brush.fillStyle = color;
}
function drawRectangle(axisX,axisY,x,y){
    brush.fillRect(axisX,axisY,x,y);
}
function drawCircle(axisX,axisY,radio){
    brush.beginPath();
    brush.arc(axisX,axisY,radio,0,2*Math.PI);
    brush.stroke();
    brush.closePath();
}
function drawLine(axisX,axisY,x,y){
    brush.beginPath();
    brush.moveTo(axisX,axisY);
    brush.lineTo(x,y);
    brush.stroke();
    brush.closePath();
}
function drawLetters(axisX,axisY,text,fontSize,color = "#aaa"){
    brush.font = fontSize+"px Arial";
    brush.fillStyle = color;
    brush.fillText(text,axisX,axisY);
}
function drawHangmanCanvas(){
    // ESTILOS DE LA LINEA, TRAZOS Y VERTICES REDONDEADOS
    brush.lineWidth = 8;
    brush.lineCap = "round";
    brush.lineJoin = "round";
    // PINTAMOS EL RECT DEL CANVAS
    brush.fillStyle = "#333";
    brush.fillRect(0,0,1000,500);
    // DIBUJAMOS EL ESTADO INICIAL DE HANGMAN
    brush.strokeStyle = "#aaa";
    brush.beginPath();
    brush.moveTo(400,250);
    brush.lineTo(600,250);
    brush.moveTo(450,250);
    brush.lineTo(450,50);
    brush.lineTo(540,50);
    brush.lineTo(540,75);
    brush.stroke();
    brush.closePath();
}
function drawUnderlinesLetters(axisX,axisY,longLine=0, colorStroke="#333"){
    brush.lineWidth = 4;
    brush.strokeStyle = colorStroke;
    brush.beginPath();
    brush.moveTo(axisX,axisY);
    brush.lineTo(axisX+longLine,axisY);
    brush.stroke();
    brush.closePath();
}
function keyValidation(keyCode){
    // console.log(keyCode);
    let valSpecialChar = keyCode==192? 209: keyCode;
    if((valSpecialChar >= 65 && valSpecialChar<=90)||valSpecialChar ==209){
        return String.fromCharCode(valSpecialChar);
    }else if(valSpecialChar>=48 && valSpecialChar<=57){
        return String.fromCharCode(valSpecialChar);
    }else if(valSpecialChar>=96&&valSpecialChar<=105){
        return String.fromCharCode(valSpecialChar-48);//fromCharCode no es fiable, le restamos 48 para que alcance al codigo de los numeros que no estan en el TECLADO-NUMERICO
    }
    return null;
}
function drawSpaceWord(){
    let colorStroke;
    let widthLineWord = 50;
    let widthSpace = 10;
    let calcMiddle = 1000/2-(secret_word.length*(widthLineWord+widthSpace)-widthSpace)/2;
    drawHangmanCanvas();
    drawLetters(620,130,"INTENTOS",20,"darkcyan");
    drawLetters(620,155,"RESTANTES:",20,"darkcyan");
    drawLetters(750,155,"4",60,"darkcyan");
    console.log(secret_word);
    for(let i=0; i < secret_word.length; i++){
        secret_word[i]==" "? colorStroke="#333": colorStroke ="#aaa";//spacios en blanco
        drawUnderlinesLetters(calcMiddle, 350, widthLineWord, colorStroke);
        calcMiddle= calcMiddle+widthSpace+widthLineWord;
    }
}

let arrFails = [];
let arrPressed = [];//capramos las letras ya dibujadas
let contWritedLetters = 0;
//variables recicladas de drawSpaceWord
let widthLineWord = 60;
let calcMiddle = 1000/2-(secret_word.length*widthLineWord)/2;
let calcMiddleFails;

function funcTT(e){
    let charConverted = keyValidation(e.keyCode);
    if(!arrPressed.includes(charConverted) && secret_word.includes(charConverted)){//calidamos letras ya dibujadas y que sean parte de la palabra secreta
        arrPressed.push(charConverted);
        console.log(arrPressed);
        for (let i = 0; i < secret_word.length; i++) {
            secret_word[i]==" "?i++:"";
            if(secret_word[i]==charConverted ){
                drawLetters(10+calcMiddle+(widthLineWord*i),340,charConverted,55);
                contWritedLetters++;//se contara la letra cuantas veces sea dibujado
                console.log(contWritedLetters);
                if(secret_word.length==contWritedLetters){
                    brush.clearRect(620,110,200,100);
                    drawLetters(620,120,"FELICIDADES!!!",30,"darkcyan");
                    drawLetters(620,155,"HAS GANADO",23,"darkcyan");
                    menu_start_game.removeEventListener("keydown",funcTT);
                    btn_new_game.removeEventListener("keydown",funcTT);
                }
            }
        }
    }
    
    if(charConverted!=null && !secret_word.includes(charConverted) && !arrFails.includes(charConverted)){
        arrFails.push(charConverted);
        // console.log(arrFails);
        brush.clearRect(100,360,800,35);
        // DIBUJAMOS LAS LETRAS ERRADAS QUE NO SE REPITEN
        for(let i = 0; i<arrFails.length; i++){
            let widthLineFails = 40;
            calcMiddleFails = 1000/2-(arrFails.length*widthLineFails)/2;
            calcMiddleFails = calcMiddleFails + widthLineFails;
            drawLetters(calcMiddleFails+(widthLineFails*i)-widthLineFails,390,arrFails[i],20);
        }
        // HACEMOS QUE AVANCE EL DIBUJO DEL AHORCADO
        if(arrFails.length == 1){
            changeLineWidth(2);
            drawLine(535,108,545,108);
            changeLineWidth(1);
            drawLine(530,92,536,98);
            drawLine(536,92,530,98);
            drawLine(544,92,550,98);
            drawLine(550,92,544,98);
            changeLineWidth(2);
            drawCircle(540,98,20);
            
            brush.clearRect(750,105,50,50);
            drawLetters(750,155,"3",60,"darkcyan");
        }else if(arrFails.length == 2){
            drawLine(540,118,540,190);

            brush.clearRect(750,105,50,50);
            drawLetters(750,155,"2",60,"darkcyan");
        }else if(arrFails.length == 3){
            drawLine(540,120,515,150);
            drawLine(540,120,565,150);
            
            brush.clearRect(750,105,50,50);
            drawLetters(750,155,"1",60,"darkcyan");
        }else if(arrFails.length == 4){
            drawLine(540,190,515,220);
            drawLine(540,190,565,220);
            
            brush.clearRect(620,110,200,100);
            drawLetters(620,120,"PERDISTE!!!",30,"darkcyan");
            drawLetters(620,155,"HAS FALLADO TODOS",23,"darkcyan");
            drawLetters(620,185,"TUS INTENTOS",23,"darkcyan");
            // REMOVEMOS EL EVENTO Y AVISAMOS QUE USO TODOS LOS INTENTOS
            menu_start_game.removeEventListener("keydown",funcTT);
            btn_new_game.removeEventListener("keydown",funcTT);
        }
    }
}

function restart(){
    secret_word= getRandomWord(array_words);
    calcMiddle = 1000/2-(secret_word.length*widthLineWord)/2;
    arrFails = [];
    arrPressed = [];
    contWritedLetters = 0;
    calcMiddleFails = 0;
    brush.clearRect(0,0,canvas.width,canvas.height);
    drawSpaceWord();
    menu_start_game.addEventListener("keydown",funcTT);
}
drawSpaceWord();
menu_start_game.addEventListener("keydown",funcTT);
button_start_game.addEventListener("click", restart);
btn_new_game.addEventListener("click", restart);
