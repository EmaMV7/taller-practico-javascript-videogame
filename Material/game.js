// variebles
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

// movements
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

// start
let canvasSize;
let elemSize;
let level = 1;
let collisionBomb;
let life = 1; 

console.log('nivel: ' + level)
console.log('vidas: ' + life)

const playerPosition= {
    x : undefined,
    y : undefined
}
const giftPosition= {
    x : undefined,
    y : undefined
}
const bombPosition= {
    x : undefined,
    y : undefined
}
const doorPosition= {
    x : undefined,
    y : undefined
}


function startGame(){
    game.font = elemSize + 'px Arial'
    game.textAlign = "";

    map = maps[level]
    locateBombs = []

    mapRow = map.trim().split('\n')
    mapRowCols = mapRow.map(element => element.trim().split(''))

    game.clearRect(0,0,canvasSize,canvasSize)

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            emoji = emojis[col]
            PosX = parseInt(elemSize * (colI))
            PosY = parseInt(elemSize * (rowI + 1))
            
            // player spawn
            if(col == 'O'){
                doorPosition.x = PosX
                doorPosition.y = PosY
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = PosX
                    playerPosition.y = PosY
                }
            }else if  (col == 'I'){
                giftPosition.x = PosX
                giftPosition.y = PosY

            }else if (col == 'X'){
                
                bombPosition.x = PosX
                bombPosition.y = PosY   
                    
                Bombs = [PosX, PosY]
                locateBombs.push(Bombs)       
            }
          
            game.fillText(emoji, PosX, PosY)
        })
    });

    movePlayer();
}

function movePlayer(){  

    let reset = 0;

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
    
    locateBombs.forEach( e => {
        if(e[0] == playerPosition.x && e[1] == playerPosition.y){            
            setTimeout(() => {                
                console.log('explosion');
                game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);  
                
            dead();                           
            },20);
                
        }
    });


    const giftCollisionX = playerPosition.x == giftPosition.x
    const giftCollisionY = playerPosition.y == giftPosition.y;
    const gitfCollision = giftCollisionX && giftCollisionY;    
    
    if (gitfCollision){
        level ++;
        reset = 1;
    } 
    
    //reset
    if(reset == 1){
        reset = 0
        startGame()
    }
}

function adjustScreen(){

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7;
    }else{
        canvasSize = window.innerHeight * 0.7;
    }
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    // elemSize = cada cuadradito del canvas
    elemSize = parseInt((canvasSize / 10) - 1);

    startGame()
}

function moveUp(){
    if(Math.floor(playerPosition.y - elemSize) > elemSize - 1){
        playerPosition.y -= elemSize;
        startGame();
    }
}
function moveLeft(){
    if(Math.floor(playerPosition.x - elemSize) > - 1){
        playerPosition.x -= elemSize;
        startGame();
    }


}
function moveRight(){
    if(Math.floor(playerPosition.x - elemSize) < (elemSize * 8) - 1){
        playerPosition.x += elemSize;        
        startGame();
    }
}
function moveDown(){

    if(Math.floor(playerPosition.y - elemSize) < (elemSize * 9) - 1){
        playerPosition.y += elemSize;
        startGame();
    }
}

function dead(){
    life -= 1    

    console.log('nivel: ' + level)
    console.log('vidas: ' + life)
    if(life == 0){
        //  gameOver()
        life = 3;
        level = 0;
    }else{  
        setTimeout(() => {

            playerPosition.x = doorPosition.x
            playerPosition.y = doorPosition.y
            
            startGame()
            console.log('muerto');
            
        }, 250)
    }
}


