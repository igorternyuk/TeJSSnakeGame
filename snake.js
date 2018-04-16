class Snake {
	constructor(){
		this.sprite = sprite;
		this.direction = dirRight;
		this.body = [];
		this.alive = true;
		this.reset();
	}
	
	reset(){
		this.body = [];
		let x = snakeHeadStartPosition.x;
		let y = snakeHeadStartPosition.y;
		for(let i = 0; i < SNAKE_START_LENTH; ++i){
			this.body.push(createVector(x - i, y));
		}
		this.alive = true;
	}

	turn(dir){
		if(this.direction !== getOppositeDirection(dir)){
			this.direction = dir;
		}
	}

	turnLeft(){
		if(this.direction === dirRight){
			this.turn(dirUp);
		} else if(this.direction === dirLeft){
			this.turn(dirDown);
		} else if(this.direction === dirUp){
			this.turn(dirLeft);
		} else if(this.direction === dirDown){
			this.turn(dirRight);
		}
	}

	turnRight(){
		if(this.direction === dirRight){
			this.turn(dirDown);
		} else if(this.direction === dirLeft){
			this.turn(dirUp);
		} else if(this.direction === dirUp){
			this.turn(dirRight);
		} else if(this.direction === dirDown){
			this.turn(dirLeft);
		}
	}

	tick(fruit){
		if(this.alive){
			this.body.unshift(p5.Vector.add(this.body[0], this.direction));
			this.checkOffField();
			if(this.checkSelfCrossing() || this.checkPoison()){
				this.alive = false;
				return;
			}
			if(!this.checkFruit(fruit)){
				this.body.pop();
			}
		}
	}

	checkFruit(fruit){
		let head = this.body[0];
		if(head.x === fruit.position.x && head.y === fruit.position.y){
			fruit.position = fruit.findPosition();
			if((snake.body.length % 5) === 0){
				poison.addNew();
			}
			return true;
		}
		return false;
	}

	checkPoison(){
		let head = this.body[0];
		return poison.checkPosition(head);
	}

	checkSelfCrossing(){
		let head = this.body[0];
		for(let i = 1; i < this.body.length; ++i){
			if(head.x === this.body[i].x && head.y === this.body[i].y){
				return true;
			}
		}
		return false;
	}

	checkOffField(){
		let head = this.body[0];
		if(head.x < 0){
			head.x = FIELD_WIDTH - 1;
		} else if( head.x > FIELD_WIDTH - 1){
			head.x = 0;
		}
		if(head.y < 0){
			head.y = FIELD_HEIGHT - 1;
		} else if( head.y > FIELD_HEIGHT - 1){
			head.y = 0;
		}
	}

	render(){
		fill(0,180,0);
		image(this.sprite, this.body[0].x * TILE_SIZE, this.body[0].y * TILE_SIZE,
			TILE_SIZE, TILE_SIZE, TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
		//rect(this.body[0].x * TILE_SIZE + 1, this.body[0].y * TILE_SIZE + 1, TILE_SIZE - 1, TILE_SIZE - 1);
		//console.log("" + this.body[0].x + ", " + this.body[0].y);
		for(let i = 1; i < this.body.length; ++i){
			fill(0,0,255);
			//console.log("" + this.body[i].x + ", " + this.body[i].y);
			image(this.sprite, this.body[i].x * TILE_SIZE, this.body[i].y * TILE_SIZE,
			TILE_SIZE, TILE_SIZE, 0, 0, TILE_SIZE, TILE_SIZE);
		}
	}
}