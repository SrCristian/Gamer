var objetoTorre;
/**
 * Crea el grupo de torre.
 */
function grupoObjetoTorre(){
  objetoTorre = game.add.group();
    objetoTorre.enableBody = true;
    objetoTorre.physicsBodyType = Phaser.Physics.ARCADE;
    objetoTorre.createMultiple(1, 'torre');
    objetoTorre.scale.setTo(1.4, 0.5);
    objetoTorre.setAll('anchor.x', 0.1);
    objetoTorre.setAll('anchor.y', 1);
    objetoTorre.moveDown();
    objetoTorre.setAll('outOfBoundsKill', true);
    objetoTorre.setAll('checkWorldBounds', true);
}
/**
 * Crea las torres.
 */
function crearTorre(){
      torre = objetoTorre.getFirstExists(false);
      if (torre)
      {
        torre.reset(game.world.width + 100  , (game.world.height * 2) - 120);
        torre.scale.setTo(0.6, 0.6);
        torre.body.velocity.x -= 85 * velocidad;
      }
}
