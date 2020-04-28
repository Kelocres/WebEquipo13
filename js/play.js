
const BOUNCE_CONSTANT = -100; // indice de rebote
const NUM_BLOCKS = 7;
const BLOCK_SPEED = 3; // velocidad a la que los bloque se mueven
const initBlockX = 80;// width of the block
const initBlockY = 450; //400 + half height of the block

let haveToPutNoBlock = true;
let blockX = -40;
let blockPos = 1;
let blocks;
let blockMovementDissabled = false;

let player;
let playerLife;
//let playerVelocity = 4;
let playerAcceleration = 1;
let playerName ="randomSlime";

let containerLifeBar;
let lifeBar;

let levelConfig;

let playState = {
    preload: preloadPlay,
    create: createPlay,
    update: updatePlay
}

function preloadPlay(){
    game.load.spritesheet('player','assets/imgs/Slime/Slime 16x16.png', 16, 16);
    game.load.spritesheet('enviroment','assets/imgs/Enviroment/Assets/Assets.png', 16, 16);
    game.load.spritesheet("BordersV1", "assets/imgs/UI/Borders(8x8).png",8,8);
    game.load.spritesheet("BordersV2", "assets/imgs/UI/Borders2(8x8).png",8,8);
    
    game.load.image("bloque", "assets/imgs/bloque.png");

    game.load.image("containerLifeBar", "assets/imgs/UI/containerLifeBar.png");
    game.load.image("bigTextBlock", "assets/imgs/UI/BigTextBlock.png");
    game.load.image("lifeBar", "assets/imgs/UI/lifeBar.png");
    game.load.image("redBlock", "assets/imgs/UI/RedBlock.png");
    game.load.image("textBlock", "assets/imgs/UI/TextBlock.png");
}

function createPlay(){
    //levelConfig = JSON.parse(game.cache.getText('level')); //Ni idea como va esto julio
    createPlayer();
    createUI();
    createKeyControls();
    createBlock();

    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }


    game.physics.startSystem(Phaser.Physics.ARCADE);

}

function updatePlay(){
    managePlayerVelocity();
    manageBlockMovement();
    backToMove();
    game.physics.arcade.collide(player, blocks,playerHitsBlock,null,this);
}

function createPlayer(){
    player = game.add.sprite(200,30,'player');
    game.physics.arcade.enable(player);
    player.body.immovable = true;
    game.camera.bounds = (800,600);
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(0, 100, 800, 80);
    //https://phaser.io/examples/v2/camera/deadzone
    
}

function createUI(){
    containerLifeBar = game.add.sprite(10,10,'containerLifeBar');
    lifeBar = game.add.sprite(12,12,'lifeBar');
}


function createBlock(){
    blocks = game.add.group();
    blocks.enableBody = true;
    game.physics.arcade.enable(blocks);
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
            item.reset(blockX, 60);
            item.body.checkCollision.left = true;
            item.body.checkCollision.up = true;
            item.body.checkCollision.right = true;
            item.body.immovable =true;
        }
        blockX+= initBlockX;
        blockPos++;
    }
        
}


function managePlayerVelocity(){
    player.body.velocity.y += playerAcceleration;
    //playerVelocity += playerAcceleration;
}

function playerHitsBlock(player, block){
    //Que tanto en personaje como los bloques tengan colliders muy finos podrian solucionar el problema de que rebote si da en un lado del bloque
    if(block.body.touching.up == true){
        player.body.velocity.y =BOUNCE_CONSTANT;
    } 
    else{
        blockMovementDissabled = true;
    }
}

function manageBlockMovement(){//Si el jugador y el bloque chocan en el lado, hacer que no se puedan movel los bloques
    if(!blockMovementDissabled){
        if(cursorRigh.isDown){
            blocks.forEach(function(block){
                block.body.x -= BLOCK_SPEED;
                if(block.body.x < -initBlockX){
                     block.body.x += 400 + 2*initBlockX; // += para ajustar su verdadera posicion en relacion con lo demas boques
                }
            });
        }
        if(cursorLeft.isDown){
            blocks.forEach(function(block){
                block.body.x += BLOCK_SPEED;
                if(block.body.x > 400 + initBlockX){
                    let aux = 400 + initBlockX - block.body.x;
                    block.body.x = -initBlockX - aux;
                }
            });      
        }
    }  
}

function backToMove(){
    if(blockMovementDissabled && player.body.y > 60){
        blockMovementDissabled = false;
    }
}


function createKeyControls(){
    cursorLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    cursorRigh = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    leftBottom = game.input.keyboard.addKey(Phaser.Mouse.LEFT_BUTTON);
    rightBottom = game.input.keyboard.addKey(Phaser.Mouse.RIGHT_BUTTON);

}