

let startState = 
{
    preload: cargaAssets,
    create: muestraPantalla
}



//Los botones
let btnPlay, btnAbout, btnInstrucions;


function cargaAssets() 
{
    game.load.image('botonplay','assets/imgs/botonPlay.png');
    game.load.image('botonabout','assets/imgs/botonAbout.png');
    game.load.image('botoninst','assets/imgs/botonInstructions.png');
}

function muestraPantalla()
{
    btnPlay = game.add.button(100, 200, 'botonplay', playPressed);
    btnAbout = game.add.button(100, 400, 'botonabout', aboutPressed);
    btnInstrucions = game.add.button(100, 600, 'botoninst', instPressed);



}

// MÉTODOS DE LOS BOTONES --------------------------
function aboutPressed()     {game.state.start('about');}
function playPressed()      {game.state.start('play');}
function instPressed()      {game.state.start('instrucions');}