var objetosItemEuros;
var tiempoEuro = 0;
/**
 * Crea el grupo del objeto.
 */
function grupoObjetosItemEuros(){
  objetosItemEuros = game.add.group();
    objetosItemEuros.enableBody = true;
    objetosItemEuros.physicsBodyType = Phaser.Physics.ARCADE;
    objetosItemEuros.createMultiple(velocidad, 'euro');
    objetosItemEuros.scale.setTo(1.4, 0.5);
    objetosItemEuros.setAll('anchor.x', 0.1);
    objetosItemEuros.setAll('anchor.y', 1);
    objetosItemEuros.setAll('outOfBoundsKill', true);
    objetosItemEuros.setAll('checkWorldBounds', true);
}
/**
 * Crea el objeto.
 */
function crearItemEuros(){
  if (game.time.now > tiempoEuro)
  {
      itemEuro = objetosItemEuros.getFirstExists(false);
      if (itemEuro){
        itemEuro.reset(game.world.width + 100  , numeroRandom(game.world.height * 2 - 100 , game.world.height * 2 - 500));
        itemEuro.anchor.setTo(1, 1);
        itemEuro.scale.setTo(0.08, 0.08);
        itemEuro.body.velocity.x = -(50 * velocidad);
        tiempoEuro = game.time.now + numeroRandom(500,100);
      }
  }
}
