var pintado = false;
var selec;
var tabla = ['null','null','null','null'];



function checkTable(letra) {
    var tabla = $('#' + letra);
    var items = tabla.children('tbody').children('tr').find('img');
    var cont = 0;
    var padre;
    var hijo;
    if(letra == 's0' || letra == 's1'){
        letra = 's';
    }
    if(letra == 'm0'){
        letra = 'm';
    }
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].dataset.letra != letra){
            hijo = document.createElement("div");
            hijo.className+="item";
            hijo.appendChild(items[i]);
            padre = document.getElementById('pos-'+items[i].dataset.pos);
            padre.appendChild(hijo);
        }
        if (items[i].dataset.letra == letra){
            cont++;
        }
    }

    //Le devuelvo la propiedad arrastrable a cada imagen
    $('.item').draggable({
                helper: 'clone'
                
            });

            $('.box-image').droppable({
                accept: '.item',
                hoverClass: 'hovering',
                drop: function(ev, ui) {
                    ui.draggable.detach();
                    $(this).append(ui.draggable);

                }
            });

   return (cont==2);
}

/*Cartelito*/

function confirmar(s) {
    playA('../sonidos/ganaste.wav');
    alertify.confirm("<img src='../img/feliz.jpg'> <h1><b>&iexcl; EXCELENTE ! <br>&iexcl; SIGAMOS JUGANDO ! </b></h1>", function(e) {
        if (e) {
            alertify.success("ELEGISTE '" + alertify.labels.ok + "'");
            setTimeout(function() {
                window.location.href = '../html/'+s; //Pasa al siguiente juego
            }, 1300);
        } else {
            alertify.error("ELEGISTE '" + alertify.labels.cancel + "'");
            confirmSalida();
        }
    });
    return false
}

function alerta() {
    playA('../sonidos/error.wav');
    alertify.alert("<img src='../img/triste.jpg'> <h1><b> &iexcl; TE EQUIVOCASTE! <br> &iexcl; INTENTALO DE NUEVO ! </b></h1>", function() {
        //aqui introducimos lo que haremos tras cerrar la alerta.
    });
}

function enmarcar(event) {
    selec = event.target;
    if (pintado == false) {
        selec.className += " cambiarBorde";
        pintado = true;
    } else {
        $('.cambiarBorde').removeClass("cambiarBorde");
        selec.className += " cambiarBorde";
    }
}

function comprobar(s) {
    if (checkTable('s0') & checkTable('m0') & checkTable('s1')) {
        confirmar(s);
    } else {
        alerta();
    }
}

/*FUNCION EXCLUSIVA DE LA ACTIVIDAD EXTRA*/

function comprobarExtra(s,cantLetras,palabra){

    if(palabra == 'mano'){
        var letras = ['m','a','n','o'];
    }
    else if(palabra == 'mono'){
        var letras = ['m','o','n','o'];
    }else{
        var letra = ['m','e','s','a'];
    }

    var tabla = $('#m');
    var items = tabla.children('tbody').children('tr').find('img');
    var cont = 0;
    var padre;
    var hijo;
    for (var i = 0; i < items.length; i++) {
        if (items[i].dataset.letra != letras[i]){
            hijo = document.createElement("div");
            hijo.className+="item";
            hijo.appendChild(items[i]);
            padre = document.getElementById('pos-'+items[i].dataset.pos);
            padre.appendChild(hijo);
        }
        if (items[i].dataset.letra == letras[i]){
            cont++;
        }
    }

    //Le devuelvo la propiedad arrastrable a cada imagen
    $('.item').draggable({
                helper: 'clone'
                
            });

            $('.box-image').droppable({
                accept: '.item',
                hoverClass: 'hovering',
                drop: function(ev, ui) {
                    ui.draggable.detach();
                    $(this).append(ui.draggable);

                }
            });

    if(cont==cantLetras){
        confirmar(s);
    }
    else{
        alerta();
    }


}