
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(80, 315, 10, 10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  console.log(ground.x);

  invisibleGround = createSprite(100,350,800,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  monkey.collide(invisibleGround);

}


function draw() {
  background(180);
  
  
  if(frameCount%100 === 0) {
    score = score+1;
  }
    
 if (ground.x>0 ) {
  ground.x = ground.width/2;
 }
  
  if(keyDown("space") && monkey.y >100) {
    monkey.velocityY = -12;
  }
  
  if(obstaclesGroup.isTouching(monkey)) {
    monkey.velocityX = 0;
    ground.velocityX = 0;
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    obstaclesGroup.velocityX = 0;
    FoodGroup.velocityX = 0;
  }
  
  monkey.velocityY = monkey.velocityY +0.8;
  
  monkey.collide(invisibleGround);
  
  
  spawnBANANAS();
  spawnObstacles();
  drawSprites();
}

function spawnBANANAS() {
  if(frameCount%60 === 0) {
    var bananes = createSprite(500, 300, 10, 20);
    bananes.y = Math.round(random(100, 200));
    bananes.addImage(bananaImage);
    bananes.scale = 0.1;
    bananes.velocityX = -3;
    
    
    bananes.lifetime = 150;
    FoodGroup.add(bananes);
  }
}

function spawnObstacles() {
  if(frameCount%38 === 0) {
    var obstacles = createSprite(100, 330, 20, 20);
    obstacles.x = Math.round(random(300, 600));
    obstacles.addImage(obstaceImage);
    obstacles.velocityX = -4;
    obstacles.scale = 0.1;
    
    obstacles.lifetime = 160;
    obstaclesGroup.add(obstacles);
    
  }
}




