
const squares = document.querySelectorAll('.grid div');
const scoreDisplay = document.querySelector('span');
const startBtn = document.querySelector('.start');


const WIDTH = 10
const INITIAL_INTERVAL_TIME = 1000;

let currentIndex = 0;  //first div in the grid
let appleIndex = 0;
let currentSnake = [2 , 1 ,0];
let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = INITIAL_INTERVAL_TIME;
let interval = 0;


//This function ensures that the grid is cleared of the snake previous position 
//And remove any existing apple
function clearGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
}

function resetVariables(){
    score = 0;
    direction = 1;
    intervalTime = INITIAL_INTERVAL_TIME;
    currentSnake = [2 , 1, 0];
    currentIndex = 0;
}

function attScore(){
    scoreDisplay.innerHTML = score;
}

function setLoop(){
    interval = setInterval(moveOutcomes, intervalTime);
}

function startGame(){

    clearGame();
    //This is to prevent multiple intervals running simultaneously 
    clearInterval(interval);

    resetVariables();
    
    attScore();

    randomApple();
    
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    
    setLoop();
    
}

function updateSnakePosition(){
    
    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    return tail;
}

function checkApple(tail){
    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);

        randomApple();

        score++;
        attScore();

        clearInterval(interval);

        intervalTime = intervalTime + speed;
        
        setLoop();

    }else{
        return;
    }
}
/* 
    Given the fact that the grid is counted from left to right, the square below or above the head it's the position of the head + width or head - width
    For example:, 
    if the snake's head is at the last cell of a row (cell 9 in a 10x10 grid) and is moving right, adding the direction to the current position would result in a value beyond the grid size (10).

*/
function moveOutcomes(){

    // Deals with snake hitting border and itself
    if(
        (currentSnake[0] + WIDTH >= (WIDTH * WIDTH) && direction === WIDTH) || //if snake hits bottom
        (currentSnake[0] % WIDTH === WIDTH - 1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % WIDTH === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - WIDTH < 0 && direction === -WIDTH) || //if snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ){
        return clearInterval(interval);
    }

    const tail = updateSnakePosition();


    checkApple(tail);
    
    squares[currentSnake[0]].classList.add('snake');

}


function randomApple(){
    do{
        appleIndex = Math.floor(Math.floor(Math.random() * squares.length));
    }while(squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

/* 
    Cada tecla tem um código único(key code)
        ArrowUp (↑): 38
        ArrowDown (↓): 40
        ArrowLeft (←): 37
        ArrowRight (→): 39

        W (movimento para cima): 87
        A (movimento para a esquerda): 65
        S (movimento para baixo): 83
        D (movimento para a direita): 68
*/

function control(e){
    squares[currentIndex].classList.remove('snake');

    switch(e.keyCode){
        case 39:
        case 68:
            direction = 1;
            break;
        case 38:
        case 87:
            direction = -WIDTH;
            break;

        case 37:
        case 65:
            direction = -1;
            break;
        case 40:
        case 83:
            direction = +WIDTH;
            break;
    }

}


document.addEventListener('keyup',control);
startBtn.addEventListener('click', startGame)
