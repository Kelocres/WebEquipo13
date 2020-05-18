
const BOUNCE_CONSTANT = -150; // indice de rebote
//const NUM_BLOCKS = 7;
const BLOCK_SPEED = 3; // velocidad a la que los bloque se mueven
const initBlockX = 80;// width of the block
const initBlockY = 450; //400 + half height of the block

//Velocidad a la que el jugador rompe un bloque
const VELOCITY_BREAKS_BLOCK = 500;

// BLOCKS
let haveToPutNoBlock = true;
let firstBlockX = -40;
let blockX;
let blockY;
let blocks;
let blockMovementDissabled = false;

//TRAPS
let traps;
let trapAppearing; //Sirve para medir la proporcionalidad de que aparezcan trampas
let trapShow;

//POWER UPS
let powerUps;
let powerUpsAppearing;

// END OF LEVEL BLOCKS
let endBlocks;

let worldMargin;

//Player
let player;
let playerLife;
//let playerVelocity = 4;
let playerAcceleration = 2;
let playerName ="randomMonster";
let playerSprite
let playerScale = 0.14;
const spriteDistance = 130;
let playerFlexAnimation;
let playerJumpAnimation;
let playerFallAnimation;
let playerJumpling;

//Background
let background;
const backgroundMoveFactor = 0.4;
const backgroundMoveFactorX = 1;
const backgroundMoveFactorY = 0.895;
const backgoundBaseX = -800;
const backgoundBaseY = -200;

let velocidadTope;

//UI
let containerLifeBar;
let lifeBar;
let showName;

let levelConfig;

let levelsData = ['assets/levels/level1.json','assets/levels/level2.json'];

class LetterBlock {

    constructor(sprite, assignedLetter)
    {
        this.sprite = sprite;
        this.assignedLetter = assignedLetter;
        this.solid = true; //Mientras sea true, el jugador colisiona con él
    }

    verifyLetter(letter)
    {
        this.solid = false;

        if(letter == this.assignedLetter)
        {
            let disappear = game.add.tween(this.sprite).to({
                scale: 2, alpha: 0 //Se agranda al mismo tiempo que desaparece
            }, 500, // Duración: medio segundo
            Phaser.Easing.Linear.None, true, 0, 0, false);

            disappear.onComplete.add(function(){
                this.sprite.kill();
            })
        }
    }
}

let playState = {
    preload: preloadPlay,
    create: createPlay,
    update: updatePlay
}

function preloadPlay(){
    
    game.load.spritesheet('enviroment','assets/imgs/Enviroment/Assets/Assets.png', 16, 16);
    game.load.spritesheet("BordersV1", "assets/imgs/UI/Borders(8x8).png",8,8);
    game.load.spritesheet("BordersV2", "assets/imgs/UI/Borders2(8x8).png",8,8);
    
    //Enviroment
    //game.load.spritesheet('bloque', 'assets/imgs/New enviroment/spritesheet_tileset.png', 107, 107, 300);
    game.load.image('bloque', 'assets/imgs/New enviroment/Tile_5.png');
    game.load.image('spikes', 'assets/imgs/New enviroment/Tile_26.png');
    game.load.image('spikesCollider', 'assets/imgs/New enviroment/Tile_26Collider.png');

    //BackGrounds
    game.load.image('BG_alien_3','assets/imgs/New enviroment/BackGrounds/BG alien 3.jpg');
    game.load.image('BG_space_5','assets/imgs/New enviroment/BackGrounds/BG space 5.jpg');

    //Player
    //game.load.image('player','assets/imgs/New Player/jump/alien_4-jump0Fixed.png');
    game.load.spritesheet('playerSprite','assets/imgs/New Player/jump/player_jump_spritesheet_good.png',441,474,14);
    game.load.image('playerBox','assets/imgs/New Player/jump/playerBox.png');

    //UI
    game.load.image("containerLifeBar", "assets/imgs/New UI/PNG/Main_UI/Health_Bar_Table.png");
    //game.load.image("bigTextBlock", "assets/imgs/UI/BigTextBlock.png");
    game.load.image("lifeBar", "assets/imgs/New UI/PNG/Main_UI/Boss_HP_Bar_2.png");
    //game.load.image("redBlock", "assets/imgs/UI/RedBlock.png");
    //game.load.image("textBlock", "assets/imgs/UI/TextBlock.png");
    game.load.image("playerNameSpace", "assets/imgs/New UI/PNG/Main_UI/Boss_Name_Table.png");

    game.load.image("cristal","assets/imgs/New enviroment/Tile_37ParaJuego.png");

    game.load.text("level",levelsData[currentLevel -1], true);
}

function createPlay(){
    levelConfig = JSON.parse(game.cache.getText('level')); 
    createPlayer();
    createCameraBounds();
    createKeyControls();
    createBlock();
    createAnimations();
    createBackground();

    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

    game.physics.startSystem(Phaser.Physics.ARCADE);
    createUI();

    velocidadTope = 0;
    playerSprite.bringToTop();//Puede que tenga más sentido que no esté así
}

