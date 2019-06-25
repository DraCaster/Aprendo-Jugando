var ganador = new Audio("../sonidos/sonidoganador.ogg");

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

function ayuda(){
     setTimeout(function() {
        alertify.alert("<img src='../img/ayudaw.png'> ");}, 1300);
      }
