


let instructionsState = {
    preload: cargaAssets,
    create: muestraPantalla,
    //update: updateNivel
};



function cargaAssets() {
    game.load.image('botonback', 'assets/imgs/back.png');
}

function muestraPantalla() {

    btnBack = game.add.button(10,10,'botonback', onBackButtonPressed);
    
}