function updatePlay(){
    managePlayerVelocity();
    manageBlockMovement();
    backToMove();
    game.physics.arcade.collide(player, blocks,playerHitsBlock,null,this);//.anchor para cambiar la animación
    game.physics.arcade.collide(player, traps, playerHitsTrap, null, this);

    if(player.body.velocity.y >= velocidadTope)
    {
        velocidadTope = player.body.velocity.y;
        //console.log(velocidadTope);
    }
    spriteUpdate();
    animationsUpdate();

    //if (background.y< 1536 && background.y>= backgoundBaseY-10) 
    background.y = backgoundBaseY + game.camera.y * backgroundMoveFactorY;
}

function createPlayer(){
    let playerPosX = levelConfig.playerStart.x;
    let playerPosY = levelConfig.playerStart.y;
    player = game.add.sprite( playerPosX, playerPosY, 'playerBox');
    game.physics.arcade.enable(player);
    player.body.immovable = true;
    player.scale.setTo(playerScale-0.005,playerScale);
    playerSprite = game.add.sprite( playerPosX - spriteDistance*playerScale-8, playerPosY+10, 'playerSprite');
    playerSprite.scale.setTo(playerScale,playerScale);
    playerSprite.frame = 10;
    playerJumpling = false;
}

function createCameraBounds(){
    game.camera.bounds = (800,600);
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(0, 100, 800, 80);
    //https://phaser.io/examples/v2/camera/deadzone
    
}

function createUI(){
    containerLifeBar = game.add.sprite(0,0,'containerLifeBar');
    lifeBar = game.add.sprite(0,0,'lifeBar');
    playerNameSpace = game.add.sprite(0,0,'playerNameSpace');

    containerLifeBar.scale.setTo(0.4,0.4);
    lifeBar.scale.setTo(0.148, 1.2);
    playerNameSpace.scale.setTo(0.45,0.45);

    containerLifeBar.x = 0;
    containerLifeBar.y = 0;
    lifeBar.x = 2;
    lifeBar.y = 2;
    playerNameSpace.x = 0;
    playerNameSpace.y = 28;

    var styleShowName = { font: "24px Arial", fill: "#ffffff", align: "center" };
    showName = game.add.text(200, 10, nombreJugador, styleShowName);

    containerLifeBar.fixedToCamera = true;
    lifeBar.fixedToCamera = true;
    playerNameSpace.fixedToCamera = true;
    showName.fixedToCamera = true;

    
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
    blocks.createMultiple(numBlocks, 'bloque');

    //The group of traps that harm the player
    traps = game.add.group();
    traps.enableBody = true;
    game.physics.arcade.enable(traps);
    traps.createMultiple(numBlocks, 'spikesCollider');
    traps.callAll('anchor.setTo','anchor',0, 1.0);

    trapShow = game.add.group();
    trapShow.enableBody = true;
    game.physics.arcade.enable(trapShow);
    trapShow.createMultiple(numBlocks, 'spikes');
    trapShow.callAll('anchor.setTo','anchor',0, 1.0);

    //The group of powerups
    powerUps = game.add.group();
    powerUps.enableBody = true;
    game.physics.arcade.enable(powerUps);
    powerUps.createMultiple(numPlatforms, 'cristal');

    //The blocks of at the end of the level
    endBlocks = game.add.group();
    endBlocks.enableBody = true;
    game.physics.arcade.enable(endBlocks);
    endBlocks.createMultiple(blocksPerPlatform, 'bloque');

    blockY = 0;
    let hole;
    trapAppearing = 15;
    powerUpsAppearing = 30;

    //For each platform
    for(var i = 0; i< numPlatforms; i++)
    {
        blockY += levelConfig.platforms[i].distance;
        hole = levelConfig.platforms[i].hole;
        blockX = firstBlockX;
        trapAppearing += 3;

        if(i!=numPlatforms-1)
            for(var j = 0; j < blocksPerPlatform; j++)
                setUpBlock(j,hole);

        //End of the level
        else
            for(var j = 0; j < blocksPerPlatform; j++)
                setUpEndBlock();

    }

}

function createAnimations(){
    playerFlexAnimation = playerSprite.animations.add("flex",[11,12,13,0,1,2,3,4],20,false);
    playerJumpAnimation = playerSprite.animations.add("jump",[5,6,7,8],8,false);
    playerFallAnimation = playerSprite.animations.add("fall",[9,10],6,false);
}

