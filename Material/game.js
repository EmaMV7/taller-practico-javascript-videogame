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
const rPoints = document.querySelector('.rPoints');
const win = document.querySelector('.win');
const gameOver = document.querySelector('.gameOver');
const tryAgainMS = document.querySelector('.tryAgain')
  

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
let tryAgain= false;
let victory = 0;


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


function drawGame(){
    game.font = elemSize + 'px Arial';
    game.textAlign = "";

    map = maps[level];
    locateBombs = [];

    mapRow = map.trim().split('\n');
    mapRowCols = mapRow.map(element => element.trim().split(''));

    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            emoji = emojis[col]
            PosX = parseInt(elemSize * (colI))
            PosY = parseInt(elemSize * (rowI + 1))
            
            // Spawns
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

    // Next level
    const giftCollisionX = playerPosition.x == giftPosition.x;
    const giftCollisionY = playerPosition.y == giftPosition.y;
    const gitfCollision = giftCollisionX && giftCollisionY;

    if (gitfCollision){
        currentPoints ++
        score.textContent = currentPoints;
        console.log(currentPoints)

        level ++;

        playerPosition.x = undefined;
        playerPosition.y = undefined;        
        
        // Win
        
        if(currentPoints == 6){
            console.log('ganaste')
            setTimeout(()=> {
                goal()
            }, 20)
        }else{
            drawGame();
        }        
    }

    // Dead
    locateBombs.forEach( e => {
    if(e[0] == playerPosition.x && e[1] == playerPosition.y){
        setTimeout(() => {              
            game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);     
            dead();
        },20);
    }});
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
    // Is running false?
    if(!isRunning){
        isRunning = true;
        startTime = Date.now();
        updateTimer();
    }
}

function moveUp(){
    
    gameOver.classList.add('hidden');
    background.classList.remove('background1');
    win.classList.add('hidden');
    background.classList.remove('background2');
    tryAgainMS.classList.add('hidden');    
    background.classList.remove('background3');

    if(Math.floor(playerPosition.y - elemSize) > elemSize - 1){
        playerPosition.y -= elemSize;
        drawGame();
        if(tryAgain == true){
            reset();
            drawGame();
        }
    }
    
    runTimer()
}

function moveLeft(){
    
    gameOver.classList.add('hidden');
    background.classList.remove('background1');
    win.classList.add('hidden');
    background.classList.remove('background2');
    tryAgainMS.classList.add('hidden');    
    background.classList.remove('background3');

    if(Math.floor(playerPosition.x - elemSize) > - 1){
        
        playerPosition.x -= elemSize;
        drawGame();
        if(tryAgain == true){
            reset();
            drawGame();
        }
        
    }
    runTimer()
}

function moveRight(){
    
    gameOver.classList.add('hidden');
    background.classList.remove('background1');
    win.classList.add('hidden');
    background.classList.remove('background2');
    tryAgainMS.classList.add('hidden');    
    background.classList.remove('background3');

    if(Math.floor(playerPosition.x - elemSize) < (elemSize * 8) - 1){
        playerPosition.x += elemSize;
        drawGame();
    }
    if(tryAgain == true){
        reset();
        drawGame();
    }
    runTimer()
}

function moveDown(){
    
    gameOver.classList.add('hidden');
    background.classList.remove('background1');
    win.classList.add('hidden');
    background.classList.remove('background2');
    tryAgainMS.classList.add('hidden');    
    background.classList.remove('background3');

    if(Math.floor(playerPosition.y - elemSize) < (elemSize * 9) - 1){
        playerPosition.y += elemSize;
        drawGame();
    }

    if(tryAgain == true){
        reset();
        drawGame();
    }
    gameOver.classList.add('hidden');
    background.classList.remove('background1');
    win.classList.add('hidden');
    background.classList.remove('background2');
    runTimer()
}    

function CompareRecords(currentR, bestR){
    if(!bestR){
        bestR = cTime;
    }

    isRunning = false;

    cT = parseInt(currentR.replace(/:/g, ""));
    bR = parseInt(bestR.replace(/:/g, ""));

    if(cT <= bR && currentPoints >= bestPoints){ // SI hace record
        bestPoints = currentPoints;
        rPoints.textContent = bestPoints;
        bestRecord = cTime;
        record.textContent = bestRecord;
        victory = 1;
    }else{
        console.log('no hace record')
        victory= 0;
    }

}

function goal(){ 

    CompareRecords(cTime, bestRecord);
    // NEW RECORD
    if(victory == 1){
        setTimeout(() => {         
            level = 0 
            playerPosition.x = undefined
            playerPosition.y = undefined
            drawGame()
            playerPosition.x = doorPosition.x;
            playerPosition.y = doorPosition.y;
        }, 250);    
    
        win.classList.remove('hidden');
        background.classList.add('background2');
    }else{

        setTimeout(() => {         
            level = 0 
            playerPosition.x = undefined
            playerPosition.y = undefined
            drawGame()
            playerPosition.x = doorPosition.x;
            playerPosition.y = doorPosition.y;
        }, 250);

        tryAgainMS.classList.remove('hidden');    
        background.classList.add('background3');
    }
    tryAgain = true;
}

function dead(){
    heart -= 1

    if(heart == 0){ // PERDIO

        CompareRecords(cTime, bestRecord)

        setTimeout(() => {         
            level = 0 
            playerPosition.x = undefined
            playerPosition.y = undefined
            drawGame()
            playerPosition.x = doorPosition.x;
            playerPosition.y = doorPosition.y;
        }, 250);

        hearts.textContent = [''];
        gameOver.classList.remove('hidden');
        background.classList.add('background1');
        
        tryAgain = true;
        
    }else{ //AUN NO PERDIO
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


// Reset
function reset(){

    console.log('estoy en reset');
    level = 0;
    currentPoints = 0;
    tryAgain = false;
    score.textContent = 0;
    victory = 0

    if(heart >= 0){
        hearts.textContent = ['💗💗💗'];
        heart = 3;
    }

    
}

/*
Problemas:
la partida no reinicia cuando gano el juego

Arreglar:
aviso try again si no supero el record

Modificaciones:
    cambiar emojis para dar otro toque.

*/