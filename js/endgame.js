let endState = {
    create: createEndGame,
    update: updateEndGame,
}

let pressR;

function createEndGame(){
    let textTitle = 'PRESS R TO PLAY AGAIN';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '20pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };
    game.add.text(55, 25, textTitle, styleTitle);

    pressR = game.input.keyboard.addKey(Phaser.Keyboard.R);
}

function updateEndGame(){
    checkR();
}


function checkR (){
    if(pressR.isDown){
        currentLevel = 1;
        game.state.start('play');
    }
}

