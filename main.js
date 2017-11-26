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
	klawiszW: false,
	klawiszS: false,
	klawiszA: false,
	klawiszD: false,
	speed: 10,

	draw: function(x, y, w, h){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle="#FF0000";
		ctx.fillRect(x,y,w,h);
		ctx.stroke();
	},
		listenForKey: function(e){
			if(e.key == 's'){
				player.klawiszS = true;
			}

			if(e.key == 'w'){
				player.klawiszW = true;
			}

			if(e.key == 'd'){
				player.klawiszD = true;
			}

			if(e.key == 'a'){
				player.klawiszA = true;
			}
		return;
	},

	updateFrame: function(){
			if(player.klawiszW){
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
			if(player.klawiszS){
				if(player.y + player.height <= canvas.height)
					player.y += player.speed;
					if(player.y + player.height > canvas.height){player.y = canvas.height - player.height}
						collisions.forEach(collidingItem =>{
						if(player.colliding(collidingItem)){
							player.y = collidingItem.y - player.height;
						}
					});
			}
			if(player.klawiszA){
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

			if(player.klawiszD){
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
		//console.log(e);
		if(e.key == 's'){
		player.klawiszS = false;
		}

		if(e.key == 'w'){
		player.klawiszW = false;
		}

		if(e.key == 'd'){
		player.klawiszD = false;
		}

		if(e.key == 'a'){
		player.klawiszA = false;
		}

	},
	colliding: function(collider){
		if((player.x + player.width > collider.x && player.x < collider.x+collider.width) && (player.y < collider.y + collider.height && player.y+player.height > collider.y)){
//			console.log('hit');
			return true;
	//*		player.x = collider.x - player.width;
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

/* //opens bottom
for(var i=0; i < collisions.length; i++){
   if(collisions[i].name == "open"){delete collisions[i]}
}
*/