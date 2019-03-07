var pintado = false;
letraSelec = null;
letraActual = "m";

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

function show() {
    $('#flopi').click(function () {
        ayuda = $("#ayuda").removeClass();
    });
}

function enmarcar(event) {
    selec = event.target;
    console.log(selec);
    if (pintado == false) {
        selec.className += " cambiarBorde";
        pintado = true;
        letraSelec = selec.id;

    } else {
        $('.cambiarBorde').removeClass("cambiarBorde");
        selec.className += " cambiarBorde";
        letraSelec = selec.id;

    }
}

/*Cartelito*/

function confirmar() {
    playA('sonidos/ganaste.wav');
    alertify.confirm("<img src='../img/feliz.jpg'> <p>Buen trabajo! <b>Acertaste!</b> <br> Seguimos jugando?", function (e) {
        if (e) {
            alertify.success("ELEGISTE '" + alertify.labels.ok + "'");
            setTimeout(function () {
                window.location.href = '../html/felicidades.html'; //Pasa al siguiente juego
            }, 1300);
        } else {
            alertify.error("ELEGISTE '" + alertify.labels.cancel + "'");
            confirmSalida();
        }
    });
    return false
}

function alerta() {
    //un alert
    playA('sonidos/error.wav');
    alertify.alert("<img src='../img/triste.jpg'><b>Ups! Te equivocaste</b> Segui intentando!", function () {
        //aqui introducimos lo que haremos tras cerrar la alerta.
    });
}

function comprobar() {
    pintado = false;
    $('.cambiarBorde').removeClass("cambiarBorde"); //la imagen seleccionada se despinta

    if (letraSelec == letraActual) {
        confirmar();
    } else {
        alerta();
    }
}