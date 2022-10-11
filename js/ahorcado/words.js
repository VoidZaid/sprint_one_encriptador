const container_default_words = document.querySelector(".container-default-words");
const btnSaveWord = document.getElementById('btn-save-word');
const inputWord = document.getElementById('input-word');

let conId=0;
let word=[];

updateWords();

container_default_words.addEventListener('click', deleteWord);
btnSaveWord.addEventListener('click', addWord);
inputWord.addEventListener('keydown', function(e){
    e.preventDefault();//con esto evitamos que se agregue el valor al presionar la tecla y solo se agrega lo de " word+="
    console.log(e);
    let char = keyValidation(e.keyCode);
    console.log(char);

    if(e.keyCode == 8){
        // console.log("hola mundo");
        word.pop();
        inputWord.value=word.join("");
    }else if(e.keyCode == 32){
        word.push(" ");
        inputWord.value=word.join("");
    }else if(char != null){
        char.toUpperCase();
        word.push(char);
        inputWord.value=word.join("");
    }
})
function deleteWord(e){
    if(e.srcElement.nodeName == "SPAN"){
        container_default_words.removeChild(document.getElementById(e.srcElement.parentNode.id));
        let id=e.srcElement.parentElement.id;
        array_words.splice(id,1);
        // cada vez que se borre el elemento se actualizan los elementos pintados
        container_default_words.innerHTML=``;
        updateWords();
    }
}
function addWord(){
    let wordToAdd = inputWord.value;
    if(wordToAdd != ""){
        array_words.push(wordToAdd.toUpperCase());
        inputWord.value="";
        inputWord.focus();
        // cada que se agregue un elemento se actualiza la vista
        container_default_words.innerHTML=``;
        updateWords();
        console.log(array_words);
    }
    word=[];
}
function updateWords(){
    for(let i = 0; i < array_words.length; i++ ){
        container_default_words.innerHTML+=`
        <p class="word-element" id="${i}">
        ${array_words[i]}
            <span class="material-symbols-outlined word-element-icon">
                cancel
            </span>
        </p>`;
        conId++;
    }
}