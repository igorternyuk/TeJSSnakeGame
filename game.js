var sprite;

function preload(){
	sprite = loadImage("resources/images/snakeSprite.png");
}

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 320;
const TILE_SIZE = 16;
const FIELD_WIDTH = CANVAS_WIDTH / TILE_SIZE;
const FIELD_HEIGHT = CANVAS_HEIGHT / TILE_SIZE;
const SNAKE_START_LENTH = 3;
var snakeHeadStartPosition;
var dirRight, dirLeft, dirUp, dirDown;
var snake, fruit, poison;
var isGamePaused = false;
var isGameOver = false;

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  	frameRate(4);
	snakeHeadStartPosition = createVector(2,8);
	dirRight = createVector(1,0);
	dirLeft = createVector(-1,0); 
	dirUp = createVector(0,-1);
	dirDown = createVector(0,1);
	snake = new Snake(sprite);
	poison = new Poison(sprite);
	fruit = new Fruit(sprite);
	poison.setFruit(fruit);
}

function draw() {
	gameTick();
	background("#3399ff");
	fruit.render();
	poison.render();
	snake.render();
	renderScore();
	renderGameStatus();
}

function getOppositeDirection(dir){
	if(dir === dirRight){
		return dirLeft;
	} else if(dir === dirLeft){
		return dirRight;
	} else if(dir === dirUp){
		return dirDown;
	} else if(dir === dirDown){
		return dirUp;
	}
	return dirRight;
}

function startNewGame(){
	snake.reset();
	poison.reset();
	fruit = new Fruit(sprite);
	poison.setFruit(fruit);
	isGamePaused = false;
	isGameOver = false;
}

function togglePause(){
	isGamePaused = !isGamePaused;
}

function mouseClicked(){
	if( mouseButton === LEFT){
		snake.turnLeft();
	} else if(mouseButton === RIGHT){
		snake.turnRight();
	} else if(mouseButton === CENTER){
		togglePause();
	}
}

function keyPressed(){
	switch(keyCode){
		case LEFT_ARROW:
			snake.turn(dirLeft);
			break;
		case RIGHT_ARROW:
			snake.turn(dirRight);
			break;
		case UP_ARROW:
			snake.turn(dirUp);
			break;
		case DOWN_ARROW:
			snake.turn(dirDown);
			break;
		case 78:
			startNewGame();
			break;
		case 32:
			togglePause();
			break;
		default:
			break;
	}
}

function gameTick(){
	if(!isGameOver && !isGamePaused){
		snake.tick(fruit);
		isGameOver = !snake.alive;
	}
}

function renderScore(){
	textSize(30);
	fill(255,255,0);
	let score = snake.body.length;
	text("Score: " + score, 0, 30);
}

function renderGameStatus(){
	if(isGameOver){
		textSize(40);
		fill(255, 0, 0);
		text("Game over!!!", CANVAS_WIDTH / 12, CANVAS_HEIGHT / 2);

	} else if(isGamePaused){
		textSize(40);
		fill(200, 200, 0);
		text("Paused", CANVAS_WIDTH / 4, CANVAS_HEIGHT / 2);		
	}
}
