
const BOUNCE_CONSTANT = -170; // indice de rebote
//const NUM_BLOCKS = 7;
const BLOCK_SPEED = 3; // velocidad a la que los bloque se mueven
//const initBlockX = 80;// width of the block
const initBlockX = 77;// width of the block

const initBlockY = 450; //400 + half height of the block
const trapDamage = 0.1;

//Velocidad a la que el jugador rompe un bloque
const VELOCITY_BREAKS_BLOCK = 500;

// BLOCKS
let haveToPutNoBlock = true;
let firstBlockX = -40;
let blockX;
let blockY;
let blocks;
let blockMovementDissabled = false;

//Coordenada de los bloques que se rompen por el jugador
let brokenPlatformY;

//LETTER BLOCKS
let groupLetterBlocks = [];
//let letterArray = [['a','A'],['e','E'],['i','I']];
let letterArray = ['a','e','i','o','u'];

let allowLetterBlocks; //Se permiten o no bloques de letras en este nivel
let letterBlockInPlatform; //En esta plataforma, en vez de hueco, hay letterBlock

//TRAPS
let traps;
let incrementTrapAppearing;
let trapAppearing; //Sirve para medir la proporcionalidad de que aparezcan trampas
let trapShow;

//POWER UPS
let powerUps;
let powerUpsAppearing;
let powerUpAccelerateActive;
let  = false;
const powerAcceleration = 1.5;
let powerUp3Actived;
const speedthreshold = 0.03;

// END OF LEVEL BLOCKS
let endBlocks;
let gameEnded = false;
let worldMargin;

//Player
let player;
let playerLife;
//let playerVelocity = 4;
const playerStandardSpeed = 2;
let playerAcceleration = playerStandardSpeed;
let playerName ="RandomMonster";
let playerSprite;
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
const lifeBarRatio = 0.148;
let playerNameText;
let styleShowName = { font: "12px Arial", fill: "#ffffff", align: "center" };
let styleNumbers = { font: "22px Arial", fill: "#ffffff", align: "center" };
let remainingPlatformsContainer;
let currentLevelContainer;
let powerUpContainer;
let powerUp1Icon;
let powerUpAccelerateIcon;
let powerUp3Icon;
let levelsIndicatorText;
let levelsText;
let levelsNumber;
let RemainingPlatformsIndicatorText;
let RemainingPlatformsText;
let RemainingPlatformsNumber;
let PastPlatforms;
let DistanceToNextPlatform;

//Messages of winning or losing
let messWin;
let messLose;

//Fx
let EXPLOSION_GROUP_SIZE = 30;
let explosions;
let rocksEmitter;

//walking enemy
let walkingenemies;
let numEnemies = 20;
let enemyAppearing = 10;
const crawlSpeed = 0.8;
let allowMovingObstacles;


//cap trap
let allowMegaPowerUps;
let capPowerUp;
let capPowerUpActive = false;
const capPowerAcceleration = 3;
const capPwerUpRate = 50;

//Fall in and fall out
let fallIn;
let fallOut;
const probTpAppear = 20;
let allowTp;
let posFallOut = 0;
let tpNow = false;
let fallOutArray = [];
let platformNum = 0;

//mine turtle en realidad es una spaceship
let mineTurtles;
let allowMineTurlte;
const probTurtle = 20;



let levelConfig;

let levelsData = ['assets/levels/level1.json','assets/levels/level2.json'];

class LetterBlock {
    

    constructor(sprite, assignedLetter)
    {
        this.sprite = sprite;
        this.assignedLetter = assignedLetter;
        this.solid = true; //Mientras sea true, el jugador colisiona con él
    
        this.disappearBlock = game.add.tween(this.sprite).to({
            alpha: 0 //Se agranda al mismo tiempo que desaparece
        }, 500, // Duración: medio segundo
        Phaser.Easing.Linear.None, false, 0, 0, false);

        this.disappearLetter = game.add.tween(this.assignedLetter).to({
            alpha: 0 //Se agranda al mismo tiempo que desaparece
        }, 1000, // Duración: medio segundo
        Phaser.Easing.Linear.None, false, 0, 0, false);
    }

    verifyLetter(letter)
    {
        console.log("Comprobar "+this.assignedLetter.text+" con "+letter);

        if(letter == this.assignedLetter.text)
        {
            this.solid = false;

            this.disappearBlock.start();
            this.disappearLetter.start();

            /*disappear.onComplete.add(function(){
                this.sprite.kill();
            })*/
        }
    }

