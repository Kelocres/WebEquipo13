const GAME_STAGE_WIDTH = 400;
const GAME_STAGE_HEIGHT = 800;

let game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.CANVAS, 'gamestage');

// Entry point
window.onload = startGame;

function startGame() {
    game.state.add('start', startState);
    game.state.add('play', playState);
    game.state.add('about', aboutState);
    game.state.add('endgame', endState);
    game.state.add('instrucions', instructionsState);

    game.state.start('start');
}