// Jump - CS30 Major-Project
// David(Zihan) Yang
// February 10th, 2021
//
// Project explanation/Nice to have:
// - describe what you did to take this project "above and beyond"

let player, gObs, aObs;
let lastAddedObstacle = 0;
let gObstacles = []; 
let aObstacles = [];               
let imgPlayer = [];
let imgGroundObs = [];
let imgAirObs = []; 

let imgBackground;
let imgFloor;
      
let jumpSound;   

let CLD = 0;
let imageIndex = 1;

let score = 0;                
let bestScore = 0;              
let screen = 0;        

function preload(){                     
  for (let i=1; i<=5; i++) {           
    let string1 = "assets/dino"+i+".png"; 
    imgPlayer[i]= loadImage(string1);       
  }
  for (let j=1; j<=12; j++) {           
    let string2 = "assets/cactus"+j+".png"; 
    imgGroundObs[j]= loadImage(string2);       
  }
  for (let k=1; k<=2; k++) {           
    let string3 = "assets/parrot"+k+".png"; 
    imgGroundObs[k]= loadImage(string3);       
  }
}

function setup() {
  createCanvas(800, 400);
  player = new Character();
  gObs = new groundObstacles();
  // aObs = new airObstacles();

}

function draw() {
  background(220);
  player.display();
  player.move();
  let timePassed = random(700, 8000);           
  if (millis() - lastAddedObstacle > timePassed) {   
    gObstacles.push(new groundObstacles());         
    lastAddedObstacle = millis();              
  }
  
  if (frameCount%6 === 0) {
    imageIndex++;
  } 
  for (let i of gObstacles) {      
    i.move();                           
    i.display();     
    if(player.collide(i)){     
      CLD = 1; 
      textAlign(CENTER);       
      textSize(70);             
      text("Game Over",width/2, height/2);
      noLoop();   
      console.log(printScore());
    }
                        
  }
  // for (let j of aObstacles) {      
  //   j.move();                           
  //   j.display(); 
  //   j.update();    
  //   if(player.collide(j)){     
  //     CLD = 1; 
  //     textAlign(CENTER);       
  //     textSize(70);             
  //     text("Game Over",width/2, height/2);
  //     noLoop();   
  //   }
                        
  // }
  
  player.update(); 
}

class Character{                  
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
  
  jump(){  
    if(this.y === height - this.h) {
      this.dy = -20;
    }                   
  }
  
  move(){                  
    this.y += this.dy;   
    this.dy += this.gravity;  
    this.y = constrain(this.y, 0, height - this.h);                
  }
  
  display(){                                       
    image(this.img,this.x,this.y-20,this.w*1.5,this.h*1.5);         
  }  

  update(){                       
    if(CLD === 0){                               
      if(this.y < height-100){                  
        this.img = imgPlayer[2];                 
      }
      else {                                   
        this.img = imgPlayer[imageIndex%2+3];        
      } 
    }  
    else {                                      
      this.img = imgPlayer[5];                   
    }
  }

  collide(Obs) {
    return collideRectRect(this.x,this.y-20,this.w,this.h, Obs.x, Obs.y, Obs.w, Obs.h);

  }
}

class groundObstacles {
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
    image(this.img,this.x,this.y+20,this.w,this.h); 
  }
}

// class airObstacles {
//   constructor() {
//     this.x = width;
//     this.y = height*0.25;
//     this.dx = -10;
//     this.img = imgAirObs[1];
//     this.w = this.img.width*1.5;
//     this.h = this.img.height*1.5;

//   }

//   move() {
//     this.x = this.x-this.dx;
//   }

//   display() {
//     image(this.image,this.x,this.y,this.w,this.h);
//   }

//   update() {
//     this.img = imgAirObs[imageIndex%2+1];
//   }
// }


function keyPressed() {
  if (keyCode === 87 || keyCode === 38) {
    player.jump();
  }
}

function printScore() { 
  if (CLD === 1) {
    score = millis()/1000;
    return score;
  }
 
}


// function StartScreen() {             
//  
// 
// }

// function endScreen() { 
// 
// }


// function gameScreen() {               
//   background(0);             
//   player.display();
//   player.move();
//   let timePassed = random(700, 8000);           
//   if (millis() - lastAddedObstacle > timePassed) {   
//       gObstacles.push(new groundObstacles());         
//       lastAddedObstacle = millis();              
//   }
//   if (frameCount%6===0) imageIndex++; 
//     for (let i of gObstacles) {      
//         i.move();                           
//         i.display();     
//         if(player.collide(i)){     
//           CLD = 1; 
//           textAlign(CENTER);       
//           textSize(70);             
//           text("Game Over",width/2, height/2);
//           noLoop();   
//         }
                          
//     }
  
//   player.update();                        

// }

// function endScreen() { 
// }

// function printScore() { 
// }