function createBackground(){
    background = game.add.sprite(backgoundBaseX,backgoundBaseY,levelConfig.backgroundName);
    background.sendToBack();
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

            //Will a power up appear here?
            if(Math.floor(Math.random()* 100) <= powerUpsAppearing)
            {
                let itemPower = powerUps.getFirstExists(false);
                if(itemPower)
                {
                    itemPower.reset(blockX+17, blockY);
                    itemPower.body.checkCollision.left = true;
                    itemPower.body.checkCollision.up = true;
                    itemPower.body.checkCollision.right = true;
                    itemPower.body.immovable =true;
                }
            }
        }
        //It's just another block
        else
        {
            item.reset(blockX, blockY);
            item.body.checkCollision.left = true;
            item.body.checkCollision.up = true;
            item.body.checkCollision.right = true;
            item.body.immovable =true;
            item.scale.setTo(0.3, 0.3);

            // Will a trap appear here??
            if(Math.floor(Math.random()* 100) <= trapAppearing)
            {
                let itemTrap = traps.getFirstExists(false);
                if(itemTrap)
                {
                    itemTrap.reset(blockX, blockY);
                    itemTrap.body.checkCollision.left = true;
                    itemTrap.body.checkCollision.up = true;
                    itemTrap.body.checkCollision.right = true;
                    itemTrap.body.immovable =true;
                    itemTrap.scale.setTo(0.3,0.3);
                }

                let imgTrap = trapShow.getFirstExists(false);
                if(itemTrap)
                {
                    imgTrap.reset(blockX, blockY);
                    imgTrap.body.checkCollision.left = true;
                    imgTrap.body.checkCollision.up = true;
                    imgTrap.body.checkCollision.right = true;
                    imgTrap.body.immovable =true;
                    imgTrap.scale.setTo(0.3,0.3);
                }
            }
        }
        blockX+= initBlockX;
    }

}

function setUpEndBlock()
{
    let item = endBlocks.getFirstExists(false);
    if(item)
    {
        item.reset(blockX, blockY);
        item.body.checkCollision.left = true;
        item.body.checkCollision.up = true;
        item.body.checkCollision.right = true;
        item.body.immovable =true;
        item.scale.setTo(0.3,0.3);
    }

    blockX+= initBlockX;
}

function managePlayerVelocity(){
    player.body.velocity.y += playerAcceleration;
    //playerVelocity += playerAcceleration;
}

function playerHitsBlock(player, block){
    //Que tanto en personaje como los bloques tengan colliders muy finos podrian solucionar el problema de que rebote si da en un lado del bloque
    if(block.body.touching.up == true){
        //Si va más rápido que cierto valor, el bloque se rompe
        if(player.body.velocity.y >= VELOCITY_BREAKS_BLOCK)
            block.kill();

        player.body.velocity.y =BOUNCE_CONSTANT;
        //Meter anim aquí
        playerJumpAnimation.play('flex');
        playerJumpling = true;
    }
    else if(block.body.touching.down == true)
        player.body.velocity.y = - player.body.velocity.y 
    else{
        blockMovementDissabled = true;
    }
}

function playerHitsTrap(player, trap)
{
    player.body.velocity.y =BOUNCE_CONSTANT;
    console.log("Tocas una trampa");
}

function spriteUpdate(){
    playerSprite.x = player.x - spriteDistance*playerScale-8;
    playerSprite.y = player.y +10;
}

function animationsUpdate(){
    if(playerJumpling){
        if(playerFlexAnimation.isFinished){
            playerJumpAnimation.play();
        }
        else if(playerJumpAnimation.isFinished){
            playerFallAnimation.play();
            playerJumpling = false;
        }
    }
}

function manageBlockMovement(){//Si el jugador y el bloque chocan en el lado, hacer que no se puedan movel los bloques
    if(!blockMovementDissabled){
        if(cursorRigh.isDown){
            blocks.forEach(movementCursorRight, this);
            traps.forEach(movementCursorRight, this);
            trapShow.forEach(movementCursorRight, this);
            powerUps.forEach(movementCursorRight, this);
            endBlocks.forEach(movementCursorRight, this);
            //playerSprite.scale.setTo(-playerScale,playerScale);
            if(background.x>(-2048+game.width))background.x -= backgroundMoveFactorX;
        }
        if(cursorLeft.isDown){
            blocks.forEach(movementCursorLeft, this);
            traps.forEach(movementCursorLeft, this);
            trapShow.forEach(movementCursorLeft, this);
            powerUps.forEach(movementCursorLeft, this);
            endBlocks.forEach(movementCursorLeft, this);
            //playerSprite.scale.setTo(playerScale,playerScale);
            if(background.x<(-background.x))background.x += backgroundMoveFactorX;
        }
    }  
}

function movementCursorRight(element)
{
    element.body.x -= BLOCK_SPEED;
    if(element.body.x < -initBlockX){
        element.body.x += worldMargin + 2*initBlockX; // += para ajustar su verdadera posicion en relacion con lo demas boques
    }
            
}

function movementCursorLeft(element)
{
    element.body.x += BLOCK_SPEED;
    if(element.body.x > 400 + initBlockX){
        let aux = worldMargin + initBlockX - element.body.x;
        element.body.x = -initBlockX - aux;
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