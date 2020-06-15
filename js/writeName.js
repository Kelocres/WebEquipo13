
let backImage;
let btnGoToPlay;

//Mapa de bits donde se escribirá
var bmd;
let key_backspace;
let key_intro

//Variable string
var nombreJugador;

let botonesNombres = [];

//Estilo genérico
var style = { font: "40px Arial", fill: "#ffffff", align: "left" };

let writeNameState = {
    preload: preloadWN,
    create: createWN
}

class NameForUser
{
    
    constructor(imagen, nombre)
    {
        this.nombre = nombre;

        //this.button = game.add.button(this.x,this.y,'boton',this.cambiarNombre);
        this.image = imagen;
        this.showNombre = game.add.text(this.x+10, this.y+30, this.nombre, style);
        //console.log(this.nombre);
    }

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
    let predefinidos = ["Captain Rogers","Useless Ironman","I am a person"];

    for(let i=0; i<predefinidos.length; i++)
    {
        let imagenBoton = game.add.image(10,alturasbotones[i], 'boton');
        let nuevoBoton = new NameForUser(imagenBoton, predefinidos[i]);
        nuevoBoton.imagen.inputEnabled = true;
        
        botonesNombres.push(nuevoBoton);
    }    

    btnGoToPlay = game.add.button(100, 700, 'botonplay', startPlay);

    //Creación del mapa de bits
    bmd = game.make.bitmapData(400, 800);
    bmd.context.font = '64px Arial';
    bmd.context.fillStyle = '#ffffff';
    bmd.context.fillText(nombreJugador, 64, 600);
    bmd.addToWorld();

    nombreJugador = "";

    key_backspace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    key_backspace.onDown.add(borrarLetra, this);

    key_intro = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    key_intro.onDown.add(startPlay, this);

    //  Capture all key presses
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    //startPlay();
}


function borrarLetra()
{
    //console.log("Borrar");
    nombreJugador = nombreJugador.substring(0,nombreJugador.length-1);
    changeName();
}
    

function keyPress(char)
{
    nombreJugador = nombreJugador + char;
    //nombreJugador = nombreJugador + String.fromCharCode(char);

    changeName();
   
}

function changeName()
{
        //Mostrar palabra
        bmd.cls();
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
    game.state.start('play');
}