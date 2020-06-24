let aboutState = {
    preload: loadAboutAssets,
    create: showInstructions
};

let authors;
let btnBack;

function loadAboutAssets() {
    game.load.image('botonback', 'assets/imgs/New UI/PNG/Buttons/Back.png');
    game.load.image("background", "assets/imgs/New enviroment/BackGrounds/BG space 2.jpg")
}

function showInstructions() {
    background = game.add.image(0,0,'background');
    background.scale.setTo(0.6,0.6);

    let textTitle = 'GAME ABOUT FALLING';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '20pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    game.add.text(55, 25, textTitle, styleTitle);

    let credits = 'Make the ball go as\nfast as possible to the\nbottom and avoidall \nthe obstacles';
    game.add.text(25, game.world.height / 6, credits, {
        font: 'bold 26pt FerrumExtracondensed',
        fill: '#b60404'
    });

    let msgAuthors = 'MADE BY';
    let styleAuthors = {
        font: 'bold 20pt Sniglet',
        fill: '#b60404'
    };
    game.add.text(125, game.world.height / 2 , msgAuthors, styleAuthors);

    authors = game.add.group();
    authors.inputEnableChildren = true;
    authors.onChildInputOver.add(overText, this);
    authors.onChildInputOut.add(outText, this);
    let styleSingleAuthor = {
        font: 'bold 18pt Sniglet',
        fill: '#b60404'
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
    game.state.start('start');
}

function overText(text, pointer) {
    text.fill = '#0e0eb3';
}

function outText(text, pointer) {
    text.fill = '#b60404';
}