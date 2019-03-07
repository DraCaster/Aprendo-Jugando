//nivel 1 juego 4
var cantImg = 0;
var cantImgIncorrectas = 0;

/*Nivel 1 juego 4*/

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

function enmarcar(event) {
    imgSelec = event.target;
    if (imgSelec.dataset.marca == "no") { //si no se le hizo click
        imgSelec.dataset.marca = "si";
        document.getElementById(imgSelec.id).src = '../img/niveles/' + imgSelec.id;
        if (imgSelec.dataset.valor == "e") { //si le hice click a una imagen que empieza con e
            cantImg++; //sumo la cantidad de imagenes con la e
        }
        else {
            cantImgIncorrectas++;
        }
    }
    else { //si se le hizo click anteriormente
        imgSelec.dataset.marca = "no"; //se desmarca
        document.getElementById(imgSelec.id).src = '../img/lupa.png';
        if (imgSelec.id == "e") {
            cantImg--; //se resta porque se deselecciono
        }
        else {
            cantImgIncorrectas--;
        }
    }
}

/*Cartelito*/

function confirmar() {
    playA('sonidos/ganaste.wav');
    alertify.confirm("<img src='../img/feliz.jpg'> <p>Buen trabajo! <b>Acertaste!</b> <br> Seguimos jugando?", function (e) {
        if (e) {
            playA('sonidos/selec.wav');
            alertify.success("ELEGISTE '" + alertify.labels.ok + "'");
            setTimeout(function () {
                window.location.href = '../html/n1j5.html'; //Pasa al siguiente juego
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

function faltan() {
    playA('sonidos/error.wav');
    alertify.alert("<img src='../img/triste.jpg'><b>Ups! Faltan imagenes</b>", function () {
        //aqui introducimos lo que haremos tras cerrar la alerta.
    });
}

function ceroimg() {
    playA('sonidos/error.wav');
    alertify.alert("<img src='../img/triste.jpg'><b>No elegiste ninguna</b>", function () {
        //aqui introducimos lo que haremos tras cerrar la alerta.
    });
}

function comprobar() {
    if (cantImg == 2 & cantImgIncorrectas == 0) {
        confirmar();
    } else if (cantImg == 0 & cantImgIncorrectas == 0) {
        ceroimg();
    } else if (cantImg != 0 & cantImg < 2 & cantImgIncorrectas == 0) {
        faltan();
    } else {
        alerta();
    }
}