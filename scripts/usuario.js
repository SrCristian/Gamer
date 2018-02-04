var usuario = {
  'nombre': '',
  'email': '',
  'contrasenia': '',
  'dificultad': 'DECENTE',
  'euros': 0,
  'avatar': '',
  'vidas': 3
};

/**
 * Registra al nuevo usuario.
 */
function registrarUsuario(){
  var jugadores;
  if(localStorage['jugadores'] != null){
    jugadores = JSON.parse(localStorage['jugadores']);
  } else{
    jugadores = [];
  }
  if(localStorage[$('#nombre').val()] == null){
    jugadores[jugadores.length] = usuario['nombre'];
    localStorage['jugadores'] = JSON.stringify(jugadores);
    localStorage[usuario['nombre']] = JSON.stringify(usuario);
  }
}
/**
 * Resguarda los datos del usuario.
 */
function reguardarUsuario(){
  localStorage[$('#nombre').val()] = JSON.stringify(usuario);
}
/**
 * Realiza el login del usuario.
 */
function hacerLogin(){
  var storage = JSON.parse(localStorage[$('#nombre').val()]);
  if(storage != null && storage['contrasenia'] == $('#password').val()){
    usuario = storage;
    $('#ventanaLogin').hide();
    mostrarPrincipal();
  } else{
    $('#errorLogin').show();
  }
}
/**
 * Restablece la dificultad guardada.
 */
function nivelDificultad(){
  if(usuario['dificultad'] == 'BEBE'){
    dificultad = 1;
  } else if(usuario['dificultad'] == 'DECENTE'){
    dificultad = 2;
  } else{
    dificultad = 3;
  }
}

function mostrarRecord(){
  var jugadores = JSON.parse(localStorage['jugadores']);
  var anterior = 0;
  var unUsuario;
  var lista = $('#listaRecord');
  for(var aux = 0 ; aux < jugadores.length ; aux++){
    unUsuario = JSON.parse(localStorage[jugadores[aux]]);
    if(anterior < unUsuario['euros']){
      anterior = unUsuario['euros'];
      lista.prepend('<li>Usuario '+unUsuario['nombre']+' con '+unUsuario['euros']+' euros.</li>');
    } else{
      lista.append('<li>Usuario '+unUsuario['nombre']+' con '+unUsuario['euros']+' euros.</li>');
    }
  }
}
