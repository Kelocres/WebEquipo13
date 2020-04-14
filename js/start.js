

let startState = 
{
    preload: cargaAssets,
    create: muestraPantalla
}



//Los botones
let btnPlay, btnAbout, btnInstrucions;


function cargaAssets() 
{
    
}

function muestraPantalla()
{
    

}

// MÉTODOS DE LOS BOTONES --------------------------
function aboutPressed()     {game.state.start('about');}
function playPressed()      {game.state.start('play');}
function trainingPressed()  {game.state.start('instrucions');}