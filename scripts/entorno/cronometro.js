var mycronometro;
var restante;
var resguardo;
/**
 * Crea la interfaz del cronometro.
 */
function crearCronometro(){
  inicio = new Date();
  mycronometro = game.add.text(game.world.width/2 - 30, 10, "0:0", { font: '34px Arial', fill: 'blue' });
  mycronometro.text = restante+" seconds";
  restante = game.time.now + (10000 * dificultad * nivel);
}
/**
 * Avanza el cronometro.
 */
function correrCronometro(){
  var tiempo = parseInt((restante-game.time.now)/1000);
  if(tiempo < 0){
    tiempo = 0;
  }
  if(tiempo == 0){
    crearTorre();
  }
  if(tiempo < 10){
    mycronometro.fill = 'red';
  }
  mycronometro.text = tiempo+" seconds";
}

function pausarTiempo(){
  resguardo = parseInt((restante-game.time.now)/1000);
}

function reanudarTiempo(){
  restante = game.time.now + (resguardo * 1000);
}
