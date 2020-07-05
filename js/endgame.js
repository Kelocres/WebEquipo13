let endState = {
    preload: preloadEndGame,
    create: createEndGame,
    update: updateEndGame,
}

let pressS;

let counting;
let showCounting;
var intervalCounting;

let btnBackToMenu;

function preloadEndGame()
{
    game.load.image('endBackground','assets/imgs/New enviroment/BackGrounds/endscreen_Background.jpg');
    game.load.image('botonback', 'assets/imgs/New UI/PNG/Buttons/Back.png');
    game.load.audio('Back_Click_Sound','assets/audio/Back_Click_Sound.wav');

}

function createEndGame(){
    //console.log("EndGame");
    let background = game.add.image(0, 0, 'endBackground');
    
    let textEnd1;
    if(defeated)    textEnd1 = game.add.text(55, 100, 'YOU DIED', style);
    else            textEnd1 = game.add.text(55, 100, 'YOU WIN', style);

    let textEnd2 = game.add.text(25, 250,"Platforms traversed:\n"+PastPlatforms, style);
    let textEnd3 = game.add.text(25, 400,"PRESS S TO PLAY \nAGAIN", style);

    btnBackToMenu = game.add.button(10, 625, 'botonback', BackToMenu);
    btnBackToMenu.scale.setTo(0.9, 0.9);

    counting = 15;
    showCounting = game.add.text(300, 625, counting, style);
    showCounting.fontSize = "80px";
    intervalCounting = setInterval(function(){
        counting--;
        showCounting.text = counting;
    }, 1000);

    /*let styleTitle = {
        font: 'Rammetto One',
        fontSize: '20pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };*/
    //game.add.text(55, 25, textTitle, styleTitle);

    pressS = game.input.keyboard.addKey(Phaser.Keyboard.S);
}

function updateEndGame(){
    if(pressS.isDown)
    {
        resetToStart();
        game.state.start('play');
    }

    if(counting <= 0)   BackToMenu();
}

function resetToStart()
{
    clearInterval(intervalCounting);
    currentLevel = 1;
    defeated = false;
    PastPlatforms = 0;
}

function BackToMenu() //Si el contador llega a 0 o se pulsa el botón
{
    resetToStart();
    back_click_sound.play();
    game.state.start("start");
}



