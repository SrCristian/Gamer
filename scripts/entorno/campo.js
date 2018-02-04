var fondo;

var suelo;
var plataformas;
/**
 * Creamos el fondo
 */
function crearFondo(){
  fondo = game.add.tileSprite(0, 0, game.world.width, 600, 'fondo');
}
/**
 * Crea la plataforma estable y la de movimiento.
 */
function crearPlataforma(){
  //Creamos la plataforma.
  plataformas = game.add.group();
  plataformas.enableBody = true;
  elSuelo = plataformas.create(0, game.world.height - 45, 'suelo');
  elSuelo.scale.setTo(10,0.5);
  elSuelo.body.immovable = true;
  suelo = game.add.tileSprite(0, game.world.height - 64, game.world.width, 64, 'suelo');
}
/**
 * Crea el movimiento de la plataforma y el entorno.
 */
function movimientoPlataforma(){
  //  Movimiento del fondo.
        fondo.tilePosition.x -= 1 * velocidad;
  // Movimiento del suelo.
        suelo.tilePosition.x -= 2 * velocidad;
}
