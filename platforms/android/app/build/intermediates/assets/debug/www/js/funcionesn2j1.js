// Juego 1
var selec = null;
var letraSelec = null;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
}
// Funcion para reproducir audio
function playA(s) {
    var src = getMediaURL(s);

    var myMedia = new Media(src,
        // success callback
        function () { console.log("playA():Audio Success"); },
        // error callback
        function (err) { console.log("playA():Audio Error: " + err); }
    );
    myMedia.play();
}
// Funcion para obtener la url del archivo (debes hacer esto para cualquier otro sonido a reproducir)
function getMediaURL(s) {
    if (device.platform.toLowerCase() === "android") {
        return "/android_asset/www/" + s;
    }
    return s;
}

function guardarValor() {
    $(".ui-widget-content").click(function (event) {
        selec = event.target;
        letraSelec = selec.id;
    })
}

/*Cartelito*/

function confirmar() {
    playA('sonidos/ganaste.wav');
    alertify.confirm("<img src='../img/feliz.jpg'> <p>Buen trabajo! <b>Acertaste!</b> <br> Seguimos jugando?", function (e) {
        if (e) {
            alertify.success("ELEGISTE '" + alertify.labels.ok + "'");
            setTimeout(function () {
                window.location.href = '../html/n1J8.html'; //Pasa al siguiente juego
            }, 1300);
        } else {
            alertify.error("ELEGISTE '" + alertify.labels.cancel + "'");
            confirmSalida();
        }
    });
    return false
}

function alerta() {
    playA('sonidos/error.wav');
    alertify.alert("<img src='../img/triste.jpg'><b>Ups! Te equivocaste</b> Segui intentando!", function () {
        //aqui introducimos lo que haremos tras cerrar la alerta.
    });
}

function sigue() {
    playA('sonidos/ganaste.wav');
    alertify.alert("<img src='../img/feliz.jpg'><b>Muy bien!</b> Sigamos!", function () {
        //aqui introducimos lo que haremos tras cerrar la alerta.
    });
}

function comprobar() {
    if (letraSelec == "i") { //primer actividad del juego
        sigue();
        letraSelec = "a"; //
        $('.ocultar').removeClass("ocultar"); //oculta la primer actividad
        $("#mostrar").addClass("ocultar"); //muestra la 2da actividad
    } else {
        if (letraSelec == "a") {
            confirmar();

        } else {
            alerta();
        }
    }
}