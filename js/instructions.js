


let instructionsState = {
    preload: cargaAssets,
    create: muestraPantalla,
    //update: updateNivel
};



function cargaAssets() {
    game.load.image('botonback', 'assets/imgs/back.png');
    game.load.image("background", "assets/imgs/New enviroment/BackGrounds/BG space 2.jpg");
}

function muestraPantalla() {
    background = game.add.image(0,0,'background');
    background.scale.setTo(0.6,0.6);
    btnBack = game.add.button(10,10,'botonback', onBackButtonPressed);
    
    let credits = 'The objetive of the game is\n to fall evading all the obstacles\n and getting to the bottom the fastest you can';

    game.add.text(25, game.world.height / 6, credits, {
        font: 'bold 26pt FerrumExtracondensed',
        fill: '#b60404'
    });
}



