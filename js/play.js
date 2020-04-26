
const NUM_BLOCKS = 7;
let haveToPutNoBlock = true;
let blockX = -30;
let blockY = 50;
let blockPos = 1;

let player;
let playerAcceleration;
let playerVelocity;
let playerName;

let levelConfig;

let blocks;

let playState = {
    preload: preloadPlay,
    create: createPlay,
    update: updatePlay
}

function preloadPlay(){
    game.load.spritesheet('player','assets/imgs/Slime/Slime 16x16.png', 16, 16);
    game.load.spritesheet('enviroment','assets/imgs/Enviroment/Assets/Assets.png', 16, 16);
    game.load.image("bloque", "assets/imgs/bloque.png");
}

function createPlay(){
    //levelConfig = JSON.parse(game.cache.getText('level')); //Ni idea como va esto julio
    createPlayer();
    createKeyControls();
    createBlock();
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }


}

function updatePlay(){
    managePlayerVelocity();
    manageBlockMovement();

    game.physics.arcade.overlap(player,blocks,playerHitsBlock,null,this);
}

function createPlayer(){
    player = game.add.sprite(200,30,'player');
    game.physics.arcade.enable(player);
    game.camera.bounds = (800,600);
    game.camera.follow(player);//Luego hay que cambiar a que solo siga al pesonaje cuando cae y añadir que personaje no esté en el centro
    //Puede que por deadZone
    //https://phaser.io/examples/v2/camera/deadzone
    
}


function createBlock(){
    blocks = game.add.group();
    blocks.enableBody = true;
    blocks.createMultiple(NUM_BLOCKS, 'bloque');
    blocks.forEach(setUpBlock, this);
}

function setUpBlock(){
    let item = blocks.getFirstExists(false);
    if (item) {
        let rand = Math.random();
        if(haveToPutNoBlock && rand<blockPos/NUM_BLOCKS){
            delete(item);
            haveToPutNoBlock = false;
        }
        else{
            item.reset(blockX, blockY);
        }
        blockX+= 60;
        blockPos++;
    }
        
}


function managePlayerVelocity(){

}

function playerHitsBlock(){
    //Que tanto en personaje como los bloques tengan colliders muy finos podrian solucionar el problema de que rebote si da en un lado del bloque

}

function manageBlockMovement(){//Si el jugador y el bloque chocan en el lado, hacer que no se puedan movel los bloques
   if(cursorLeft.justDown){
        blocks.forEach(moveLeftBlock);
    }
    if(cursorRigh.justDown){
        blocks.forEach(moveRightBlock);      
    }
}

function moveLeftBlock(block){
   block.body.x -= 60;
   if(block.body.x < -30){
        block.body.x = 400 + block.body.x;
   }/*
   else if(block.body.x < 400 && block.body.x > 370){
       let newBlock = game.add.sprite(block.body.x+60, block.body.y, "bloque");
       blocks.add(newBlock);
   }*/

}

function moveRightBlock(block){
    block.body.x += 60;
    if(block.body.x > 430){
        delete(block);
    }
   /* else if(block.body.x > 370){
        let newBlock = game.add.sprite(400-block.body.x, block.body.y, "bloque");
        blocks.add(newBlock);
    }*/
}


function createKeyControls(){
    cursorLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    cursorRigh = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    leftBottom = game.input.keyboard.addKey(Phaser.Mouse.LEFT_BUTTON);
    rightBottom = game.input.keyboard.addKey(Phaser.Mouse.RIGHT_BUTTON);

}