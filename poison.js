class Poison{
	constructor(sprite){
		this.sprite = sprite;
		this.apples = [];
	}
	
	reset(){
		this.apples = [];	
	}

	setFruit(fruit){
		this.fruit = fruit;
	}

	findPosition(){
		outer:
		while(true){
			let randX = floor(Math.random() * 100) % FIELD_WIDTH;
			let randY = floor(Math.random() * 100) % FIELD_HEIGHT;
			let randPos = createVector(randX, randY);
			
			if(this.fruit.position.x === randPos.x
			 && this.fruit.position.y === randPos.y){
				continue outer;
			}

			for(let i = 0; i < snake.body.lenth; ++i){
				if(snake.body[i].x === randPos.x
				 && snake.body[i].y === randPos.y){
					continue outer;
				}
			}

			for(let i = 0; i < this.apples.length; ++i){
				if(this.apples[i].x === randPos.x
				 && this.apples[i].y === randPos.y){
					continue outer;
				}
			}

			return randPos;
		}
	}

	addNew(){
		this.apples.push(this.findPosition());
	}

	checkPosition(position){
		for(let i = 0; i < this.apples.length; ++i){
			if(this.apples[i].x === position.x && this.apples[i].y === position.y){
				return true;
			}
		}
		return false;
	}

	render(){
		//fill("#ccff00");
		//rect(this.position.x * TILE_SIZE + 1, this.position.y * TILE_SIZE + 1, TILE_SIZE - 1, TILE_SIZE - 1);
		for(let i = 0; i < this.apples.length; ++i){
			image(this.sprite, this.apples[i].x * TILE_SIZE, this.apples[i].y * TILE_SIZE,
			TILE_SIZE, TILE_SIZE, 3 * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
		}		
	}
}