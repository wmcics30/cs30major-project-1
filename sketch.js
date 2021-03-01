// Jumping Dino - CS30 Major-Project
// David(Zihan) Yang
// February 10th, 2021
//
// WOW Factor:
// - Animated objects, character, background, etc
// - Use/Exploration of millis(), frameCount(), and Classes
// - Use of multiple ideas learned in CS30 arrays, external files, libraries, object-oriented programming and etc




// global variables created
let player, gObs, aObs;            // objects variables
let lastAddedObstacle;             // time for adding new obstacles to game
let gObstacles;                    // obstacles array(ground and air)
let aObstacles;               
let imgPlayer = [];                // array for images used
let imgGroundObs = [];
let imgAirObs = []; 

let imgBackground;                 // background images(clouds, mountain)
let bcX;                           // background x-position
let imgFloor;
let imgClouds;

let menuMusic;                     // music and sound effects
let bgMusic;
let jumpSound;
let clickSound;   
let gameOverSound;

let CLD;                           // collision detection variable
let imageIndex;                    // switch/determine images and animation

let score;                         // in game variables
let screen;       
let startTime;                     // score keeping variable
let colours;



// loading assets such as images, sound effects, background music
function preload(){                      
  for (let i=1; i<=5; i++) {                  // load images for dino
    let string1 = "assets/dino"+i+".png"; 
    imgPlayer[i] = loadImage(string1);       
  }
  for (let j=1; j<=12; j++) {                 // load images for ground obstacles
    let string2 = "assets/cactus"+j+".png";   
    imgGroundObs[j] = loadImage(string2);       
  }
  for (let k=1; k<=2; k++) {                  // load images for air obstacles
    let string3 = "assets/bird"+k+".png"; 
    imgAirObs[k] = loadImage(string3);       
  }

  imgBackground = loadImage("assets/bg.png");
  imgFloor = loadImage("assets/base.png");
  imgClouds = loadImage("assets/cloud.png");

  menuMusic = loadSound("assets/menu.mp3");
  bgMusic = loadSound("assets/bg.mp3");
  jumpSound = loadSound("assets/jump.mp3");
  clickSound = loadSound("assets/click1.wav");
  gameOverSound = loadSound("assets/gameover.wav");
  endMusic = loadSound("assets/end.mp3");
}



// creating setup and basic values
function setup() {
  createCanvas(800, 400);
  lastAddedObstacle = 0;
  gObstacles = []; 
  aObstacles = [];
  player = new Character();
  gObs = new groundObstacles();
  aObs = new airObstacles();

  screen = "start";
  bcX = 0;
  score = 0;
  imageIndex = 1;
  CLD = 0;

  menuMusic.loop();

  colours = true;
}


// main body of code, contains the "beginning", "middle", end" of the project
function draw() {
  if (screen === "start") {
    startScreen();
  } 
  else if (screen === "game") {
    gameScreen();
  } 
  else if (screen === "end") {
    endScreen();
  }
}


// creating classes for differect objects
class Character{                       // player class
  constructor(){          
    this.w = 50;              
    this.h = 80;
    this.x = 80;              
    this.y = height - this.h; 
    this.dy = 0;    
    this.gravity = 1;
    this.img = imgPlayer[3];   
    this.w = this.img.width;      
    this.h = this.img.height;
  }  
  
  jump(){                                // vertical displacement of dino
    if(this.y === height - this.h) {
      this.dy = -20;
    }                   
  }
  
  move(){                  
    this.y += this.dy;   
    this.dy += this.gravity;  
    this.y = constrain(this.y, 0, height - this.h);       // moving dinosaur in vertical direction, and limiting the y-value so it does not exceed the height of the screen         
  }
  
  display(){                             // displaying dino
    setTint();                         
    image(this.img,this.x,this.y-25,this.w*1.5,this.h*1.5);  
    noTint();       
  }  

  update(){                              // animation of dino
    if(CLD === 0){                               
      if(this.y < height-100){                  
        this.img = imgPlayer[2];                 
      }
      else {                                   
        this.img = imgPlayer[imageIndex%2+3];       // switching between dino image 3 and 4 to create animation
      } 
    }  
    else {                                      
      this.img = imgPlayer[5];                   
    }
  }

  collide(Obs) {                         // collision detection using p5js library
    return collideRectRect(this.x,this.y-25,this.w,this.h*0.65, Obs.x, Obs.y, Obs.w*0.75, Obs.h*0.55);

  }
}


class groundObstacles {         // ground obstacle (cactus) class
  constructor() {
    this.w = 50;
    this.h = 90;
    this.x = width;
    this.y = height - this.h;
    this.img = imgGroundObs[int(random(1,13))];
    this.w = this.img.width*2.2;
    this.h = this.img.height*2.2;
   
  }

  move() {
    this.x -= 8;
  }

  display() {
    image(this.img,this.x,this.y-0.5,this.w,this.h); 
  }
}


class airObstacles {           // air obstacle (bird) class
  constructor() {
    this.img = imgAirObs[1];
    this.w = this.img.width*1.6;
    this.h = this.img.height*1.6;
    this.x = width;
    this.y = random(2*height/3,5*height/6);
    this.dx = -10;

  }

