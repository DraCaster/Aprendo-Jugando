var pintado = false; // En el juego , si se selecciona una imagen esta var se pone en true
var letraSelec = null;
var level = 1; // Nivel del juego
var letraActual = "u";
var letraActual2 = "o";
var letraActual3 = "m";
var selec;

var arregloSeleccion = [];

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

/*Selecciona con color una imagen elegida, y comprueba que 
no haya otra seleccionada, en ese caso, la despinta, y pinta la nueva */
function enmarcarMas(event) {
    selec = event.target;
    console.log(selec);
    if (arregloSeleccion.length <= 3) {
        var objecto = {
            id: selec.id,
            dato: $('#' + selec.id).data("valor")
        }
        if (estaEnArreglo(arregloSeleccion, objecto.dato)) {
            eliminarDato(arregloSeleccion, objecto.dato)
            $('#' + selec.id).removeClass("zoom");
            $('#' + selec.id).removeClass("cambiarBorde");
        } else {
            if (arregloSeleccion.length < 3) {
                selec.className += " zoom";
                selec.className += " cambiarBorde";

                arregloSeleccion.push(objecto);
            }
        }
        console.log(arregloSeleccion);
    }

}
function eliminarDato(arreglo, dato) {
    arreglo.forEach(function (elemento, array) {
        if (elemento.dato == dato) {
            arreglo.splice(arreglo.indexOf(elemento), 1)
        }
    });
}
function estaEnArreglo(arreglo, dato) {
    res = false;
    arreglo.forEach(function (elemento, array) {
        if (elemento.dato == dato) {
            res = true;
        }
    });
    return res;
}

/*Cartelito*/

function confirmar() {
    playA('sonidos/ganaste.wav');
    alertify.confirm("<img src='../img/feliz.jpg'> <p>Buen trabajo! <b>Acertaste!</b> <br> Seguimos jugando?", function (e) {
        if (e) {
            alertify.success("ELEGISTE '" + alertify.labels.ok + "'");
            setTimeout(function () {
                window.location.href = '../html/n1j6.html'; //Pasa al siguiente juego
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

function faltanimg() {
    playA('sonidos/error.wav');
    alertify.alert("<img src='../img/triste.jpg'><b>Ups!</b> Algo no esta bien", function () {
        //aqui introducimos lo que haremos tras cerrar la alerta.
    });
}


function comprobarJ5() {

    if (arregloSeleccion.length == 3) {
        var res = true;
        arregloSeleccion.forEach(function (elemento, array) {
            if (elemento.dato[0] != 'a') {
                res = false;
            }
        });
        if (res) {
            level++;
            confirmar();
        } else {
            alerta();
        }
    } else {
        faltanimg();

    }
}

