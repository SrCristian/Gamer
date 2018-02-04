var sonidoDisparo;
var sonidoMusica;
var sonidoExplosion;
var sonidoItem;
var sonidoHerido;
var sonidoOver;
/**
 * Crea y prepara los sonidos.
 */
function crearSonidos(){
  console.log("Crea sonido");
  sonidoMusica = game.add.audio('sonidoMusica');
  sonidoMusica.play('',0,1,true);
  sonidoDisparo = game.add.audio('sonidoDisparo');
  sonidoExplosion = game.add.audio('sonidoExplosion');
  sonidoItem = game.add.audio('sonidoItem');
  sonidoHerido = game.add.audio('sonidoHerido');
  sonidoOver = game.add.audio('sonidoOver');
}
