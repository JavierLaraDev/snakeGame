//primero tomaremos todos los elementos html que necesitamos
const board=document.getElementById('board');
const scoreBoard=document.getElementById('score-board');
const startButton = document.getElementById('start');
const gameOverSign=document.getElementById('game-over');

//Game Settings
const boardSize=10;
const gameSpeed=100;
const squareTypes={//tipos de cuadrados
  emptySquare:0,//cuadrados vacios 
  snakeSquare:1,//cuadrados de la serpiente
  foodSquare:2// cuadrados de la comida
};
const directions={
  ArrowUp:-10,
  ArrowDown:10,
  ArrowRight:1,
  ArrowLeft:-1
}
//Game variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;


const drawSnake=()=>{
  snake.forEach(square => drawSquare(square,'snakeSquare'));
}
//rellena cada cuadrado del tablero
//@params
//square: posicion del cuadrado
//type: tipo de cuadrado (emptySquare, snakeSquare, FoodSquare)

const drawSquare=(square,type)=>{
  const [row,column]=square.split('');
  boardSquares[row][column]=squareTypes[type];
  const squareElement=document.getElementById(square);
  squareElement.setAttribute('class', `square ${type}`);
  
  if (type==='emptySquare'){
    emptySquares.push(square)
  }else{
    if (emptySquares.indexOf(square)!==-1){
      emptySquares.splice(emptySquares.indexOf(square),1);
    }
  }
  
}

const moveSnake=()=>{
  const newSquare = String(Number(snake[snake.length -1])+ 
  directions[direction]).padStart(2,'0');
  const [row,column]=newSquare.split('');

  if (newSquare < 0 || newSquare > boardSize * boardSize || 
    (direction === 'ArrowRight' && column==0) || 
    (direction === 'ArrowLeft' && column== 9 ||
    boardSquares[row][column]===squareTypes.snakeSquare)){
      gameOver();
  }else{
    snake.push(newSquare);
    if(boardSquares[row][column]===squareTypes.foodSquare){
      addFood();
    }else{
      const emptySquare = snake.shift();
      drawSquare(emptySquare, 'emptySquare');
    }
    drawSnake();
  }
  
}

const addFood=()=>{
  score++;
  updateScore();
  createRandomFood();
}

const gameOver=()=>{
  gameOverSign.style.display='block';
  clearInterval(moveInterval)
  startButton.disabled = false;
}

const setDireccion = newDirection =>{
  direction=newDirection;
} 

const directionEvent=key=>{
  switch(key.code){
    case 'ArrowUp':
      direction!='ArrowDown' && setDireccion(key.code);
      break;
    case 'ArrowDown':
      direction!='ArrowUp' && setDireccion(key.code);
      break;
    case 'ArrowLeft':
      direction != 'ArrowRight' && setDireccion(key.code);
      break;
    case 'ArrowRight':
      direction !='ArrowLeft' && setDireccion(key.code);;
      break;
  }
}

const createRandomFood = ()=>{
  const randomEmptySquare = emptySquares[Math.floor(Math.random()*emptySquares.length)];
  drawSquare(randomEmptySquare,'foodSquare');
}

const updateScore = ()=>{
  scoreBoard.innerText = score;
}

const createBoard=()=>{
  boardSquares.forEach((row,rowIndex) => {
    row.forEach((column,columnIndex)=>{
      const squareValue=`${rowIndex}${columnIndex}`;
      const squareElement=document.createElement('div'); //se crea un div
      squareElement.setAttribute('class', 'square emptySquare');//al elemento squareElement vamos a setearle una clase
      squareElement.setAttribute('id',squareValue);
      board.appendChild(squareElement);
      emptySquares.push(squareValue);//se guarda los valores de squareValue para rastrear casillas vacias
    })
  });
}

const setGame=()=>{
  console.log("Ejecutando setGame");
  snake=['00','01','02','03'];//creamos la serpiente
  score=snake.length;
  direction='ArrowRight';
  boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
  console.log(boardSquares);
  board.innerHTML='';
  emptySquares=[];
  createBoard();
}

const startGame=()=>{
  setGame();//lo primero es setear los valores de las variables para comenzar el juego
  gameOverSign.style.display='none';
  startButton.disabled=true;
  drawSnake();//dibujar serpiente pero para eso debemos primero dibujar un cuadrado
  updateScore();
  createRandomFood();
  document.addEventListener('keydown', directionEvent);
  moveInterval = setInterval(()=>moveSnake(),gameSpeed);
}

startButton.addEventListener('click', startGame);