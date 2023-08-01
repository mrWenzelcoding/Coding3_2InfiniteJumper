let player;
let platforms;
let grass;
let bunny;
let bunnyJump;
let sky;
let carrot
let score;

function preload(){
  //Loading Assets
  grass = loadImage('assets/ground_grass.png')
  bunny = loadImage('assets/bunny1_stand.png')
  sky = loadImage('assets/bg_layer1.png')
  carrotImg = loadImage('assets/carrot.png')
  bunnyJump = loadImage('assets/bunny1_jump.png')
}

function setup() {
  new Canvas('9:16')
  world.gravity.y=10
  score = 0;
  
  
  //Player Properties
  player = new Sprite()
  player.img = bunny
  player.collider = 'dynamic'
  player.scale=0.3
  player.rotationLock=true
  player.bounciness=0
  
  //Platform Properties
  platforms = new Group()
  platforms.collider = 'static'
  platforms.image = grass
  platforms.scale=0.3
  platforms.bounciness=0

  //Carrot Properties
  carrots = new Group()
  carrots.collider = 'static'
  carrots.img = carrotImg
  carrots.scale=0.5

//Creating Platforms
  for(let i =0; i<4; i++){
    let platform = new platforms.Sprite()
    platform.x = random(platform.w/2,canvas.w-platform.w/2)
    platform.y = canvas.h-50-i*150 
}

//Setting properties so the fourth platform moves
platforms[3].collider = 'kinematic'
platforms[3].vel.x = 3
platforms[3].friction = 1000

//Ensure player lands on platform
platforms[1].x = canvas.w/2

//Creating Carrots
  for(let i = 0; i<4; i++){
    let carrot = new carrots.Sprite()
    carrot.x = platforms[i].x
    carrot.y = platforms[i].y-platforms[i].h/2-carrot.h/2
  }
 
  //Remove First Carrot
  carrots[0].remove()
}


function draw() {
  background(sky)

  //Left and Right Movement
  if (kb.pressing('left')) {
		player.vel.x = -6;
	} else if (kb.pressing('right')) {
		player.vel.x = 6;
	} else {
	  player.vel.x = 0;
	}

  //Jumping. Only jumps if colliding and pressing space
  if(kb.presses('space') && player.colliding(platforms)){
    player.vel.y = -7.5 
  } else{
    player.img = bunny
  }

  //Jumping Animation
 if(player.vel.y  == 0 && player.colliding(platforms)){
  player.img=bunny
 } else{
   player.img=bunnyJump
 }

//Allows player to Jump Through the Platforms.
//Overlapping if less than height, collider if greater.
for(let i = 0; i<platforms.length; i++){
  if(player.y+player.h/2+platforms[i].h/2>platforms[i].y){
    platforms[i].overlaps(player)
  } else{ 
    platforms[i].collides(player)
  }

  //Respawning Platforms With Carrots
  if(player.y+canvas.h/2<platforms[i].y){
    platforms[i].x = random(platforms[i].w/2,canvas.w-platforms[i].w/2)
    platforms[i].y = player.y - canvas.h/2
    let carrot = new carrots.Sprite()
    carrot.x = platforms[i].x
    carrot.y = platforms[i].y-platforms[i].h/2-carrot.h/2
  }


//Moving Platforms
  if(platforms[3].x>canvas.w-platforms[3].w/2){ 
    platforms[3].vel.x = -3
  }
  if(platforms[3].x<0+platforms[3].w/2){
    platforms[3].vel.x = 3
  }

}

//Leaving Screen Left and Right
if(player.x<0){
  player.x=canvas.w
}
if(player.x>canvas.w){
  player.x=0
}

//Camera 
camera.y=player.y

//Carrot Collection
for(let i =0; i<carrots.length;i++){
  if(player.overlaps(carrots[i])){
    carrots[i].remove()
    score++;
  }
}

//Score
textAlign(RIGHT); 
textSize(40);
text(score,canvas.w,canvas.h*.05);



}
