let selectLevelState = 
{
    preload: cargaAssets,
    create: muestraPantalla
}



//The buttons
let btnLevel1, btnLevel2, btnLevel3;

//The images
//let backgound, mine_text, detector_text;

function cargaAssets() 
{
    game.load.image('btnLevel1','assets/imgs/New UI/PNG/Buttons/Level1.png');
    game.load.image('btnLevel2','assets/imgs/New UI/PNG/Buttons/Level2.png');
    game.load.image('btnLevel3','assets/imgs/New UI/PNG/Buttons/Level3.png');
    game.load.image('btnBack','assets/imgs/New UI/PNG/Buttons/Back.png');

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


    btnLevel1 = game.add.button(39, 250, 'btnLevel1', playLevel1);
    btnLevel2 = game.add.button(39, 375, 'btnLevel2', playLevel2);
    btnLevel3 = game.add.button(39, 500, 'btnLevel3', playLevel3);
    btnBack = game.add.button(39, 625, 'btnBack', backPressed);
}

// MÉTODOS DE LOS BOTONES --------------------------
function playLevel1(){
    console.log("Nivel 1");
    currentLevel = 1;
    game.state.start('play');
}
function playLevel2(){
    console.log("Nivel 2");
    currentLevel = 2;
    game.state.start('play');
}
function playLevel3(){
    console.log("Nivel 3");
    currentLevel = 3;
    game.state.start('play');
}
function backPressed(){game.state.start('start');}