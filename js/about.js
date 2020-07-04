let aboutState = {
    preload: loadAboutAssets,
    create: showInstructions
};

let authors;
let btnBack;

//Estilo texto pequeño
var styleInfo = { font: "30px Arial", fill: "#ffffff", align: "left" };

function loadAboutAssets() {
    game.load.image('botonback', 'assets/imgs/New UI/PNG/Buttons/Back.png');
    game.load.image("background", "assets/imgs/New enviroment/BackGrounds/BG space 2.jpg")

    //Audio
    game.load.audio('Standard_Click_Sound','assets/audio/Standard_Click_Sound.wav');
    game.load.audio('Back_Click_Sound','assets/audio/Back_Click_Sound.wav');
}

function showInstructions() {
    background = game.add.image(0,0,'background');
    background.scale.setTo(0.6,0.6);

    let textTitle = game.add.text(20, 25, 'MINE DETECTOR', style);

    let credits = 'Make the ball go as\nfast as possible to the\nbottom and avoidall \nthe obstacles';
    game.add.text(25, game.world.height / 6, credits, styleInfo);

    let msgAuthors = 'CODE MADE BY';
    game.add.text(40, game.world.height / 2 , msgAuthors, style);

    authors = game.add.group();
    authors.inputEnableChildren = true;
    authors.onChildInputOver.add(overText, this);
    authors.onChildInputOut.add(outText, this);
    let styleSingleAuthor = {
        font: 'bold 26px Arial',
        fill: '#ffffff'
    };

    let author = game.add.text(25, game.world.height / 2 + 50, 'Miguel Ángel Buigues Ros',
        styleSingleAuthor);
    authors.add(author);
    author = game.add.text(25, game.world.height / 2 + 90, 'Dominik Konrad Kwiek',
        styleSingleAuthor);
    authors.add(author);
    author = game.add.text(25, game.world.height / 2 + 130, 'David Ballesta Perez',
        styleSingleAuthor);
    authors.add(author);

    6988888
    let btnPlay = game.add.button(game.world.width / 2, game.world.height - 60, 'botonback',
        onBackButtonPressed);
    btnPlay.anchor.setTo(0.5, 0.5);
}

function onBackButtonPressed() {
    back_click_sound.play();
    game.state.start('start');
}

function overText(text, pointer) {
    text.fill = '#0e0eb3';
}

function outText(text, pointer) {
    text.fill = '#ffffff';
}