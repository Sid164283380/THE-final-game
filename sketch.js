var gameState = 1;
var lifes = 3;
var score = 0;
var bg, bgImg;
var dogImg, dog;
var ground;
var obstacleGroup, coinsGroup;
var coinImg;
var rainyImg1, rainyImg2, rainyImg3;
var iceImg1, iceImg2, iceImg3;
var jumpsound
var coinsound
var diesound
var bgmusic
// loading the images
function preload() {
  bgImg = loadImage("assets/bgw.png")
  dogAnamation = loadAnimation("assets/dog1.png", "assets/dog2.png", "assets/dog3.png", "assets/dog4.png")
  obstacle1 = loadImage("assets/obstacle1.png")
  obstacle2 = loadImage("assets/obstacle2.png")
  obstacle3 = loadImage("assets/obstacle3.png");

  rainyImg1 = loadImage("assets/mossyrock1.png")
  rainyImg2 = loadImage("assets/mossyrock2.png")
  rainyImg3 = loadImage("assets/mossyrock3.png")

  iceImg1 = loadImage("assets/ice1.png")
  iceImg2 = loadImage("assets/ice2.png")
  iceImg3 = loadImage("assets/ice3.png")

  coinImg = loadImage("assets/coins.png")

  jumpsound = loadSound("assets/jump.mp3")
  
}

// Make sure everything is smooth

function setup() {
  createCanvas(1720, 520)
  console.log(windowWidth, windowHeight)
  //background image
  bg = createSprite(7500, 260);
  bg.addImage(bgImg);
  bg.scale = 1
  bg.velocityX = -30
  //creating the ground
  ground = createSprite(100, 465, 600, 5)
  ground.visible = false;

  obstacleGroup = new Group()
  coinsGroup = new Group()
  //creating PC    
  dog = createSprite(100, 200, 20, 50);
  dog.addAnimation("dog", dogAnamation);
  dog.scale = 1;
}
// meanwhile in another function ........
function draw() {
  background("black");
  console.log(bg.x);

  if(gameState === 1){

  

  dog.collide(ground)
  //making the dog jump
  if (keyDown("space")) {
    dog.velocityY = -10;
    
    
  }

  //adding gravity
  dog.velocityY = dog.velocityY + 2;
  if (bg.x < -6000) {
    bg.x = 7500;
  }
  //calling the function 
  // check the x of the bg ( 8000  TO 4000 -> FIRST BG)
  if (bg.x > 4000 && bg.x < 8000) {
    spawnObstacles();
  }

  if (bg.x < 2000 && bg.x > -2000) {

    spawnObstaclesRainy();
  }

  if (bg.x < -2000 && bg.x > -4600) {
    spawnObstaclesIce();
  }
  playerBenefits();

  if (coinsGroup.isTouching(dog)) {
    for (var i = 0; i < coinsGroup.length; i++) {
      if (coinsGroup[i].isTouching(dog)) {
        coinsGroup[i].destroy();
        score += 10
      }
    }
  }

  if (obstacleGroup.isTouching(dog)) {
    for (var i = 0; i < obstacleGroup.length; i++) {
      if (obstacleGroup[i].isTouching(dog)) {
        obstacleGroup[i].destroy();
        lifes -= 1
        score -= 10
      }
    }
  }
  
if(lifes===0){
gameState = 2
}
  drawSprites();
  textSize(25);
  fill("white");
  text("Score : " + score, width - 200, 50)

  text("Lives: " + lifes, 50, 50);
}
//gamestate 1
else if(gameState === 2){
  //canvas(windowWidth,windowHeight)
  //background("black")
  
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Play Again"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
       
  
}


function playerBenefits() {

  if (frameCount % 32 === 0) {
    var rand = Math.round(random(200, 450));
    var coins = createSprite(width + 10, rand, 20, 10);
    coins.setCollider('circle', 0, 0, 30);
    coins.velocityX = -30;
    coins.addImage(coinImg);
    coins.scale = 0.3
    coinsGroup.add(coins)

  }

}
function spawnObstacles() {

  if (frameCount % 40 === 0) {
    // var rand = Math.round(random(200,width-1));
    var obstacle = createSprite(width + 10, 430, 20, 10);
    obstacle.setCollider('circle', 0, 0, 50);

    obstacle.velocityX = -30;

    var rand1 = Math.round(random(1, 3))
    switch (rand1) {
      case 1: obstacle.addImage(obstacle1); obstacle.scale = 1;
        break;
      case 2: obstacle.addImage(obstacle2); obstacle.scale = 1; break;
      case 3: obstacle.addImage(obstacle3); obstacle.scale = 1;
        break;
      default: break;
    }
    obstacleGroup.add(obstacle)

  }

}

function spawnObstaclesRainy() {

  if (frameCount % 40 === 0) {
    // var rand = Math.round(random(200,width-1));
    var obstacle = createSprite(width + 10, 430, 20, 10);
    obstacle.setCollider('circle', 0, 0, 50);

    obstacle.velocityX = -30;

    var rand1 = Math.round(random(1, 3))
    switch (rand1) {
      case 1: obstacle.addImage(rainyImg1); obstacle.scale = 1.5;
        break;
      case 2: obstacle.addImage(rainyImg2); obstacle.scale = 1.5; break;
      case 3: obstacle.addImage(rainyImg3); obstacle.scale = 1.5;
        break;
      default: break;
    }
    obstacleGroup.add(obstacle)

  }


}
function spawnObstaclesIce() {

  if (frameCount % 20 === 0) {
    // var rand = Math.round(random(200,width-1));
    var obstacle = createSprite(width + 10, 430, 20, 10);
    obstacle.setCollider('circle', 0, 0, 50);

    obstacle.velocityX = -30;

    var rand1 = Math.round(random(1, 3))
    switch (rand1) {
      case 1: obstacle.addImage(iceImg1); obstacle.scale = 1.5;
        break;
      case 2: obstacle.addImage(iceImg2); obstacle.scale = 1.5; break;
      case 3: obstacle.addImage(iceImg3); obstacle.scale = 1.5;
        break;
      default: break;
    }
    obstacleGroup.add(obstacle)

  }


}