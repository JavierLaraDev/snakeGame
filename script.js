//primero tomaremos todos los elementos html que necesitamos
const board=document.getElementById('board');
const scoreBoard=document.getElementById('score-board');
const startButtom=document.getElementById('start');
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
  ArrowLeft:-1,
}
//Game variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

const setGame=()=>{
  snake=['00','01','02','03'];//creamos la serpiente
  score=snake.length;
  direction='ArrowRight';
  boardSquares=Array.from(Array(boardSize),()=>new Array(boardSize).fill(squareTypes.emptySquare))
};

const startGame=()=>{
  setGame();//lo primero es setear los valores de las variables para comenzar el juego
};

startButtom.addEventListener('click',startGame)