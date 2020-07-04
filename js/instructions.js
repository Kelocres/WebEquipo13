


let instructionsState = {
    preload: cargaAssets,
    create: muestraPantalla,
    //update: updateNivel
};

// Botones para determinar el efecto del ratón
let btnLeft;
let btnRight;

//Estilo instrucciones
var styleInst = { font: "20px Arial", fill: "#ffffff", align: "left" };

function cargaAssets() {
    game.load.image('botonback', 'assets/imgs/New UI/PNG/Buttons/Back.png');
    game.load.image("background", "assets/imgs/New enviroment/BackGrounds/BG space 2.jpg");

    game.load.image('izquierdaNegativo', 'assets/imgs/New UI/PNG/Buttons/BTNs/Backward_BTN.png');
    game.load.image('derechaNegativo', 'assets/imgs/New UI/PNG/Buttons/BTNs/Forward_BTN.png');
    game.load.image('izquierdaPositivo', 'assets/imgs/New UI/PNG/Buttons/BTNs_Active/Forward_BTN.png');
    game.load.image('derechaPositivo', 'assets/imgs/New UI/PNG/Buttons/BTNs_Active/Backward_BTN.png');

    //Audio
    game.load.audio('Standard_Click_Sound','assets/audio/Standard_Click_Sound.wav');
    game.load.audio('Back_Click_Sound','assets/audio/Back_Click_Sound.wav');
}

function muestraPantalla() {
    background = game.add.image(0,0,'background');
    background.scale.setTo(0.6,0.6);
    btnBack = game.add.button(10,10,'botonback', onBackButtonPressed);
    
    let credits = 'The objetive of the game is\n to fall evading all the \n obstacles and getting to the \n bottom the fastest you can. \n';
    let append = '\n In order to acomplish this \n the player will be able \n to move the character \n with the arrows and \n the mouse.\n';
    let append2 = ' \nEvade all the enemies and \n prevent yourself from\n crashing into the ground.\n'
    let append3 = '\n Press the letter in the blocks \n to vanish them and \ncontinue falling.'
    credits += append;
    credits += append2;
    credits += append3;

    game.add.text(25, game.world.height / 6, credits, styleInst);

    //Cargar botones para el efecto del ratón
    if(mouseEffect == 1)
    {
        btnLeft = game.add.button(game.world.width/2 - 30, game.world.height - 130, 'izquierdaPositivo', changeMouseEffect);
        btnRight = game.add.button(game.world.width/2 + 70, game.world.height - 130, 'derechaPositivo', changeMouseEffect);
    }
    else
    {
        btnLeft = game.add.button(game.world.width/2 -30 , game.world.height - 130, 'izquierdaNegativo', changeMouseEffect);
        btnRight = game.add.button(game.world.width/2 + 70, game.world.height - 130, 'derechaNegativo', changeMouseEffect);
    }

    btnLeft.scale.setTo(0.5, 0.5);
    btnRight.scale.setTo(0.5, 0.5);

    game.add.text(25, game.world.height - 100, 'Mouse\neffect:', styleInst);
}

function changeMouseEffect()
{
    standard_click_sound.play();
    mouseEffect = -mouseEffect;

    if(mouseEffect == 1)
    {
        btnLeft.loadTexture('izquierdaPositivo');
        btnRight.loadTexture('derechaPositivo');
    }
    else
    {
        btnLeft.loadTexture('izquierdaNegativo');
        btnRight.loadTexture('derechaNegativo');
    }

    //btnRight.update();
    //btnLeft.update();
}



