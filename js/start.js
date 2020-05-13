

let startState = 
{
    preload: cargaAssets,
    create: muestraPantalla
}



//The buttons
let btnPlay, btnAbout, btnInstrucions, backgound;

//Begin in the first level (level1.json)
let currentLevel = 1;

function cargaAssets() 
{
    //Old UI
    game.load.image('botonplay','assets/imgs/botonPlay.png');
    game.load.image('botonabout','assets/imgs/botonAbout.png');
    game.load.image('botoninst','assets/imgs/botonInstructions.png');

    game.load.image("background", "assets/imgs/New enviroment/BackGrounds/BG space 2.jpg");
}

function muestraPantalla()
{
    background = game.add.image(0,0,'background');
    background.scale.setTo(0.6,0.6);

    btnPlay = game.add.button(100, 200, 'botonplay', playPressed);
    btnAbout = game.add.button(100, 400, 'botonabout', aboutPressed);
    btnInstrucions = game.add.button(100, 600, 'botoninst', instPressed);
}

// MÉTODOS DE LOS BOTONES --------------------------
function aboutPressed()     {game.state.start('about');}
function playPressed()      {game.state.start('play');}
function instPressed()      {game.state.start('instrucions');}