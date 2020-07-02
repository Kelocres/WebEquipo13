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
let explosionAtStart;
let currentLevel;

//Estilo genérico
var style = { font: "40px Arial", fill: "#ffffff", align: "left" };


function cargaAssets() 
{
    game.load.image('botonSelectName','assets/imgs/New UI/PNG/Buttons/Select_Name.png');
    game.load.image('botonabout','assets/imgs/New UI/PNG/Buttons/About.png');
    game.load.image('botoninst','assets/imgs/New UI/PNG/Buttons/Instructions.png');
    game.load.image('botonSelectLevel','assets/imgs/New UI/PNG/Buttons/Select_Level.png');

    game.load.image("background", "assets/imgs/New enviroment/BackGrounds/BG space 2.jpg");
    game.load.image('Mine_text','assets/imgs/New UI/PNG/Mine_Text.png');
    game.load.image('Detector_text','assets/imgs/New UI/PNG/Detector_Text.png');

    game.load.spritesheet('explosion','assets/imgs/Mina/Explosion_SpriteSheet.png',210,210,58);
    game.load.image('pedacito1','assets/imgs/New Player/Pedacitos/Pedacito1.png');
    game.load.image('pedacito2','assets/imgs/New Player/Pedacitos/Pedacito2.png');
    game.load.image('pedacito3','assets/imgs/New Player/Pedacitos/Pedacito3.png');
    game.load.image('pedacito4','assets/imgs/New Player/Pedacitos/Pedacito4.png');
}

function muestraPantalla()
{
    if(firstStart == null) firstStart = true;
    textAnimationTime = 750;

    background = game.add.image(0,0,'background');
    background.scale.setTo(0.6,0.6);

    if(firstStart){
/*
        mine_text = game.add.image(0,0,'Mine_text');
        mine_text.scale.setTo(0.7,0.7);
        mine_text.centerX = 200;
        mine_text.y = 50;
        detector_text = game.add.image(0,0,'Detector_text');
        detector_text.scale.setTo(0.7,0.7);
        detector_text.centerX = 200;
        detector_text.y = 130;
*/    
        
        mine_text = game.add.image(0,0,'Mine_text');
        mine_text.scale.setTo(0.7,0.7);
        mine_text.right = -20;
        mine_text.y = 50;
        detector_text = game.add.image(0,0,'Detector_text');
        detector_text.scale.setTo(0.7,0.7);
        detector_text.left = 420;
        detector_text.y = 130;

        game.add.tween(mine_text).to({centerX:200},textAnimationTime,"Linear",true);
        game.add.tween(detector_text).to({centerX:200},textAnimationTime,"Linear",true);

        game.time.events.add(textAnimationTime, playExplosion, this);

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

function playExplosion(){
    let startPartsEmitter = game.add.emitter(200, 100, 100);
    startPartsEmitter.makeParticles(['pedacito1','pedacito2','pedacito3','pedacito4']);
    startPartsEmitter.gravity = 40;
    startPartsEmitter.minParticleScale = 0.15;
    startPartsEmitter.maxParticleScale = 0.20;
    startPartsEmitter.setAlpha(1, 0, 2000);
    startPartsEmitter.start(true, 2000, null, 12);

    explosionAtStart = game.add.sprite(100,5,'explosion');
    explosionAtStart.animations.add('bum');
    explosionAtStart.animations.play('bum',30,false,true);
}

// MÉTODOS DE LOS BOTONES --------------------------
function aboutPressed()     {game.state.start('about');}
function selectLevelPressed()   {game.state.start('select_level');}
function selectNamePressed()      {game.state.start('writeName');}
function instPressed()      {game.state.start('instrucions');}