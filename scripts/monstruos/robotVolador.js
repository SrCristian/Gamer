var robotsVoladores;
var tiempoRobotVolador = 0;
var explosionesRobot;
/**
 * Crea el grupo de robot voladores.
 */
function grupoRobotVolador(){
  robotsVoladores = game.add.group();
    robotsVoladores.enableBody = true;
    robotsVoladores.physicsBodyType = Phaser.Physics.ARCADE;
    robotsVoladores.createMultiple(velocidad, 'robotVolador');
    robotsVoladores.setAll('anchor.x', 0.5);
    robotsVoladores.setAll('anchor.y', 1);
    robotsVoladores.setAll('outOfBoundsKill', true);
    robotsVoladores.setAll('checkWorldBounds', true);
}
/**
 * Crea los robots voladores.
 */
function CrearRobotVoladores(){
  if (game.time.now > tiempoRobotVolador)
  {
      robot = robotsVoladores.getFirstExists(false);
      if (robot){
        robot.reset(game.world.width + 100  , numeroRandom(game.world.height - 50 , game.world.height - 300));
        robot.body.velocity.x = -(100 * velocidad);
        tiempoRobotVolador = game.time.now + numeroRandom(600,100);
        robot.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        robot.play('fly');
      }
  }
}
/**
 * Crea el grupo de explosion.
 */
function grupoExplosionesRobotVolador(){
  explosionesRobot = game.add.group();
    explosionesRobot.createMultiple(velocidad * 2, 'explota');
    explosionesRobot.forEach(setupRobot, this);
}
/**
 * Realiza la animacion de explotar.
 */
function setupRobot (robot) {
        robot.anchor.x = 0.5;
        robot.anchor.y = 0.5;
        robot.animations.add('explota');

}
/**
 * Controla la destruccion del objeto.
 * @param  {object} bala       objeto que dispara.
 * @param  {object} robotVolador monstruo
 */
function matarEnemigoRobotVolador(bala, robotVolador){
  bala.kill();
  robotVolador.kill();
  sonidoExplosion.play();
  var explosion = explosionesRobot.getFirstExists(false);
    explosion.reset(robotVolador.body.x, robotVolador.body.y);
    explosion.play('explota', 50, false, true);
    euros += dificultad * 3 + nivel;
}
