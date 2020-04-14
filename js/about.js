let aboutState = {
    preload: loadAboutAssets,
    create: showInstructions
};

let authors;

function loadAboutAssets() {
    game.load.image('backButton', 'assets/imgs/back.png');    //la dirección de la imagen del botón de volver
}

function showInstructions() {
    game.add.image(0, 0, 'bg');

    let textTitle = 'PROYECTO EQUIPO COHETE';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '20pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    game.add.text(75, 25, textTitle, styleTitle);

    let credits = 'En colaboración con Marvel Estudios...\n';
    game.add.text(125, game.world.height / 6, credits, {
        font: 'bold 26pt FerrumExtracondensed',
        fill: '#b60404'
    });

    let msgAuthors = 'MADE BY';
    let styleAuthors = {
        font: 'bold 20pt Sniglet',
        fill: '#b60404'
    };
    game.add.text(125, game.world.height / 6 + 60, msgAuthors, styleAuthors);

    authors = game.add.group();
    authors.inputEnableChildren = true;
    authors.onChildInputOver.add(overText, this);
    authors.onChildInputOut.add(outText, this);
    let styleSingleAuthor = {
        font: 'bold 18pt Sniglet',
        fill: '#b60404'
    };

    let author = game.add.text(175, game.world.height / 6 + 110, 'Miguel Ángel Buigues Ros',
        styleSingleAuthor);
    authors.add(author);
    author = game.add.text(175, game.world.height / 6 + 150, 'Juan Luis Moreno Escolástico',
        styleSingleAuthor);
    authors.add(author);
    author = game.add.text(175, game.world.height / 6 + 190, 'Jaime Alfaro Guzman',
        styleSingleAuthor);
    authors.add(author);

    let instructions = 'Aquí van las instrucciones';
    instructions += '';
    instructions += '';
    instructions += '';
    instructions += '';

    let instrucText = game.add.text(0, 0, instructions, {
        font: '14pt Sniglet',
        fill: '#b60404'
    });
    instrucText.setTextBounds(30, game.world.height - 170, game.world.width - 60);
    instrucText.boundsAlignH = 'center';
    instrucText.boundsAlignV = 'middle';
    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = game.world.width - 60;

    let btnPlay = game.add.button(game.world.width / 2, game.world.height - 60, 'backButton',
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