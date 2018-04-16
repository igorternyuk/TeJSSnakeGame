class Fruit{
	constructor(sprite){
		this.sprite = sprite;
		this.position = this.findPosition();
	}

	findPosition(){
		outer:
		while(true){
			var randX = floor(Math.random() * 100) % FIELD_WIDTH;
			var randY = floor(Math.random() * 100) % FIELD_HEIGHT;
			var randPos = createVector(randX, randY);
			for (var i = 0; i < snake.body.length; i++) {
				if(snake.body[i].x === randPos.x
				 && snake.body[i].y === randPos.y){
					continue outer;
				}
        	}
        	for (var i = 0; i < poison.apples.length; i++) {
				if(poison.apples[i].x === randPos.x
				 && poison.apples[i].y === randPos.y){
					continue outer;
				}
        	}
        	return randPos;
        }
    }

	render(){
		image(this.sprite, this.position.x * TILE_SIZE, this.position.y * TILE_SIZE,
			TILE_SIZE, TILE_SIZE, 2 * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
	}
}