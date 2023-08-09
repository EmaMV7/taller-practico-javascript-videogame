const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

document.addEventListener('keyup', function(event) {
    if(event.key == 'ArrowUp' || event.key == 'KeyW') moveUp();
    else if (event.key == 'ArrowLeft' || event.key == 'KeyA') moveLeft();
    else if (event.key == 'ArrowRight' || event.key == 'KeyD') moveRight();
    else if (event.key == 'ArrowDown' || event.key == 'KeyS') moveDown();
})

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

window.addEventListener('load', adjustScreen);
window.addEventListener('resize', adjustScreen);

let canvasSize;
let elemSize;

const playerPosition= {
    x : undefined,
    y : undefined
}

function startGame(){

    game.font = elemSize + 'px Arial'
    game.textAlign = "";

    map = maps[0]
    mapRow = map.trim().split('\n')
    mapRowCols = mapRow.map(element => element.trim().split(''))

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            emoji = emojis[col]
            PosX = elemSize * (colI )
            PosY = elemSize * (rowI + 1)
            
            if(col == 'O'){
                playerPosition.x = PosX
                playerPosition.y = PosY 
                console.log(playerPosition)
            }

            game.fillText(emoji, PosX, PosY)
        })
    });
}

function adjustScreen(){

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7;
    }else{
        canvasSize = window.innerHeight * 0.7;
    }
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elemSize = (canvasSize / 10) - 1.5;

    startGame()
}


function moveUp(){
    console.log('up')
}
function moveLeft(){
    console.log('left')
}
function moveRight(){
    console.log('right')
}
function moveDown(){
    console.log('down')
}

