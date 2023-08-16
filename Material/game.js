// variebles
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const record = document.querySelector('.record');
const hearts = document.querySelector('.hearts');
const timer = document.querySelector('.timer');
const score = document.querySelector('.points');
const background = document.querySelector('.game-container');
const gameOver = document.querySelector('.dead');
const rPoints = document.querySelector('.rPoints')

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
let level = 0;
let collisionBomb;
let heart = 3; 
hearts.textContent = ['💗💗💗'];

//records
let bestRecord;
let currentTime;
let bestPoints = 0;
let currentPoints= 0;

// Cronometro - Timer
let startTime;
let isRunning = false;

function formatTime(timeInSecond){
    seconds = (timeInSecond % 60);
    minutes = Math.floor((timeInSecond % 3600) / 60);
    hours = Math.floor(timeInSecond / 3600);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimer(){
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timer.textContent = formatTime(elapsedTime);

    cTime = formatTime(elapsedTime);

    // Is running true?
    if (isRunning) {
        requestAnimationFrame(updateTimer);
    }
}

// Positions
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
    currentPoints = 0;
    score.textContent = currentPoints;
    cTime = '00:00:00'
    timer.textContent = cTime;    
}

function drawGame(){
    
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
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
    
    locateBombs.forEach( e => {
        if(e[0] == playerPosition.x && e[1] == playerPosition.y){            
            setTimeout(() => {              
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
        currentPoints ++;
        score.textContent = currentPoints;    
        reset = 1;
        drawGame();
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

    drawGame()
}

function runTimer(){    
    background.classList.remove('dead')
    if(heart == -1){
        hearts.textContent = ['💗💗💗'];        
        heart = 3;
    }
    // Is running false?
    if(!isRunning){
        isRunning = true;
        startTime = Date.now() 
        updateTimer();
    }       
}

function moveUp(){
    if(Math.floor(playerPosition.y - elemSize) > elemSize - 1){
        playerPosition.y -= elemSize;
        drawGame();
    }
    runTimer()
}
function moveLeft(){
    if(Math.floor(playerPosition.x - elemSize) > - 1){
        playerPosition.x -= elemSize;
        drawGame();
    }
    runTimer()
}
function moveRight(){
    if(Math.floor(playerPosition.x - elemSize) < (elemSize * 8) - 1){
        playerPosition.x += elemSize;        
        drawGame();
    }
    runTimer()
}
function moveDown(){
    if(Math.floor(playerPosition.y - elemSize) < (elemSize * 9) - 1){
        playerPosition.y += elemSize;
        drawGame();
    }
    runTimer()
}    

function CompareRecords(currentR, bestR){

    cT = parseInt(currentR.replace(/:/g, ""))
    bR = parseInt(bestR.replace(/:/g, ""))

    if(cT <= bR && currentPoints >= bestPoints){// SI hace record
        bestPoints = currentPoints
        rPoints.textContent = bestPoints;
        bestRecord = cTime
        record.textContent = bestRecord;
    }
}

function dead(){
    heart -= 1

    // PERDIO
    if(heart == 0){
        level = 0;

        isRunning = false;

        if(!bestRecord){
            bestRecord = cTime
        }
        CompareRecords(cTime, bestRecord)
    

        setTimeout(() => {            
            game.clearRect(0,0,canvasSize,canvasSize)
            drawGame()
            playerPosition.x = doorPosition.x;
            playerPosition.y = doorPosition.y;
            timer.textContent= '00:00:00'
        }, 250);
        
        background.classList.add('dead');
        startGame()

        //AUN NO PERDIO
    }else{          
        playerPosition.x = doorPosition.x;
        playerPosition.y = doorPosition.y;

        let lifes = hearts.textContent;
        lifes = lifes.substring(0, lifes.length - 2);
        hearts.textContent = lifes;

        setTimeout(() => {            
            drawGame();                     
        }, 200)

    }
    
}

/*
Cosas para arreglar:
    cuando paso de nivel pierdo una vida
    la cabera no aparece en la primer puerta cuando muere
 
 
Cosas para añadir: 
    escena de game over
    escena de win

Modificaciones:
    cambiar emojis para dar otro toque.

*/