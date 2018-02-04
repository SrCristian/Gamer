function loadPage(){
  crearVentanaRegistro();
  ventanaPausa();
  ventanaMuerte();
  ventanaGanar();
}

function changeAvatar(){
  $('#imgAvatar').attr('src', "img/avatar/"+$('#selectAvatar').val()+".png");
}

function abrirRegistro(){
  $('#errorRegistro').hide();
  changeAvatar();
  $( "#ventanaRegistro" ).dialog( "open" );
}

function crearVentanaRegistro(){
  $( "#ventanaRegistro" ).dialog({
    autoOpen: false,
    title: 'Registro de cuenta',
    width: 400,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "explode",
      duration: 1000
    }
  });
}

function hacerRegistro(){
  if(comprobarRegistro()){
    usuario['nombre'] = $('#r_nombre').val();
    usuario['contrasenia'] = $('#r_password').val();
    usuario['email'] = $('#r_email').val();
    usuario['avatar'] = $('#imgAvatar').attr('src');
    registrarUsuario();
    $( "#ventanaRegistro" ).dialog( "close" );
  }
}
/**
 * Comprueba que el registro cumpla los requisitos.
 * @return {boolean} cumple los requisitos.
 */
function comprobarRegistro(){
  var cumple = true;
  if($('#r_nombre').val().length < 5){
    cumple = false;
    console.log(1);
  }
  if($('#r_password').val() < 5){
    cumple = false;
    console.log(2);
  }
  if($('#r_repetir').val() != $('#r_password').val()){
    cumple = false;
    console.log(3);
  }
  if(!validarEmail($('#r_email').val())){
    cumple = false;
    console.log(4);
  }
  if($('#r_emailrepetir').val() != $('#r_email').val()){
    cumple = false;
    console.log(5);
  }
  if(!cumple){
    $('#errorRegistro').show();
  }
  return cumple;
}
/**
 * Valida el email.
 * @param  {String} email
 * @return {boolean}      requisito.
 */
function validarEmail(email) {
    var isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return isEmail.test(String(email).toLowerCase());
}

function mostrarPrincipal(){
  $('#ventanaOpciones').hide();
  $('#ventanaPrincipal').show();
  cargarDatoUsuario();
  $('#recordBEBE').text("Record "+usuario['euros']+" euros.");
}

function cargarDatoUsuario(){
  $('.nombreIdentidad').text(usuario['nombre']);
  $('.miAvatar').attr('src', usuario['avatar']);
}

function mostrarOpciones(){
  $('#ventanaPrincipal').hide();
  $('#ventanaOpciones').show();
  cargarDificultad();
}

function cargarDificultad(){
  $('#dificultad').text(usuario['dificultad']);
  if(usuario['dificultad'] == 'BEBE'){
    $('#descripcionDificultad').text('NIVEL PARA BEBES, ERES LA VERGÜENZA DE TU FAMILIA.');
  } else if(usuario['dificultad'] == 'DECENTE'){
    $('#descripcionDificultad').text('NIVEL PARA LOS DECENTES, ESTAS EN LA MEDIA.');
  } else{
    $('#descripcionDificultad').text('NIVEL \"BUSCATE UNA VIDA\" ¡VIACIADO!');
  }
}

function nivelBebe(){
  usuario['dificultad'] = 'BEBE';
  cargarDificultad();
}

function nivelDecente(){
  usuario['dificultad'] = 'DECENTE';
  cargarDificultad();
}

function nivelViciado(){
  usuario['dificultad'] = 'VICIADO';
  cargarDificultad();
}

function guardarOpciones(){
  reguardarUsuario();
}

function ventanaPausa(){
  $('#ventanaPausa').dialog({
    autoOpen: false,
    dialogClass: 'hide-close',
    title: 'PAUSA',
    resizable: true,
    height: "auto",
    width: 600,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "explode",
      duration: 1000
    },
    buttons: {
      "Reiniciar": function() {
        $( this ).dialog( "close" );
        reiniciarGame();
      },
      "Reanudar": function() {
        $( this ).dialog( "close" );
        reanudarGame();
      },
      "Menu PRINCIPAL": function() {
        $( this ).dialog( "close" );
        regresarMenuPrincipal();
      }
    }
  });
}

function ventanaGanar(){
  $('#ventanaGanar').dialog({
    autoOpen: false,
    dialogClass: 'hide-close',
    resizable: true,
    height: "auto",
    title: 'FINALIZADO',
    width: 600,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "explode",
      duration: 1000
    },
    buttons: {
      "Reiniciar": function() {
        $( this ).dialog( "close" );
        reiniciarGame();
      },
      "Siguiente": function() {
        $( this ).dialog( "close" );
        nivel++;
        reiniciarGame();
      },
      "Menu PRINCIPAL": function() {
        $( this ).dialog( "close" );
        regresarMenuPrincipal();
      }
    }
  });
}

function ventanaMuerte(){
  $('#ventanaMuerte').dialog({
    autoOpen: false,
    dialogClass: 'hide-close',
    resizable: true,
    height: "auto",
    title: 'PERSONAJE MUERTO',
    width: 600,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "explode",
      duration: 1000
    },
    buttons: {
      "Reiniciar": function() {
        $( this ).dialog( "close" );
        reiniciarGame();
      },
      "Menu PRINCIPAL": function() {
        $( this ).dialog( "close" );
        regresarMenuPrincipal();
      }
    }
  });
}

function regresarMenuPrincipal(){
  eliminarGame();
  $('#ventanaPrincipal').show();
  $('#datosUsuarios').hide();
}

function ventanaRecord(){
  $('li').remove();
  mostrarRecord();
  $('#ventanaRecord').dialog({
    resizable: true,
    height: "auto",
    title: 'RECORD',
    width: 'auto',
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "explode",
      duration: 1000
    },
    buttons: {
      "SALIR": function() {
        $( this ).dialog( "close" );
      }
    }
  });
}
