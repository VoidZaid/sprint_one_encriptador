// *********** BTN MENU PRINCIPAL**********
let button_start_game = document.querySelector('#start-game');
let button_add_words = document.querySelector('#add-new-words');
// ********** BTN MENU AGREGAR PALABRAS***********
let btn_cancel = document.querySelector('#btn-cancel');
// *********** BTN DE DESISTIR- MENU DE JUEGO************
let btn_desist = document.querySelector('#button-desist');
// *********** VISTAS ********************
let buttons_add_start = document.querySelector('#buttons-add-start');
let menu_start_game= document.querySelector('.menu-start-game'); 
let container_input_word = document.querySelector('.menu-add-words');

button_add_words.addEventListener("click",function(){
    buttons_add_start.style.display = "none";
    container_input_word.style.display = "block"
    // let inputNewWord = document.getElementById('input-word');
    inputWord.focus();
});
button_start_game.addEventListener('click', function(){
    buttons_add_start.style.display = "none";
    menu_start_game.style.display = "flex"
    menu_start_game.focus();
});
btn_cancel.addEventListener('click', function(){
    buttons_add_start.style.display = "block";
    container_input_word.style.display = "none"
});

btn_desist.addEventListener('click', function(){
    buttons_add_start.style.display = "block";
    menu_start_game.style.display = "none"
})


