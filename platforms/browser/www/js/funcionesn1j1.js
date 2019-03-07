var pintado = false; // En el juego , si se selecciona una imagen esta var se pone en true
var letraSelec = null;
var cantAct = 0;
var letraActual = "u";

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
function enmarcar(event) {
    selec = event.target;
    if (pintado == false) {
        selec.className += " cambiarBorde";
        pintado = true;
        letraSelec = selec.id;
        cantAct = cantAct + 1;
    } else {
        $('.cambiarBorde').removeClass("cambiarBorde");
        selec.className += " cambiarBorde";
        letraSelec = selec.id;
        cantAct = cantAct + 2;
    }
}


/*Cartelito*/



function confirmar() {
    playA('sonidos/ganaste.wav');
    alertify.confirm("<img src='../img/feliz.jpg'> <p>Buen trabajo! <b>Acertaste!</b> <br> Seguimos jugando?", function (e) {
        if (e) {
            alertify.success("ELEGISTE '" + alertify.labels.ok + "'");
            setTimeout(function () {
                window.location.href = '../html/n1j2.html'; //Pasa al siguiente juego
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

/* Verifica que la imagen seleccionada sea la correcta */
function comprobar() {
    pintado = false;
    $('.cambiarBorde').removeClass("cambiarBorde"); //la imagen seleccionada se despinta
    if (letraSelec == letraActual) {
        confirmar();
    } else {
        alerta();
    }
}

function ayuda() {
    jQuery.fn.tooltip = function () {
        xOffset = 10;
        yOffset = 0;
        this.each(function () {
            $(this).hover(function (e) {
                // Cogemos el valor del tag "title"
                this.t = this.title;
                // Ponemos el tag "title" del html vacio para que el navegador no 
                // muestre su tooltip estandard
                this.title = "";
                // Añadimos una p con el id="tooltip" para mostrar el texto
                $("body").append("<p id='tooltip'>" + this.t + "</p>");
                // Lo posicionamos cerca de la posición del ratón
                $("#tooltip")
                    .css("top", (e.pageY + yOffset) + "px")
                    .css("left", (e.pageX + xOffset) + "px")
                    .fadeIn();
            },
                function () {
                    // Funcion que se ejecuta cuando el raton deja de pasar por encima

                    // Volvemos a poner el titulo en el codigo html
                    this.title = this.t;
                    // eliminamos el id tooltip que hemos añadido al pasar por encima
                    $("#tooltip").remove();
                });

            // Funcion que se ejecuta cuando nos movemos por encima
            // Posiciona el tooltip justo al lado del mouse
            $(this).mousemove(function (e) {
                $("#tooltip")
                    .css("top", (e.pageY + yOffset) + "px")
                    .css("left", (e.pageX + xOffset) + "px");
            });
        });
        return this;
    };

    $(document).ready(function () {
        $(".globoAyuda").tooltip();
    });
}
