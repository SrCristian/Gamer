var myeuros;
/**
 * Crea la interfaz de los euros.
 */
function crearEuros(){
  myeuros = game.add.text(50, 10, euros, { font: '34px Arial', fill: '#fff' });
  var simbolo = game.add.sprite(1,1,'euro');
  simbolo.scale.setTo(0.1, 0.1);
}
