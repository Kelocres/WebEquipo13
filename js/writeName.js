
let backImage;
let btnGoToPlay;

//Mapa de bits donde se escribirá
var bmd;
let key_backspace;
let key_intro

//Variable string
var nombreJugador;

let botonNombre1, botonNombre2, botonNombre3;
let textoNombre1, textoNombre2, textoNombre3;
let predefinidos = ["Captain Rogers","Useless Ironman","I am a person"];

//Estilo genérico
var style = { font: "40px Arial", fill: "#ffffff", align: "left" };

let writeNameState = {
    preload: preloadWN,
    create: createWN
}


function preloadWN()
{
    game.load.image('backImage','assets/imgs/New enviroment/BackGrounds/Background.png');
    game.load.image('botonplay','assets/imgs/botonPlay.png');
    game.load.image('boton','assets/imgs/boton.png');
}

function createWN()
{
    console.log("Pantalla Escribe Nombre");

    backImage = game.add.image(-50, 0, 'backImage');
    backImage.scale.setTo(0.35,0.35);

    

    let textInfo1 = game.add.text(10, 50, "Choose a user name: ", style);
    
    let textInfo2 = game.add.text(20, 400, "Or write your name: ", style);
    //textInfo2.fontSize = 40;
    //textInfo.addColor = '#ff00ff';

    //Botoncitos de nombres
    let alturasbotones = [100, 200, 300];
    //Nombres predifinidos
    

   //Botón de nombre 1
    botonNombre1 = game.add.button(30, alturasbotones[0], 'boton', escribirPredefinido1);
    botonNombre1.scale.setTo(1.3,1);
    textoNombre1 = game.add.text(40, alturasbotones[0], predefinidos[0], style);

    //Botón de nombre 2
    botonNombre2 = game.add.button(30, alturasbotones[1], 'boton', escribirPredefinido2);
    botonNombre2.scale.setTo(1.3,1);
    textoNombre2 = game.add.text(40, alturasbotones[1], predefinidos[1], style);

    //Botón de nombre 3
    botonNombre3 = game.add.button(30, alturasbotones[2], 'boton', escribirPredefinido3);
    botonNombre3.scale.setTo(1.3,1);
    textoNombre3 = game.add.text(40, alturasbotones[2], predefinidos[2], style);

    btnGoToPlay = game.add.button(100, 700, 'botonplay', startPlay);

    //Creación del mapa de bits
    bmd = game.make.bitmapData(400, 800);
    bmd.context.font = '64px Arial';
    bmd.context.fillStyle = '#ffffff';
    bmd.context.fillText(nombreJugador, 64, 600);
    bmd.addToWorld();

    nombreJugador;

    key_backspace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    key_backspace.onDown.add(borrarLetra, this);

    key_intro = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    key_intro.onDown.add(startPlay, this);

    //  Capture all key presses
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    //startPlay()
    if(nombreJugador!=null) changeName();
}


function borrarLetra()
{
    //console.log("Borrar");
    nombreJugador = nombreJugador.substring(0,nombreJugador.length-1);
    changeName();
}

//Botones de nombres 

function escribirPredefinido1()
{
    nombreJugador = predefinidos[0];
    changeName();
}
function escribirPredefinido2()
{
    nombreJugador = predefinidos[1];
    changeName();
}
function escribirPredefinido3()
{
    nombreJugador = predefinidos[2];
    changeName();
}
    

function keyPress(char)
{
    if(nombreJugador==null) nombreJugador = "";

    if(nombreJugador.length < 20) nombreJugador = nombreJugador + char;
    //nombreJugador = nombreJugador + String.fromCharCode(char);

    changeName();
   
}

function changeName()
{
        //Mostrar palabra
        bmd.cls();

        //Cambiar tamaño fuente para los nombres largos
        if(nombreJugador.length<7)           bmd.context.font = '64px Arial';
        else if(nombreJugador.length<11)     bmd.context.font = '50px Arial';
        else if(nombreJugador.length<15)     bmd.context.font = '40px Arial';
        else                                 bmd.context.font = '35px Arial';

        var x = 64;
    
        for(var i = 0; i < nombreJugador.length; i++)
        {
            var letra = nombreJugador.charAt(i);
            bmd.context.fillText(letra, x, 600);
    
            x += bmd.context.measureText(letra).width;
    
    
        }
}

function startPlay()
{
    currentLevel = 1;
    if(nombreJugador!=null && nombreJugador!="") game.state.start('play');
}