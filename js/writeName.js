
let backImage;
let btnGoToPlay;

//Mapa de bits donde se escribirá
var bmd;

//Variable string
var nombreJugador;

let writeNameState = {
    preload: preloadWN,
    create: createWN
    //update: updateWN
}

function preloadWN()
{
    game.load.image('backImage','assets/imgs/New enviroment/BackGrounds/Background.png');
    game.load.image('botonplay','assets/imgs/botonPlay.png');
}

function createWN()
{
    console.log("Pantalla Escribe Nombre");

    backImage = game.add.image(-50, 0, 'backImage');
    backImage.scale.setTo(0.35,0.35);

    var style = { font: "48px Arial", fill: "#ffffff", align: "left" };

    let textInfo = game.add.text(20, 100, "Write your \nname: ", style);
    textInfo.fontSize = 48;
    //textInfo.addColor = '#ff00ff';

    btnGoToPlay = game.add.button(100, 500, 'botonplay', startPlay);

    //Creación del mapa de bits
    bmd = game.make.bitmapData(400, 600);
    bmd.context.font = '64px Arial';
    bmd.context.fillStyle = '#ffffff';
    bmd.context.fillText(nombreJugador, 64, 300);
    bmd.addToWorld();

    nombreJugador = "";

    //  Capture all key presses
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    //startPlay();
}

function keyPress(char)
{
    nombreJugador = nombreJugador + char;
    //nombreJugador = nombreJugador + String.fromCharCode(char);

    //Mostrar palabra
    bmd.cls();
    var x = 64;

    for(var i = 0; i < nombreJugador.length; i++)
    {
        var letra = nombreJugador.charAt(i);
        bmd.context.fillText(letra, x, 300);

        x += bmd.context.measureText(letra).width;


    }
}

function startPlay()
{
    game.state.start('play');
}