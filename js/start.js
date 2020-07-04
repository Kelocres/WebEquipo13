let startState = 
{
    preload: cargaAssets,
    create: muestraPantalla
}

//The buttons
let btnSelectName, btnAbout, btnInstrucions, btnSelectLevel;

//The images
let backgound, mine_text, detector_text;

let firstStart;
let textAnimationTime;
let currentLevel;

//Sounds
let standard_click_sound;
let back_click_sound;
let explosion_at_start;

//Estilo genérico
var style = { font: "40px Arial", fill: "#ffffff", align: "left" };

//Orientación del ratón, modificable en las instrucciones
let mouseEffect = 1;

function cargaAssets() 
{
    game.load.image('botonSelectName','assets/imgs/New UI/PNG/Buttons/Select_Name.png');
    game.load.image('botonabout','assets/imgs/New UI/PNG/Buttons/About.png');
    game.load.image('botoninst','assets/imgs/New UI/PNG/Buttons/Instructions.png');
    game.load.image('botonSelectLevel','assets/imgs/New UI/PNG/Buttons/Select_Level.png');

    game.load.image("background", "assets/imgs/New enviroment/BackGrounds/BG space 2.jpg");
    game.load.image('Mine_text','assets/imgs/New UI/PNG/Mine_Text.png');
    game.load.image('Detector_text','assets/imgs/New UI/PNG/Detector_Text.png');

    //Audio
    game.load.audio('Standard_Click_Sound','assets/audio/Standard_Click_Sound.wav');
    game.load.audio('Back_Click_Sound','assets/audio/Back_Click_Sound.wav');
    game.load.audio('Explosion_At_Start','assets/audio/Explosion_At_Start.wav');

}

function muestraPantalla()
{
    createMenuSounds();
    if(firstStart == null) firstStart = true;
    textAnimationTime = 750;

    background = game.add.image(0,0,'background');
    background.scale.setTo(0.6,0.6);

    if(firstStart){
        
        mine_text = game.add.image(0,0,'Mine_text');
        mine_text.scale.setTo(0.7,0.7);
        mine_text.right = -20;
        mine_text.y = 50;
        detector_text = game.add.image(0,0,'Detector_text');
        detector_text.scale.setTo(0.7,0.7);
        detector_text.left = 420;
        detector_text.y = 130;

        let mine_text_anim = game.add.tween(mine_text).to({centerX:200},textAnimationTime,"Linear",true);
        game.add.tween(detector_text).to({centerX:200},textAnimationTime,"Linear",true);
        mine_text_anim.onComplete.add(function(){explosion_at_start.play()});

        btnSelectLevel = game.add.button(39, 250, 'botonSelectLevel', selectLevelPressed);
        btnSelectLevel.alpha = 0;
        btnSelectLevel.inputEnabled = false;
        btnSelectName = game.add.button(39, 375, 'botonSelectName', selectNamePressed);
        btnSelectName.alpha = 0;
        btnSelectName.inputEnabled = false;
        btnAbout = game.add.button(39, 500, 'botonabout', aboutPressed);
        btnAbout.alpha = 0;
        btnAbout.inputEnabled = false;
        btnInstrucions = game.add.button(39, 625, 'botoninst', instPressed);
        btnInstrucions.alpha = 0;
        btnInstrucions.inputEnabled = false;

        game.add.tween(btnSelectLevel).to({alpha:0.5},750,"Linear",true,textAnimationTime);
        let btnSelectNameAnim = game.add.tween(btnSelectName).to({alpha:1},750,"Linear",true,textAnimationTime);
        let btnAboutAnim = game.add.tween(btnAbout).to({alpha:1},750,"Linear",true,textAnimationTime);
        let btnInstrucionsAnim = game.add.tween(btnInstrucions).to({alpha:1},750,"Linear",true,textAnimationTime);
        
        btnSelectNameAnim.onComplete.add(function(){btnSelectName.inputEnabled = true});
        btnAboutAnim.onComplete.add(function(){btnAbout.inputEnabled = true});
        btnInstrucionsAnim.onComplete.add(function(){btnInstrucions.inputEnabled = true});

        firstStart = false;
    }
    else{

        mine_text = game.add.image(0,0,'Mine_text');
        mine_text.scale.setTo(0.7,0.7);
        mine_text.centerX = 200;
        mine_text.y = 50;
        detector_text = game.add.image(0,0,'Detector_text');
        detector_text.scale.setTo(0.7,0.7);
        detector_text.centerX = 200;
        detector_text.y = 130;

        btnSelectLevel = game.add.button(39, 250, 'botonSelectLevel', selectLevelPressed);
        btnSelectName = game.add.button(39, 375, 'botonSelectName', selectNamePressed);
        btnAbout = game.add.button(39, 500, 'botonabout', aboutPressed);
        btnInstrucions = game.add.button(39, 625, 'botoninst', instPressed);

        if(playerName == null){
            btnSelectLevel.alpha = 0.5;
            btnSelectLevel.inputEnabled = false;
        }
    }
}

function createMenuSounds(){
    standard_click_sound = game.add.audio('Standard_Click_Sound');
    back_click_sound = game.add.audio('Back_Click_Sound');
    explosion_at_start = game.add.audio('Explosion_At_Start');
}

// MÉTODOS DE LOS BOTONES --------------------------
function aboutPressed()     {game.state.start('about');standard_click_sound.play();}
function selectLevelPressed()   {game.state.start('select_level');standard_click_sound.play();}
function selectNamePressed()      {game.state.start('writeName');standard_click_sound.play();}
function instPressed()      {game.state.start('instrucions');standard_click_sound.play();}