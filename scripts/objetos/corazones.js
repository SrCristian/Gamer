var objetosCorazon;
var tiempoCorazon = 0;
/**
 * Crea el grupo del objeto.
 */
function grupoObjetosCorazon(){
  objetosCorazon = game.add.group();
    objetosCorazon.enableBody = true;
    objetosCorazon.physicsBodyType = Phaser.Physics.ARCADE;
    objetosCorazon.createMultiple(1, 'corazon');
    objetosCorazon.scale.setTo(1.4, 0.5);
    objetosCorazon.setAll('anchor.x', 0.1);
    objetosCorazon.setAll('anchor.y', 1);
    objetosCorazon.setAll('outOfBoundsKill', true);
    objetosCorazon.setAll('checkWorldBounds', true);
}
/**
 * Crea el objeto.
 */
function crearCorazones(){
  if (game.time.now > tiempoCorazon)
  {
      corazon = objetosCorazon.getFirstExists(false);
      if (corazon){
        corazon.reset(game.world.width + 100  , numeroRandom(game.world.height * 2 - 100 , game.world.height * 2 - 500));
        corazon.anchor.setTo(0.5, 0.5);
        corazon.scale.setTo(0.05, 0.05);
        corazon.body.velocity.x = -(50 * velocidad);
        tiempoCorazon = game.time.now + numeroRandom(200,150);
      }
  }
}
