
const BOUNCE_CONSTANT = -100; // indice de rebote
//const NUM_BLOCKS = 7;
const BLOCK_SPEED = 3; // velocidad a la que los bloque se mueven
const initBlockX = 80;// width of the block
const initBlockY = 450; //400 + half height of the block

let haveToPutNoBlock = true;
let firstBlockX = -40;
let blockX;
let blockY;
let blocks;
let blockMovementDissabled = false;

let worldMargin;

let player;
let playerLife;
//let playerVelocity = 4;
let playerAcceleration = 1;
let playerName ="randomSlime";

let containerLifeBar;
let lifeBar;

let levelConfig;

let levelsData = ['assets/levels/level1.json','assets/levels/level2.json'];

let playState = {
    preload: preloadPlay,
    create: createPlay,
    update: updatePlay
}

function preloadPlay(){
    
    game.load.spritesheet('enviroment','assets/imgs/Enviroment/Assets/Assets.png', 16, 16);
    game.load.spritesheet("BordersV1", "assets/imgs/UI/Borders(8x8).png",8,8);
    game.load.spritesheet("BordersV2", "assets/imgs/UI/Borders2(8x8).png",8,8);
    
    game.load.spritesheet('bloque', 'assets/imgs/Enviroment/Assets/Assets.png', 15, 15, 23);
    game.load.image('player','assets/imgs/New Player/jump/alien_4-jump0Fixed.png');
    game.load.image("containerLifeBar", "assets/imgs/UI/containerLifeBar.png");
    game.load.image("bigTextBlock", "assets/imgs/UI/BigTextBlock.png");
    game.load.image("lifeBar", "assets/imgs/UI/lifeBar.png");
    game.load.image("redBlock", "assets/imgs/UI/RedBlock.png");
    game.load.image("textBlock", "assets/imgs/UI/TextBlock.png");

    game.load.text("level",levelsData[currentLevel -1], true);
}

function createPlay(){
    levelConfig = JSON.parse(game.cache.getText('level')); 
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
    game.physics.arcade.collide(player, blocks,playerHitsBlock,null,this);//.anchor para cambiar la animación
}

function createPlayer(){
    let playerPosX = levelConfig.playerStart.x;
    let playerPosY = levelConfig.playerStart.y;
    player = game.add.sprite( playerPosX, playerPosY, 'player');
    game.physics.arcade.enable(player);
    player.body.immovable = true;
    player.scale.setTo(0.1,0.1);
    player.y = -50;
    game.camera.bounds = (800,600);
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(0, 100, 800, 80);
    //https://phaser.io/examples/v2/camera/deadzone
    
}

function createUI(){
    containerLifeBar = game.add.sprite(0,0,'containerLifeBar');
    lifeBar = game.add.sprite(0,0,'lifeBar');

    containerLifeBar.scale.setTo(4,4);
    lifeBar.scale.setTo(4, 4);

    containerLifeBar.x = 20;
    containerLifeBar.y = 20;
    lifeBar.x = 28;
    lifeBar.y = 25;

    containerLifeBar.fixedToCamera = true;
    lifeBar.fixedToCamera = true;
}


function createBlock(){

    //First of all, set up the number of blocks
    let numPlatforms = levelConfig.platforms.length;
    let blocksPerPlatform = levelConfig.blocksPerPlatform;
    let numBlocks = numPlatforms * blocksPerPlatform;

    //The margins of the world(negative->left, positive->right)
    worldMargin = blocksPerPlatform * initBlockX/2 + initBlockX*3;

    //The group of normal blocks
    blocks = game.add.group();
    blocks.enableBody = true;
    game.physics.arcade.enable(blocks);
    blocks.createMultiple(numBlocks, 'bloque', 3);

    blockY = 0;
    let hole;

    //For each platform
    for(var i = 0; i< numPlatforms; i++)
    {
        blockY += levelConfig.platforms[i].distance;
        hole = levelConfig.platforms[i].hole;
        blockX = firstBlockX;

        for(var j = 0; j < blocksPerPlatform; j++)
            setUpBlock(j,hole);
    }

}

function setUpBlock(currentBlock, hole)
{
    let item = blocks.getFirstExists(false); 
    if(item)
    {
        //It's a hole!
        if(currentBlock == hole)
        {
            delete(item);
        }
        //It's just another block
        else
        {
            item.reset(blockX, blockY);
            item.body.checkCollision.left = true;
            item.body.checkCollision.up = true;
            item.body.checkCollision.right = true;
            item.body.immovable =true;
            item.scale.setTo(5,5);
        }
        blockX+= initBlockX;
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
                     block.body.x += worldMargin + 2*initBlockX; // += para ajustar su verdadera posicion en relacion con lo demas boques
                }
            });
        }
        if(cursorLeft.isDown){
            blocks.forEach(function(block){
                block.body.x += BLOCK_SPEED;
                if(block.body.x > 400 + initBlockX){
                    let aux = worldMargin + initBlockX - block.body.x;
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