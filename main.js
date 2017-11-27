const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const header = document.querySelector('h1');
const speedButton = document.querySelector('[type=button]');

let collisions = [];

let collision = {

	create: function(x, y, width, height, name = "default"){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.name = name;

		this.draw = function(){
		ctx.fillStyle="#FF0000";
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.stroke();
		}

		collisions.push(this);
	},

	draw: function(){
		ctx.fillStyle="#FF0000";
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.stroke();
	}
}

let player = {
	width: 150,
	height: 100,
	x: 0,
	y: 0,
	hold: false,
	keyW: false,
	keyS: false,
	keyA: false,
	keyD: false,
	speed: 10,

	draw: function(x, y, w, h){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle="#FF0000";
		ctx.fillRect(x,y,w,h);
		ctx.stroke();
	},
		listenForKey: function(e){
			switch(e.key.toLowerCase()){
			case 's':
				player.keyS = true;
			break;

			case 'w':
				player.keyW = true;
			break;

			case 'd':
				player.keyD = true;
			break;

			case 'a':
				player.keyA = true;
			break;
			return;
			}
	},

	updateFrame: function(){
			if(player.keyW){
				if(player.y >= 0){
					player.y -= player.speed;
					if(player.y < 0){player.y = 0}
						collisions.forEach(collidingItem =>{
						if(player.colliding(collidingItem)){
							player.y = collidingItem.y + collidingItem.height;
						}
					});
					
				}
			}
			if(player.keyS){
				if(player.y + player.height <= canvas.height)
					player.y += player.speed;
					if(player.y + player.height > canvas.height){player.y = canvas.height - player.height}
						collisions.forEach(collidingItem =>{
						if(player.colliding(collidingItem)){
							player.y = collidingItem.y - player.height;
						}
					});
			}
			if(player.keyA){
				if(player.x >= 0){
						player.x -= player.speed;
						if(player.x <= 0){player.x = 0}
							collisions.forEach(collidingItem =>{
							if(player.colliding(collidingItem)){
								player.x = collidingItem.x + collidingItem.width;
							}
						});
				}
			}

			if(player.keyD){
				if(player.x + player.width <= canvas.width){
						player.x += player.speed;
						 if(player.x + player.width > canvas.width){ player.x = canvas.width - player.width}
							collisions.forEach(collidingItem =>{
							if(player.colliding(collidingItem)){
								player.x = collidingItem.x - player.width;
							}
						});
				}
			}

			player.draw(player.x,player.y, player.width, player.height);
			collisions.forEach(collidingItem =>{
			 player.colliding(collidingItem);
			 collidingItem.draw();
			});
	},

	keyUp: function(e){
		switch(e.key.toLowerCase()){
			case 's':
				player.keyS = false;
			break;

			case 'w':
				player.keyW = false;
			break;

			case 'd':
				player.keyD = false;
			break;

			case 'a':
				player.keyA = false;
			break;
			return;
			}

	},
	colliding: function(collider){
		if((player.x + player.width > collider.x && player.x < collider.x+collider.width) && (player.y < collider.y + collider.height && player.y+player.height > collider.y)){
			return true;
		}
		else{
			return false;
		}
	}
}

function setSpeed(){
	player.speed = Number(document.querySelector('input').value)
}


function addSquare(){
 let x = Number(document.getElementById('x').value);
 let y = Number(document.getElementById('y').value);
 let width = Number(document.getElementById('width').value);
 let height = Number(document.getElementById('height').value);

 new collision.create(x, y, width, height);
}

player.draw(player.x, player.y, player.width, player.height);

document.addEventListener('keydown', player.listenForKey);
document.addEventListener('keyup', player.keyUp);
speedButton.addEventListener('click', setSpeed);
setInterval(player.updateFrame, 16.66)

new collision.create( 200, 0, 1, 600);
new collision.create( 200, 599, 450, 1, 'open');
new collision.create( 649, 100, 1, 500, 'open');
new collision.create( 370, 100, 280, 1, 'open');