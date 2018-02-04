//Parametros.
var pj;
var vidas;
var euros = 0;
var recamara = 12;
var balas;
var tiempoAccion = 0;
var sufriendo;

//Acciones.
var disparar;
var herrido;
var morrir
var isSuelo = false;

function crearPJ(){
  // PJ or player
  pj = game.add.sprite(10, 200, 'pj');
  pj.scale.setTo(0.2, 0.2);
  //pj.z = 10;
  game.physics.arcade.enable(pj);
  //pj.body.bounce.y = 0.3;
  pj.body.gravity.y = 200;
  pj.body.collideWorldBounds = true;
  pj.animations.add("correr",[21,22,23,24,25,26,27,28,29,30],10+(10 * velocidad), true);
  disparar = pj.animations.add("disparar",[32,33,34,35,36,37,38,39],60+(10 * velocidad), false);
  pj.animations.add("saltar",[0],3, true);
  herrido = pj.animations.add("herido",[11,12,13,1,14,15,16,1,17,18,19],30, false);
  morrir = pj.animations.add("morrir",[2,3,4,5,6,7,8],30, false);
  //Control del pj
  game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.SPACEBAR,
        Phaser.Keyboard.ENTER,
        Phaser.Keyboard.P
    ]);
    sufriendo = false;
}



function controlPJ(){
 if(vidas.countLiving() > 0){
    if(!disparar.isPlaying && !sufriendo  && game.time.now > tiempoAccion){
     if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
       Disparar();
       tiempoAccion = game.time.now + 200;
     } else if(!isSuelo){
       pj.animations.play("saltar");
       disparar.isFinished = false;
     } else{
       pj.animations.play("correr");
       disparar.isFinished = false;
     }
   }
    if(isSuelo){
     if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
       pj.body.velocity.y = -(game.world.height/2);
       isSuelo = false;
     }
   }
   if(game.input.keyboard.isDown(Phaser.Keyboard.P)){
     pausarGame();
   }
 }
 if(morrir.isFinished){
   if(isSuelo){
     muerteGame();
   }
 }
 myeuros.text = euros;
}

function canJump(){
  isSuelo = true;
}

function iniciarVida(){
  vidas = game.add.group();
  vidaSoldado(3);
}

function vidaSoldado(cantidadVidas){
  if(usuario['vidas'] < cantidadVidas){
    cantidadVidas = usuario['vidas'];
  }
  for (var cantidad = 0; cantidad < cantidadVidas ; cantidad++){
              var vida = vidas.create(game.world.width - ((30 * cantidad) + 20), 30, 'corazon');
              vida.anchor.setTo(0.5, 0.5);
              vida.scale.setTo(0.05, 0.05);
  }
}

function obtenerVida(pj, corazon){
  if(vidas.countLiving()){
    sonidoItem.play();
    corazon.kill();
    reconstruirVida(1);
  }
}

function obtenereEuros(pj, elEuro){
  if(vidas.countLiving()){
    sonidoItem.play();
    elEuro.kill();
    euros += parseInt(velocidad);
  }
}

function reconstruirVida(cambio){
  var cantidadVidas = vidas.countLiving() + cambio;
  while(vidas.countLiving() != 0){
    vida = vidas.getFirstAlive();
    if (vida){
        vida.kill();
    }
  }
  vidaSoldado(cantidadVidas);
}

function heridaSoldado(pj, robotsVoladores){
  if(!sufriendo){
    reconstruirVida(-1);
    sonidoHerido.play();
    if(vidas.countLiving() < 1){
        pj.animations.play("morrir");
        sonidoOver.play();
        isSuelo = false;
        velocidad = 0;
        pj.body.velocity.y = -250;
        sufrirSoldado(10000);
    }else{
        pj.animations.play("herido");
        sufrirSoldado(1000);
    }
  }
}

function sufrirSoldado(milisecond){
  sufriendo = true;
  setTimeout(function(){
    sufriendo = false;
  }, milisecond);
}

function Disparar() {
  if(game.time.now > (tiempoAccion + 200)){
    pj.animations.play("disparar");
    sonidoDisparo.play();
    bala = balas.getFirstExists(false);
    if (bala)
    {
      bala.anchor.setTo(0.5, 0.5);
      bala.scale.setTo(0.3, 0.3);
      bala.reset(pj.x + 80 , pj.y + 50);
      bala.body.velocity.x = +400;
    }
  }
}

function grupoBalas(){
  balas = game.add.group();
    balas.enableBody = true;
    balas.physicsBodyType = Phaser.Physics.ARCADE;
    balas.createMultiple(recamara, 'bala');
    balas.setAll('anchor.x', 0.5);
    balas.setAll('anchor.y', 0.1);
    balas.setAll('outOfBoundsKill', true);
    balas.setAll('checkWorldBounds', true);
}
