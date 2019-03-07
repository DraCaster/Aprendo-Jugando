var pintado = false;
var selec;
var elegida = '';
var borrar = '';

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

function cargar(event){
     var sel = event.target;
    document.getElementById(sel.id).src = "../img/niveles/" + elegida;
    var imagen = document.getElementById(borrar);   
    padre = imagen.parentNode;
    padre.removeChild(imagen);
}

function checkTable(letra) {
    var tabla = $('#' + letra);
    var items = tabla.children('tbody').children('tr').find('img');
    console.log(items.length);
    res = {
        valor: true,
        msj: 'Buen trabajo! Pasas al siguiente nivel.'
    };
    if (items.length == 4) {
        items.each(function () {
            if ($(this).attr('id')[0] != letra) {
                res.valor = false;
                res.msj = 'Ups, Algo esta tiene que ir del otro lado';
            }
        });
    } else {
    res.valor = false;
        res.msj = 'Te falta completar alguna fila'
    }
    return res;
}

/*Cartelito*/

function confirmar() {
    plaayA('sonidos/ganaste.wav');
    alertify.confirm("<img src='../img/feliz.jpg'> <p>Buen trabajo! <b>Acertaste!</b> <br> Seguimos jugando?", function (e) {
        if (e) {
            alertify.success("ELEGISTE '" + alertify.labels.ok + "'");
            setTimeout(function () {
                window.location.href = '../html/n1j4.html'; //Pasa al siguiente juego
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
function enmarcar(event) {
    selec = event.target;
    elegida = selec.dataset.valor;
    borrar = selec.id;
    if (pintado == false) {
        selec.className += " cambiarBorde";
        pintado = true;
    } else {
        $('.cambiarBorde').removeClass("cambiarBorde");
        selec.className += " cambiarBorde";
    }
}

function comprobarN1J8() {
    console.log(checkTable('e').valor);
    console.log(checkTable('i').valor);
    if (checkTable('e').valor & checkTable('i').valor) {
        confirmar();
    }
    else {
        alerta();
    }
}


