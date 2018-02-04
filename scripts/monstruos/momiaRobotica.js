var momiasRoboticas;
var tiempoMomiaRobotica = 0;
var explosionesMomia;
/**
 * Crea el grupo de las momias.
 */
function grupoMomiasRoboticas(){
  momiasRoboticas = game.add.group();
    momiasRoboticas.enableBody = true;
    momiasRoboticas.physicsBodyType = Phaser.Physics.ARCADE;
    momiasRoboticas.createMultiple(velocidad, 'momiaRobot');
    momiasRoboticas.setAll('anchor.x', 0.5);
    momiasRoboticas.setAll('anchor.y', 1);
    momiasRoboticas.setAll('outOfBoundsKill', true);
    momiasRoboticas.setAll('checkWorldBounds', true);
}
/**
 * Crea a las momias.
 */
function CrearMomiasRoboticas(){
  if (game.time.now > tiempoMomiaRobotica)
  {
      momia = momiasRoboticas.getFirstExists(false);
      if (momia){
        momia.reset(game.world.width + 100  ,game.world.height - 50);
        momia.body.velocity.x = -(70 * velocidad);
        momia.scale.setTo(1.2, 1.6);
        tiempoMomiaRobotica = game.time.now + numeroRandom(300,150);
        momia.animations.add('walk', [ 8,7,6,5,4,3,2,1,0 ], 20, true);
        momia.play('walk');
      }
  }
}
/**
 * Crea el objeto.
 */
function grupoExplosionesMomiasRoboticas(){
  explosionesMomia = game.add.group();
    explosionesMomia.createMultiple(velocidad * 4, 'explota');
    explosionesMomia.forEach(setupMomia, this);
}
/**
 * Realiza la animacion de explotar.
 */
function setupMomia (momia) {
        momia.anchor.x = 0.4;
        momia.anchor.y = 0.3;
        momia.animations.add('explota');
}
/**
 * Controla la destruccion del objeto.
 * @param  {object} bala       objeto que dispara.
 * @param  {object} momiaRobot monstruo
 */
function matarEnemigoMomiaRobot(bala, momiaRobot){
  bala.kill();
  momiaRobot.kill();
  sonidoExplosion.play();
  var explosion = explosionesMomia.getFirstExists(false);
    explosion.reset(momiaRobot.body.x, momiaRobot.body.y);
    explosion.play('explota', 50, false, true);
    euros += dificultad * 1 + nivel;
}
