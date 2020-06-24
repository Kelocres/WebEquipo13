

let startState = 
{
    preload: cargaAssets,
    create: muestraPantalla
}



//The buttons
let btnSelectName, btnAbout, btnInstrucions, btnSelectLevel;

//The images
let backgound, mine_text, detector_text;
//Begin in the first level (level1.json)
let currentLevel = 1;

function cargaAssets() 
{
    game.load.image('botonSelectName','assets/imgs/Select_Name.png');
    game.load.image('botonabout','assets/imgs/New UI/PNG/Buttons/About.png');
    game.load.image('botoninst','assets/imgs/New UI/PNG/Buttons/Instructions.png');
    game.load.image('botonSelectLevel','assets/imgs/New UI/PNG/Buttons/Select_Level.png');

    game.load.image("background", "assets/imgs/New enviroment/BackGrounds/BG space 2.jpg");
    game.load.image('Mine_text','assets/imgs/New UI/PNG/Mine_Text.png');
    game.load.image('Detector_text','assets/imgs/New UI/PNG/Detector_Text.png');
}

function muestraPantalla()
{
    background = game.add.image(0,0,'background');
    background.scale.setTo(0.6,0.6);
    mine_text = game.add.image(0,0,'Mine_text');
    mine_text.scale.setTo(0.7,0.7);
    mine_text.centerX = 200;
    mine_text.y = 50;
    detector_text = game.add.image(0,0,'Detector_text');
    detector_text.x = 42;
    detector_text.y = 130;
    detector_text.scale.setTo(0.7,0.7);


    btnSelectLevel = game.add.button(39, 250, 'botonSelectLevel', selectNamePressed);
    btnSelectName = game.add.button(39, 375, 'botonSelectName', selectNamePressed);
    btnAbout = game.add.button(39, 500, 'botonabout', aboutPressed);
    btnInstrucions = game.add.button(39, 625, 'botoninst', instPressed);
}

// MÉTODOS DE LOS BOTONES --------------------------
function aboutPressed()     {game.state.start('about');}
function selectLevelPressed()   {game.state.start('play');}
function selectNamePressed()      {game.state.start('writeName');}
function instPressed()      {game.state.start('instrucions');}