const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 320;
const TILE_SIZE = 16;
const FIELD_SIZE = createVector(CANVAS_WIDTH / TILE_SIZE,
 CANVAS_HEIGHT / TILE_SIZE );
const SNAKE_HEAD_START_POS = createVector(2,8);
const SNAKE_START_LENTH = 3;

var isGamePaused = false;
var isGameOver = false;
var sprite;

function preload(){
	sprite = loadImage("resources/images/snakeSprite.png");
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(10);
}


function startNewGame(){

}


function gameOver(){
}

function mouseClicked(){
	if( mouseButton === LEFT){
	} else if(mouseButton === CENTER){
	}
}


function keyPressed(){
	switch(key){
		default:
			break;
	}
}

function update(){

}

function renderScore(){

}

function renderGameStatus(){

}

function draw() {
	background("#eccf47");
}