    movementRight()
    {
        this.sprite.body.x -= BLOCK_SPEED;
        this.assignedLetter.body.x -= BLOCK_SPEED;
        if(this.sprite.body.x < -initBlockX)
        {
            this.sprite.body.x += worldMargin + 2*initBlockX; // += para ajustar su verdadera posicion en relacion con lo demas boques
            this.assignedLetter.body.x += worldMargin + 2*initBlockX;
        }
    }

    movementLeft()
    {
        this.sprite.body.x += BLOCK_SPEED;
        this.assignedLetter.body.x += BLOCK_SPEED;
        if(this.sprite.body.x > 400 + initBlockX)
        {
            let aux = worldMargin + initBlockX - this.sprite.body.x;
            this.sprite.body.x = -initBlockX - aux;
            this.assignedLetter.body.x = -initBlockX - aux;
        }
    }

    movementMouse()
    {
        if(Math.abs(game.input.speed.x)<150)
        {
            this.sprite.body.x -= game.input.speed.x;
            this.assignedLetter.body.x -= game.input.speed.x;
            if(this.sprite.body.x < -initBlockX)
            {
                this.sprite.body.x += worldMargin + 2*initBlockX; // += para ajustar su verdadera posicion en relacion con lo demas boques
                this.assignedLetter.body.x += worldMargin + 2*initBlockX;
            }
            if(this.sprite.body.x > 400 + initBlockX)
            {
                let aux = worldMargin + initBlockX - this.sprite.body.x;
                this.sprite.body.x = -initBlockX - aux;
                this.assignedLetter.body.x = -initBlockX - aux;
            }
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
    game.load.image('bloque', 'assets/imgs/New enviroment/Tile_13.png');
    game.load.image('spikes', 'assets/imgs/mina/mine1_off_Resize.png');
    game.load.image('spikesCollider', 'assets/imgs/mina/mine1_off_ColliderResize.png');
    game.load.image('bloqueLetra', 'assets/imgs/New enviroment/Tile_28.png');
    game.load.image('meta', 'assets/imgs/New enviroment/meta.png');
    game.load.image('camerica', 'assets/imgs/camerica.png');
    game.load.image('hello', 'assets/imgs/spaceship.png');
    
    game.load.image('fallInTo', 'assets/imgs/mina/mine3_on.png');
    game.load.image('fallOutOf', 'assets/imgs/mina/mine3_off_rotated.png');

    //BackGrounds
    game.load.image('BG_alien_3','assets/imgs/New enviroment/BackGrounds/BG alien 3.jpg');
    game.load.image('BG_space_5','assets/imgs/New enviroment/BackGrounds/BG space 5.jpg');

    //Player
    //game.load.image('player','assets/imgs/New Player/jump/alien_4-jump0Fixed.png');
    game.load.spritesheet('playerSprite','assets/imgs/New Player/jump/player_jump_spritesheet_good.png',441,474,14);
    game.load.image('playerBox','assets/imgs/New Player/jump/playerBox.png');

    //FX
    game.load.spritesheet('explosion','assets/imgs/Mina/Explosion_SpriteSheet.png',210,210,58);
    game.load.image('rock','assets/imgs/New enviroment/Tile_17.png')

    //UI
    game.load.image("containerLifeBar", "assets/imgs/New UI/PNG/Main_UI/Health_Bar_Table.png");
    //game.load.image("bigTextBlock", "assets/imgs/UI/BigTextBlock.png");
    game.load.image("lifeBar", "assets/imgs/New UI/PNG/Main_UI/Boss_HP_Bar_2.png");
    //game.load.image("redBlock", "assets/imgs/UI/RedBlock.png");
    //game.load.image("textBlock", "assets/imgs/UI/TextBlock.png");
    game.load.image("playerNameSpace", "assets/imgs/New UI/PNG/Main_UI/Boss_Name_Table.png");
    game.load.image('circularContainer1',"assets/imgs/New UI/PNG/Main_UI/Bonus_BTN_01.png");
    game.load.image('circularContainer2',"assets/imgs/New UI/PNG/Main_UI/Bonus_BTN_02.png");

    game.load.image("cristal","assets/imgs/New enviroment/Tile_37ParaJuego.png");

    game.load.text("level",levelsData[currentLevel -1], true);
    //game.load.text("level",levelsData[1], true);

    // load moving obstacle anim
    game.load.spritesheet('mo0',"assets/imgs/Bicho que anda/run/mo.png", 1056, 636, 16);


}

function createPlay(){

    gameEnded = false;
    console.log("Cargar nivel "+ currentLevel);

    levelConfig = JSON.parse(game.cache.getText('level'));
    allowLetterBlocks = levelConfig.letterBlocks; 
    allowMegaPowerUps = levelConfig.megaPowerUps;
    allowMovingObstacles =levelConfig.movingObstacles;
    levelsNumber = levelConfig.levelNumber;
    allowMineTurlte = levelConfig.allowMineTurlte;
    allowTp = levelConfig.allowTp;
    createPlayer();
    createCameraBounds();
    createKeyControls();
    createBlock();
    createAnimations();
    createBackground();
    createExplosions(EXPLOSION_GROUP_SIZE);
    createEmitter();

    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

    game.physics.startSystem(Phaser.Physics.ARCADE);
    createUI();

    playerLife = 100;
    velocidadTope = 0;
    playerSprite.bringToTop();//Puede que tenga más sentido que no esté así
    RemainingPlatformsNumber = levelConfig.platforms.length;
    PastPlatforms = 0;
    DistanceToNextPlatform = levelConfig.platforms[PastPlatforms];

    //Para capturar los valores de las teclas del teclado, cuando haya LetterBlocks
    if(levelConfig.letterBlocks == true)
    {
        game.input.keyboard.addCallbacks(this, null, null, teclaPulsada);
        //console.log("Hay bloques");
    }

}

function updatePlay(){
    managePlayerVelocity();
    manageBlockMovement();
    backToMove();
    manageUI();
    game.physics.arcade.collide(player, blocks,playerHitsBlock,null,this);//.anchor para cambiar la animación
    game.physics.arcade.overlap(player, traps, playerHitsTrap, null, this);
    game.physics.arcade.collide(player, trapShow, playerHitsTrapShow, null, this);
    game.physics.arcade.collide(player, capPowerUp, playerHitsCapPowerUp, null, this);
    game.physics.arcade.collide(player, walkingenemies, playerHitsTrap, null, this);
    game.physics.arcade.collide(player, mineTurtles, playerHitsTrap, null, this);
    game.physics.arcade.collide(player, powerUps, playerHitspowerUp, null, this);
    game.physics.arcade.collide(player, endBlocks, playerHitsEndBlocks, null, this);
    game.physics.arcade.overlap(walkingenemies, blocks, keeptheenemontheplat, null, this);
    game.physics.arcade.overlap(mineTurtles, blocks, function(mine){ mine.body.velocity.y = 0; mine.body.y-=1}, null, this);
    game.physics.arcade.overlap(player, fallIn, playerHitsFallInto, null, this);
    
    walkingenemies.forEach(chasePlayer, this);
    mineTurtles.forEach(justWander, this);

    for(let i=0; i<groupLetterBlocks.length; i++)
        if(groupLetterBlocks[i].solid == true)
            game.physics.arcade.collide(player, groupLetterBlocks[i].sprite, playerHitsLB, null, this);
        
    
    spriteUpdate();
    animationsUpdate();

    //if (background.y< 1536 && background.y>= backgoundBaseY-10) 
    background.y = backgoundBaseY + game.camera.y * backgroundMoveFactorY;

    if(!gameEnded && player.body.velocity.y <= speedthreshold){
        capPowerUpActive = false;
        powerUpAccelerateActive = false;
    }
    if(capPowerUpActive || powerUpAccelerateActive){
        playerAcceleration = playerStandardSpeed;
    }
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
    game.camera.bounds = (800,400);
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(0, 100, 800, 80);
    //https://phaser.io/examples/v2/camera/deadzone
    
}

function createUI(){
    //Top Left
    containerLifeBar = game.add.sprite(0,0,'containerLifeBar');
    lifeBar = game.add.sprite(0,0,'lifeBar');
    playerNameSpace = game.add.sprite(0,0,'playerNameSpace');

    containerLifeBar.scale.setTo(0.4,0.4);
    lifeBar.scale.setTo(lifeBarRatio, 1.2);
    playerNameSpace.scale.setTo(0.45,0.45);

    containerLifeBar.x = 0;
    containerLifeBar.y = 0;
    lifeBar.x = 2;
    lifeBar.y = 2;
    playerNameSpace.x = 0;
    playerNameSpace.y = 28;

    playerNameText = game.add.text(4, 32, playerName, styleShowName);

    containerLifeBar.fixedToCamera = true;
    lifeBar.fixedToCamera = true;
    playerNameSpace.fixedToCamera = true;
    playerNameText.fixedToCamera = true;
    
    //Botton right
    //Containers && text
    remainingPlatformsContainer = game.add.sprite(0,0,'circularContainer2');
    currentLevelContainer = game.add.sprite(0,0,'circularContainer2');
    powerUpContainer = game.add.sprite(0,0,'circularContainer1');
    levelsIndicatorText = game.add.text(300, 727, "Level", styleShowName);
    RemainingPlatformsIndicatorText = game.add.text(342, 705, "Remaining\nPlatforms", styleShowName);
    levelsText = game.add.text(309, 761, "0", styleNumbers);
    RemainingPlatformsText = game.add.text(365, 761, "0", styleNumbers);

    remainingPlatformsContainer.scale.setTo(0.25,0.25);
    currentLevelContainer.scale.setTo(0.25,0.25);
    powerUpContainer.scale.setTo(0.25,0.25);

    remainingPlatformsContainer.x = 345;
    currentLevelContainer.x = 287.5;
    powerUpContainer.x = 235;
    remainingPlatformsContainer.y = currentLevelContainer.y = powerUpContainer.y = 745;

    remainingPlatformsContainer.fixedToCamera = true;
    currentLevelContainer.fixedToCamera = true;
    powerUpContainer.fixedToCamera = true;
    levelsIndicatorText.fixedToCamera = true;
    RemainingPlatformsIndicatorText.fixedToCamera = true;
    levelsText.fixedToCamera = true;
    RemainingPlatformsText.fixedToCamera = true;

    //Icons
    powerUpAccelerateIcon = game.add.sprite(0,0,'cristal');
    powerUpAccelerateIcon.scale.setTo(0.65,0.65);
    powerUpAccelerateIcon.x = 246.5;
    powerUpAccelerateIcon.y = 752.5;
    powerUpAccelerateIcon.fixedToCamera = true;
    powerUpAccelerateIcon.visible = false;

    //Messages of winning or losing


}

function createExplosions(number){
    explosions = game.add.group();
    explosions.enableBody = true;
    explosions.createMultiple(number, 'explosion');
    explosions.forEach(setupExplosion, this);
}

function setupExplosion(explosion){
    //explosion.anchor.x = 0.5;
    //explosion.anchor.y = 0.5;
    explosion.animations.add('explosion');
}

function playerHitsCapPowerUp(player, power){
    power.destroy();
    playerAcceleration *= capPowerAcceleration;
    capPowerUpActive = true;
    
    game.time.events.add(Phaser.Timer.SECOND * 4, function(){playerAcceleration = playerStandardSpeed; capPowerUpActive = false}, this);
}

function actualizarVida(){
    lifeBar.scale.setTo(lifeBarRatio * playerLife/100, 1.2);
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

    //Fall In
    fallIn = game.add.group();
    fallIn.enableBody = true;
    game.physics.arcade.enable(fallIn);
    fallIn.createMultiple(numPlatforms, 'fallInTo');
    fallIn.callAll('anchor.setTo','anchor',0, 1.0);

    //Fall Out
    fallOut = game.add.group();
    fallOut.enableBody = true;
    game.physics.arcade.enable(fallOut);
    fallOut.createMultiple(numPlatforms, 'fallOutOf');
    fallOut.callAll('anchor.setTo','anchor',0, 1.0);

    //The group of cap powerups
    capPowerUp = game.add.group();
    capPowerUp.enableBody = true;
    game.physics.arcade.enable(capPowerUp);
    capPowerUp.createMultiple(numPlatforms, 'camerica');

    //The blocks of at the end of the level
    endBlocks = game.add.group();
    endBlocks.enableBody = true;
    game.physics.arcade.enable(endBlocks);
    endBlocks.createMultiple(blocksPerPlatform, 'meta');
    //endBlocks.callAll('scale.setTo','scale',1, 2);

    walkingenemies = game.add.group();
    walkingenemies.enableBody = true;
    game.physics.arcade.enable(walkingenemies);
    walkingenemies.createMultiple(numEnemies, 'mo0').frame = 1;

    mineTurtles = game.add.group();
    mineTurtles.enableBody = true;
    game.physics.arcade.enable(mineTurtles);
    mineTurtles.createMultiple(numEnemies, 'hello');

    //The letterBlocks from level 2
    groupLetterBlocks = [];
    
    //allowLetterBlocks = true; 
    //console.log("allowLetterBlocks "+allowLetterBlocks);

    blockY = 0;
    let hole;
    trapAppearing = 15;
    incrementTrapAppearing = 3;
    powerUpsAppearing = 30;

    //For each platform
    for(var i = 0; i< numPlatforms; i++)
    {
        platformNum = i;
        blockY += levelConfig.platforms[i].distance;
        hole = levelConfig.platforms[i].hole;
        blockX = firstBlockX;
        trapAppearing += incrementTrapAppearing;
        letterBlockInPlatform = levelConfig.platforms[i].isThereLetter;
        //console.log("letterBlockInPlatform "+ letterBlockInPlatform);
        if(i>2){
            posFallOut+=levelConfig.platforms[i-3].distance;
            tpNow = true;
        }

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

function createEmitter(){
    rocksEmitter = game.add.emitter(0, 0, 100);
    rocksEmitter.makeParticles('rock');
    rocksEmitter.gravity = 200;
    rocksEmitter.minParticleScale = 0.25;
    rocksEmitter.maxParticleScale = 0.35;
    rocksEmitter.setAlpha(1, 0, 2000);
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
            //console.log("allowLetterBlocks "+levelConfig.letterBlocks);
            //console.log(levelConfig.letterBlocks==true);
            if(allowLetterBlocks==true && letterBlockInPlatform==true)
            {
                console.log("Creating LB");
                let thisLetterBlock = game.add.sprite(blockX, blockY, 'bloqueLetra');
                thisLetterBlock.scale.setTo(0.3, 0.3);
                game.physics.arcade.enable(thisLetterBlock);
                thisLetterBlock.body.immovable = true;
                thisLetterBlock.body.checkCollision.up = true;

                //Assigned letter
                //let letterForBlock = letterArray[Math.floor(Math.random()* letterArray.length)][1];
                let letterForBlock = letterArray[Math.floor(Math.random()* letterArray.length)];

                console.log(letterForBlock);
                let letterText = game.add.text(blockX+40, blockY+40, letterForBlock, styleShowName);
                game.physics.arcade.enable(letterText);
                letterText.fontSize = 48;
                letterText.anchor.setTo(0.5, 0.5);

                //Create object and push it to the array
                let newLetterBlock = new LetterBlock(thisLetterBlock, letterText);
                groupLetterBlocks.push(newLetterBlock);

            }


            //Will a power up appear here?
            else if(Math.floor(Math.random()* 100) <= powerUpsAppearing)
            {
                if(allowMegaPowerUps && Math.floor(Math.random()* 100) <= capPwerUpRate){
                    let itemPower = capPowerUp.getFirstExists(false);
                    if(itemPower)
                    {
                        itemPower.reset(blockX, blockY-5);
                        itemPower.scale.setTo(0.18, 0.18);
                        itemPower.body.checkCollision.left = true;
                        itemPower.body.checkCollision.up = true;
                        itemPower.body.checkCollision.right = true;
                        itemPower.body.immovable =true;
                    }
                }
                else{
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
            
            //will appear a teleporter
            else if(allowTp && tpNow && Math.floor(Math.random()* 100) <= probTpAppear){
                
                let redTp = fallIn.getFirstExists(false);
                if(redTp)
                { 
                    if(currentBlock == levelConfig.platforms[platformNum-3].hole && currentBlock+1 == hole){
                        redTp.reset(blockX-90, blockY+20);
                    }
                    else{
                        redTp.reset(blockX-10, blockY+20);
                    }
                    redTp.scale.setTo(.2,.15);
                    redTp.body.checkCollision.left = false;
                    redTp.body.checkCollision.up = true;
                    redTp.body.checkCollision.right = false;
                    redTp.body.immovable =true;
                }
                
                let blueTp = fallOut.getFirstExists(false);
                if(blueTp)
                { 
                    fallOutArray.push(blueTp);
                    blueTp.anchor.setTo(0.5,0.5);
                    if(currentBlock == levelConfig.platforms[platformNum-3].hole){
                        blueTp.reset(blockX+120, posFallOut+50);
                    }
                    else{
                        blueTp.reset(blockX+40, posFallOut+50);
                    }
                    blueTp.scale.setTo(.2,.15);
                    blueTp.body.immovable =true;
                }
            }
            else if(Math.floor(Math.random()* 100 <= 100)){//enemyAppearing)){//aparecera un walking enemy?
                if(allowMineTurlte && Math.floor(Math.random()* 100 <= probTurtle)){
                    let wEnemy = mineTurtles.getFirstExists(false);
                    if(wEnemy)
                    {
                        wEnemy.reset(blockX, blockY-70);
                        wEnemy.scale.setTo(0.15,0.15);
                        wEnemy.body.checkCollision.left = true;
                        wEnemy.body.checkCollision.up = true;
                        wEnemy.body.checkCollision.right = true;
                        wEnemy.body.checkCollision.down = true;
                        wEnemy.body.velocity.x = 50;
                       
                    }
                }
                else /*if(allowMovingObstacles)*/{

                    let wEnemy = walkingenemies.getFirstExists(false);
                    if(wEnemy)
                    {

                        wEnemy.reset(blockX, blockY-70);
                        wEnemy.scale.setTo(0.05,0.05);
                        wEnemy.body.bounce.setTo(0,0.2);
                        wEnemy.body.checkCollision.left = true;
                        wEnemy.body.checkCollision.up = true;
                        wEnemy.body.checkCollision.right = true;
                        wEnemy.body.checkCollision.down = true;
                        wEnemy.body.velocity.y = 20;
                        addAnim(wEnemy);
                    }
                }
            }
        }
        blockX+= initBlockX;
    }

}

function addAnim(enemy){
    enemy.animations.add('mo');
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

//Se pulsa una tecla del teclado
//Se comprueban los LetterBlocks cercanos
function teclaPulsada(char)
{
    console.log("Pulso");
    for(let i=0; i<groupLetterBlocks.length; i++)
    {   let posInScreen = groupLetterBlocks[i].sprite.body.y-game.camera.y;
        if(posInScreen>0 && posInScreen<game.camera.height)
            groupLetterBlocks[i].verifyLetter(char);
        
    }
}

function managePlayerVelocity(){
    player.body.velocity.y += playerAcceleration;
    //playerVelocity += playerAcceleration;
}


function playerHitsBlock(player, block){
    
    //Que tanto en personaje como los bloques tengan colliders muy finos podrian solucionar el problema de que rebote si da en un lado del bloque
    if(block.body.touching.up == true){

        //console.log(block.body.y);
        //Si va más rápido que cierto valor, el bloque se rompe
        if(player.body.velocity.y >= VELOCITY_BREAKS_BLOCK)
        {
            let destroyedBlocks = 0, destroyedTraps = 0, destroyedShowTraps = 0;
            brokenPlatformY = block.body.y;
            blocks.forEach(function(everyBlock)
            {
                if(everyBlock.body.y == brokenPlatformY)
                {
                    throwRocks(everyBlock);
                    everyBlock.kill();
                    destroyedBlocks++;
                }
            });
            //Las trampas también tienen que desaparecer
            traps.forEach(function(everyTrap)
            {
                if(everyTrap.body.y == brokenPlatformY)
                {
                    everyTrap.kill();
                    destroyedTraps++;
                };
            });
            trapShow.forEach(function(everyShowTrap)
            {
                if(everyShowTrap.body.y == brokenPlatformY)
                {
                    everyShowTrap.kill();
                    destroyedShowTraps++;
                }            
            });

            console.log("Blocks: "+destroyedBlocks+", Traps: "+destroyedTraps+", ShowTraps: "+ destroyedShowTraps);
        }

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

function throwRocks(element){
    rocksEmitter.x = element.body.center.x;
    rocksEmitter.y = element.body.center.y;
    rocksEmitter.start(true, 2000, null, 10);
}

function playerHitsEndBlocks(player, endBlock)
{
    //Mostrar mensaje de victoria
    //Temporizador para tardar un poco en pasar al siguiente nivel
    //Fade out opcional

    nextLevel();

}

function playerHitsLB(player, letterBlock)
{
    if(letterBlock.body.touching.up == true)
    {
        
        player.body.velocity.y =BOUNCE_CONSTANT;
        //Meter anim aquí
        playerJumpAnimation.play('flex');
        playerJumpling = true;
    }
    else if(letterBlock.body.touching.down == true)
        player.body.velocity.y = - player.body.velocity.y 
    else{
        blockMovementDissabled = true;
    }
}

function playerHitsTrap(player, trap)
{
    if(capPowerUpActive){
        capPowerUpActive = false;
        displayExplosion(trap);
        trap.destroy();
    }
    else{
        displayExplosion(trap);
        trap.destroy();
        playerLife -= trapDamage* player.body.velocity.y;
        player.body.velocity.y =BOUNCE_CONSTANT;
        actualizarVida();
    }
    
}

function justWander(turtle){
    if(Math.random() * 100 <= 0.1){
        turtle.body.velocity.x *=-1;
    }

}
function playerHitsTrapShow(player, trap){
    game.add.tween(trap).to( { alpha: 0 }, 150, "Linear", true);

}

function playerHitsFallInto(player, fallin){
    let maAux = 0;
    let falloutaux = fallOutArray[0];
    while(maAux < fallOutArray.length && !(fallin.body.y - falloutaux.body.y > 600 && fallin.body.y - falloutaux.body.y < 1500)){
        falloutaux = fallOutArray[maAux]
        console.log(maAux)
        while(!falloutaux && maAux < fallOutArray.length){
            maAux++;
        }
        maAux++;
    }

    if(maAux >= fallOutArray.length){
        displayExplosion(fallin);
        fallin.destroy();
    }
    else{
        player.body.y = falloutaux.body.y;
    }
    

}

function keeptheenemontheplat(enem, plat){
    if(enem.body.touching.down){
        enem.body.velocity.y = 0; 
        enem.body.y-=1;
    }
}
function playerHitspowerUp(player, powerUp){
    powerUp.destroy();
    playerAcceleration *= powerAcceleration;
    powerUpAccelerateActive = true;

    game.time.events.add(Phaser.Timer.SECOND * 4, function(){playerAcceleration = playerStandardSpeed; powerUpAccelerateActive = false}, this);
    //var timedEvent = this.time.delayedCall(3000, function(){playerAcceleration = 2; powerUpAccelerateActive = false}, [], this);
    //var timedEvent = this.time.addEvent({ delay: 500, callback: function(){playerAcceleration = 2; powerUpAccelerateActive = false}, callbackScope: this, loop: true });
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

function manageUI(){
    if (player.body.y >= (DistanceToNextPlatform+10)){
        PastPlatforms+=1;
        DistanceToNextPlatform += levelConfig.platforms[PastPlatforms];
        RemainingPlatformsNumber-= 1;
    }
    //RemainingPlatformsNumber = 20 - Phaser.Math.snapToFloor((player.body.y +1)/200,1);//Corregir, no se cada cuanto pasas de bloque
    if(powerUpAccelerateActive){
        powerUpAccelerateIcon.visible = true;
    }
    else{
        powerUpAccelerateIcon.visible = false;
    }
    updateText();
}
function updateText(){
    levelsText.setText(levelsNumber);
    RemainingPlatformsText.setText(RemainingPlatformsNumber);
}

function manageBlockMovement(){//Si el jugador y el bloque chocan en el lado, hacer que no se puedan movel los bloques
    if(!blockMovementDissabled){
        if(cursorRigh.isDown/* || game.input.speed.x > 0*/){
            blocks.forEach(movementCursorRight, this);
            traps.forEach(movementCursorRight, this);
            trapShow.forEach(movementCursorRight, this);
            powerUps.forEach(movementCursorRight, this);
            endBlocks.forEach(movementCursorRight, this);
            explosions.forEach(movementCursorRight,this);
            walkingenemies.forEach(movementCursorRight,this);
            capPowerUp.forEach(movementCursorRight,this);
            mineTurtles.forEach(movementCursorRight,this);
            fallIn.forEach(movementCursorRight,this);
            fallOut.forEach(movementCursorRight,this);
            for(let i=0; i<groupLetterBlocks.length; i++)
                groupLetterBlocks[i].movementRight();
            //playerSprite.scale.setTo(-playerScale,playerScale);
            if(background.x>(-2048+game.width))background.x -= backgroundMoveFactorX;
        }
        if(cursorLeft.isDown/* || game.input.speed.x < 0*/){
            blocks.forEach(movementCursorLeft, this);
            traps.forEach(movementCursorLeft, this);
            trapShow.forEach(movementCursorLeft, this);
            powerUps.forEach(movementCursorLeft, this);
            endBlocks.forEach(movementCursorLeft, this);
            explosions.forEach(movementCursorLeft,this);
            walkingenemies.forEach(movementCursorLeft,this);
            capPowerUp.forEach(movementCursorLeft,this);
            mineTurtles.forEach(movementCursorLeft,this);
            fallIn.forEach(movementCursorLeft,this);
            fallOut.forEach(movementCursorLeft,this);
            for(let i=0; i<groupLetterBlocks.length; i++)
                groupLetterBlocks[i].movementLeft();
            //playerSprite.scale.setTo(playerScale,playerScale);
            if(background.x<(-background.x))background.x += backgroundMoveFactorX;
        }

        // Ajustando con la velocidad del ratón
        if(game.input.activePointer.leftButton.isDown) //Botón izquierdo del ratón pulsado
        {
            blocks.forEach(movementMouse, this);
            traps.forEach(movementMouse, this);
            trapShow.forEach(movementMouse, this);
            powerUps.forEach(movementMouse, this);
            endBlocks.forEach(movementMouse, this);
            explosions.forEach(movementMouse,this);
            walkingenemies.forEach(movementMouse,this);
            mineTurtles.forEach(movementMouse,this);
            capPowerUp.forEach(movementMouse,this);
            fallOut.forEach(movementMouse,this);
            fallIn.forEach(movementMouse,this);
            for(let i=0; i<groupLetterBlocks.length; i++)
                groupLetterBlocks[i].movementMouse();
            //playerSprite.scale.setTo(-playerScale,playerScale);
            if(background.x>(-2048+game.width))background.x -= backgroundMoveFactorX;
            if(background.x<(-background.x))background.x += backgroundMoveFactorX;

        }
        
    }  
}

function chasePlayer(element){
    if(element.body.touching.down && element.body.y - player.body.y <=200){
        element.animations.play('mo', true);
        if(player.body.x-element.body.x >0){
            element.body.x += crawlSpeed;
        }
        else{
            element.body.x -= crawlSpeed;
        }
    }
    element.body.velocity.y  += 100;
}

function displayExplosion(trap) {
    let explosion = explosions.getFirstExists(false);
    let x = trap.body.center.x - explosion.width/2;
    let y = trap.body.center.y - explosion.height*0.735;
    explosion.reset(x, y);
    //explosion.bringToTop();
    explosion.play('explosion', 30, false, true);
}

// MOVIMIENTO CON LOS BOTONES
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

// MOVIMIENTO CON EL RATÓN
function movementMouse(element)
{
    if(Math.abs(game.input.speed.x)<150)
    {
        element.body.x -= game.input.speed.x;
        if(element.body.x < -initBlockX){
            element.body.x += worldMargin + 2*initBlockX; // += para ajustar su verdadera posicion en relacion con lo demas boques
        }
        if(element.body.x > 400 + initBlockX){
            let aux = worldMargin + initBlockX - element.body.x;
            element.body.x = -initBlockX - aux;
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

function playerIsDead()
{
    playerFallAnimation.play();
    player.x = levelConfig.playerStart.x;
    player.y = levelConfig.playerStart.y;

    //Poner vida del jugador a tope y actualizar lifeBar
}

function resetInput()
{
    //game.input.keyboard.enabled = false;
    game.input.enabled = false;
    cursorLeft.reset(true);
    cursorRigh.reset(true);

    
}

function clearLevel()
{
    //En esta función se borrar todos los elementos para volver a
    //crearlos en el siguiente nivel

    //Borrar LetterBlocks (si hay)
    if(allowLetterBlocks == true)
    {
        for(let i=0; i<groupLetterBlocks.length; i++)
        {
            groupLetterBlocks[i].assignedLetter.destroy();
            groupLetterBlocks[i].sprite.destroy();
        }
        groupLetterBlocks = [];
    }

    //Borrar bloques, trampas y powerups
    blocks.removeAll(true);
    traps.removeAll(true);
    trapShow.removeAll(true);
    endBlocks.removeAll(true);
    powerUps.removeAll(true);
    walkingenemies.removeAll(true);
    capPowerUp.removeAll(true);
    mineTurtles.removeAll(true);
    fallIn.removeAll(true);
    fallOut.removeAll(true);

    //Borrar elementos de UI
    lifeBar.destroy();
    containerLifeBar.destroy();
    playerNameText.destroy();
    playerNameSpace.destroy();

    tpNow = false;
    posFallOut = 0;
    //Borrar jugador
    player.destroy();
}

function nextLevel()
{
    gameEnded = true;
    //El jugador va a pasar al siguiente nivel o vuelve a la pantalla 
    //de start si ya ha acabado el juego
    clearLevel();
    currentLevel++;

    if(currentLevel>levelsData.length)
    {
        game.state.start('start');
    }
    else
    {
        game.input.enabled = true;
        game.state.start('play');
    }
}