  move() {
    this.x = this.x + this.dx;
  }

  display() {
    image(this.img,this.x,this.y,this.w,this.h);
  }

  update() {
    this.img = imgAirObs[imageIndex%2+1];   // switching between image 1 and 2 to create animation
  }
}


function pushObstacles() {               // pushing/adding new obstacles
  let timePassed = random(700, 8000);           
  if (millis() - lastAddedObstacle > timePassed) { 
    if (int(timePassed)%2 === 0) {   
      gObstacles.push(new groundObstacles());    
    }
    else {
      aObstacles.push(new airObstacles());
    }
    lastAddedObstacle = millis();              
  }
}


function keyPressed() {
  if (keyCode === 87 || keyCode === 38) {    // controlling the jump of the dino
    player.jump();
    jumpSound.play();
  }
  else if (keyCode === 32) {                 // restarting the game
    if (screen === "end" ) {
      window.location.reload();
    }
  }
}


function getScore() {                        // time gone by since starting the game
  beforeRoundScore = (millis() - startTime) / 1000;
  score = beforeRoundScore.toFixed(3);
  return score;
}


function printScore() {                      // displaying score on screen
  if (CLD === 0){
    fill("black");
    textSize(10);
    textFont("Georgia");
    text("Score:"+getScore(), 600, 20);
  }
}


function displayBackground() {               // background display and animation (clouds, mountain)
  background(imgBackground);
  if (bcX + imgFloor.width/2 <= 0) {
    bcX = 0;
  }
  else {
    bcX -= 5;
  }
  image(imgFloor, bcX, height-20, imgFloor.width, imgFloor.height);       // if half of the image is off the screen set the image back to x-position 0
  image(imgClouds, bcX, 20, imgClouds.width, imgClouds.height);
}


function mousePressed() {                    // toggling game state, setting colour
  if (screen === "start") {
    if (mouseX > width/2-75 && mouseX < width/2+75 && mouseY > height-40-30 && mouseY < height-40+30) {
      screen = "game";
      startTime = millis();
      clickSound.setVolume(50);
      clickSound.play();
      menuMusic.stop();
      bgMusic.loop();
    }
    else if (mouseX > 540 && mouseX < 660 && mouseY > height-120 && mouseY < height - 80) {
      colours = !colours;
      clickSound.setVolume(50);
      clickSound.play();
    }
  }
}


function setColour() {        // set colour of button
  if (colours) {
    fill("white");
  }
  else {
    fill("blue");
  }
}


function setTint() {          // set colour of dino
  if (colours) {
    noTint();
  }
  else {
    tint("blue");
  }
}


// creates the starting screen - with buttons and options
function startScreen() {  
  background(96, 157, 255);
  image(imgPlayer[5], width/4, 100, imgPlayer[5].width, imgPlayer[5].height);
  fill(255);
  textAlign(CENTER);
  textSize(50);
  fill(52, 73, 94);  
  textFont("Georgia")                
  text("Jumping Dino", width / 2, height / 2);

  fill(92,167,182);                   
  noStroke();                         
  rectMode(CENTER);                  
  rect(width/2, height-40, 150, 60); 
  fill(236,240,241);                 
  textSize(30);                      
  text("Start", width/2, height-30);  


  setColour();                        // set colour of button
  rect(600, height-100, 60, 20);
  fill(0);                 
  textSize(10);                      
  text("Colour", 600, height-96.5);  
}


// creates the main game screen with actions
function gameScreen() {     
  displayBackground();             // background

  player.display();
  player.move();

  pushObstacles();                 // adding new obstacle
  
  if (frameCount%6 === 0) {
    imageIndex++;
  } 
  for (let i of gObstacles) {      // collision detection for ground obstacles
    i.move();                           
    i.display();     
    if(player.collide(i)){     
      CLD = 1; 
      getScore();
      gameOverSound.play();
      endMusic.loop();
      bgMusic.stop();
      screen = "end";
    } 
  }
  for (let j of aObstacles) {      // collision detection for air obstacles
    j.move();                           
    j.display(); 
    j.update();    
    if(player.collide(j)) {     
      CLD = 1; 
      getScore();
      gameOverSound.play();
      endMusic.loop();
      bgMusic.stop();
      screen = "end"; 
    }      
  }
  player.update();    // dino animation, changing which image in imgArray to display
  printScore();
}          


// creates the ending screen with scores and restart button
function endScreen() { 
  textAlign(CENTER);       
  textSize(70);             
  text("Game Over",width/2, height/2);

  fill(230, 180, 80);                    
  textSize(30);                         
  text("Score: "+score+" second(s)", width/2, height/2+32);      

  fill(92, 167, 182);                     
  rectMode(CENTER);                      
  noStroke();                            
  rect(width - 60, 30, 200, 60, 5);     
  fill(236, 240, 241);                      
  textSize(15);                           
  text("Press Space to Restart", width-80, 35);  
  noLoop();   
}