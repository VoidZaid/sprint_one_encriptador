let boton_menu = document.querySelector("#button-menu");
let anchors = document.querySelector("#anchors-proyects");
let bgMenu = document.getElementById("dark-bg-menu");

boton_menu.addEventListener('click', showMenu);
bgMenu.addEventListener('click', hideMenu);

function showMenu(){
    anchors.style.right = "0px";
    bgMenu.style.display = "block";
}
function hideMenu(){
    anchors.style.right = "-400px";
    bgMenu.style.display = "none"
}