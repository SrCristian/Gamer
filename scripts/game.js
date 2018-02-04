var game;
var dificultad;
var velocidad;
var nivel = 1;
/**
 * Carga e inicia el juego.
 */
function cargarGame(){
  game  = new Phaser.Game(screen.width, screen.height - 200, Phaser.CANVAS, 'phaser_Soldado', { preload:preload, create: create, update: update });
}

/**
 * Prerecarga los recursos.
 */
function preload(){
  nivelDificultad();
  cargarVelocidad();
  game.load.spritesheet('pj', 'img/pj/SpriteSoldado.png',430,376);
  game.load.image('corazon', 'img/pj/corazon.png');
  game.load.image('bala', 'img/pj/bala.png');
  game.load.image('fondo', 'img/fondo.png');
  game.load.image('suelo', 'img/suelo.png');
  game.load.spritesheet('robotVolador', 'img/robotVolador.png', 32, 32);
  game.load.spritesheet('explota', 'img/explota.png', 128, 128);
  game.load.image('euro', 'img/euro.png');
  game.load.image('torre', 'img/torre.png');
  game.load.spritesheet('momiaRobot', 'img/momia.png', 37, 45, 18);

  game.load.audio('sonidoMusica','sound/musica.wav');
  game.load.audio('sonidoDisparo','sound/disparo.wav');
  game.load.audio('sonidoExplosion','sound/explosion.wav');
  game.load.audio('sonidoHerido','sound/herido.wav');
  game.load.audio('sonidoItem','sound/item.wav');
  game.load.audio('sonidoOver','sound/over.wav');
  crearSonidos();
}
/**
 * Establece la velocidad.
 */
function cargarVelocidad(){
  velocidad = dificultad * 2 + (0.3 * nivel);
}
/**
 * Crea los recursos.
 */
function create(){
  //Agrega la física a todo el proyecto.
  game.physics.startSystem(Phaser.Physics.ARCADE);
  crearFondo();
  crearPlataforma();
  crearPJ();
  crearEuros();
  crearCronometro();
  iniciarVida();
  grupoBalas();
  //Robot volador.
  grupoRobotVolador();
  grupoExplosionesRobotVolador();
  //Momia robot.
  grupoMomiasRoboticas();
  grupoExplosionesMomiasRoboticas();
  grupoObjetosItemEuros();
  grupoObjetosCorazon();
  grupoObjetoTorre();

}
/**
 * Funcion en constante recarga para los elementos.
 */
function update(){
  // Fisicas.
  game.physics.arcade.collide(plataformas, pj, canJump);
  game.physics.arcade.overlap(balas, robotsVoladores, matarEnemigoRobotVolador, null, this);
  game.physics.arcade.overlap(balas, momiasRoboticas, matarEnemigoMomiaRobot, null, this);
  game.physics.arcade.overlap(pj, robotsVoladores, heridaSoldado, null, this);
  game.physics.arcade.overlap(pj, momiasRoboticas, heridaSoldado, null, this);
  game.physics.arcade.overlap(pj, objetosCorazon, obtenerVida, null, this);
  game.physics.arcade.overlap(pj, objetosItemEuros, obtenereEuros, null, this);
  game.physics.arcade.overlap(pj, objetoTorre, terminaNivel, null, this);
  // Entorno.
  movimientoPlataforma();
  // Pj o personaje.
  controlPJ();
  // Crear enemigos.
  crearEnemigos();
  //Crear corazones.
  crearCorazones();
  // Crea los euros.
  crearItemEuros();
  //cronometro
  correrCronometro();
}
/**
 * Crea a los enemigos.
 */
function crearEnemigos(){
  CrearRobotVoladores();
  CrearMomiasRoboticas();
}
/**
 * Termina la partida.
 */
function terminaNivel(){
  ganarGame();
}
/**
 * Devuelve un valor random entre el maximo y el minimo.
 * @param  {int} max valor maximo
 * @param  {int} min valor minimo
 * @return {int}     valor random a devolver.
 */
function numeroRandom(max, min){
  var valor = Math.floor(Math.random() * (max - min + 1) ) + min;
  return valor;
}
/**
 * Elimina phaser.
 */
function eliminarGame(){
  game.destroy();
  $("canvas").remove();
}
/**
 * Reinicia phaser.
 */
function reiniciarGame(){
  cargarVelocidad();
  eliminarGame();
  iniciarJuego();
  euros = 0;
}
/**
 * Reanuda phaser.
 */
function reanudarGame(){
  reanudarTiempo();
  game.paused = false;
  cargarVelocidad();
}
/**
 * Inicia el juego.
 */
function iniciarJuego(){
  cargarDatoUsuario();
  $('#datosUsuarios').show();
  $('#ventanaPrincipal').hide();
  cargarGame();
}
/**
 * Pausa el juego.
 */
function pausarGame(){
  pausarTiempo();
  velocidad = 0;
  game.paused = true;
  $('#ventanaPausa').dialog('open');
}
/**
 * Avisa del nivel terminado.
 */
function ganarGame(){
  if(vidas.countLiving()){
    if(usuario['euros'] < euros){
      usuario['euros'] = euros;
    }
    reguardarUsuario();
    $('#nivelTerminado').text("Felicidades "+usuario['nombre']+", has terminado el nivel "+nivel+'.');
    velocidad = 0;
    game.paused = true;
    $('#ventanaGanar').dialog('open');
  }
}
/**
 * Avisa de la muerte del pj.
 */
function muerteGame(){
  velocidad = 0;
  game.paused = true;
  $('#ventanaMuerte').dialog('open');
}
