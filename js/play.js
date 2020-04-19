let player;
let playerAcceleration;
let playerVelocity;
let playerName;

let levelConfig;

let playState = {
    preload: preloadPlay,
    create: createPlay,
    update: updatePlay
}

function preloadPlay(){
    game.load.spritesheet('player','assets/imgs/Slime/Slime 16x16.png', 16, 16);
    game.load.spritesheet('enviroment','assets/imgs/Enviroment/Assets/Assets.png', 16, 16);
}

function createPlay(){
    //levelConfig = JSON.parse(game.cache.getText('level')); //Ni idea como va esto julio
    createPlayer();
    createKeyControls();
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

}

function updatePlay(){
    managePlayerVelocity();
}

function createPlayer(){
    player = game.add.sprite(200,30,'player');
    game.physics.arcade.enable(player);
    game.camera.bounds = (800,600);
    game.camera.follow(player);//Luego hay que cambiar a que solo siga al pesonaje cuando cae y añadir que personaje no esté en el centro
    //Puede que por deadZone
    //https://phaser.io/examples/v2/camera/deadzone
    
}

function managePlayerVelocity(){

}

function createKeyControls(){
    cursorLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    cursorRigh = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    leftBottom = game.input.keyboard.addKey(Phaser.Mouse.LEFT_BUTTON);
    rightBottom = game.input.keyboard.addKey(Phaser.Mouse.RIGHT_BUTTON);

}