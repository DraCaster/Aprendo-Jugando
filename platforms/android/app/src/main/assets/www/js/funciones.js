
var cantImgE = 0;
var cantImgI = 0; //nivel 1 juego 3

function ingresar(val){
    setTimeout(function(){
    window.location.href=val;
}, 300);}

function confirmSalida() {
    alertify.success("<img src='../img/tinisaliendo.png'> SALIENDO... ");
    setTimeout(function() {
                window.location.href = '../index.html';
            }, 1300);
}