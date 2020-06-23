


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
    
    let credits = 'The objetive of the game is\n to fall evading all the \n obstacles and getting to the \n bottom the fastest you can. \n';
    let append = '\n In order to acomplish this \n the player will be able \n to move the character \n with the arrows and \n the mouse.\n'
    let append2 = ' \nEvade all the enemies and \n prevent yourself from\n crashing into the ground.\n'
    let append3 = '\n Press the letter in the blocks \n to vanish them and \ncontinue falling.'
    credits += append;
    credits += append2;
    credits += append3;

    game.add.text(25, game.world.height / 6, credits, {
        font: 'bold 20pt FerrumExtracondensed',
        fill: '#b60404'
    });
}



