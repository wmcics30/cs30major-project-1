// Jump - CS30 Major-Project
// David(Zihan) Yang
// February 10th, 2021
//
// Project explanation/Nice to have:
// - describe what you did to take this project "above and beyond"

let player, gObs;
let lastAddedObstacle = 0;
let gObstacles = []; 
let airObstacles = [];               
let imgPlayer;
let imgGroundObs;
let imgAirObs;             
let jumpSound;                

let score=0;                
let bestScore=0;              
let screen = 0         


function setup() {
  createCanvas(800, 400);
  player = new Character();
  gObs = new groundObstacles();

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

  for (let i of gObstacles) {      
      i.move();                           
      i.display();     
      if(player.collide(i)){      
        textAlign(CENTER);       
        textSize(70);             
        text("Game Over",width/2, height/2);
        noLoop();   
      }
                         
  }
}

class Character{                  
  constructor(){          
    this.w = 50;              
    this.h = 100;
    this.x = 100;              
    this.y = height - this.h; 
    this.dy = 0;    
    this.gravity = 1;
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
    rect(this.x,this.y,this.w,this.h);         
  }  

  collide(gObs) {
    return collideRectRect(this.x, this.y, this.w, this.h, gObs.x, gObs.y, gObs.w, gObs.h);

  }
}

class groundObstacles {
  constructor() {
    this.w = 50;
    this.h = 100;
    this.x = width;
    this.y = height - this.h;
   
  }

  move() {
    this.x -= 8;
  }

  display() {
    rect(this.x,this.y,this.w,this.h); 
  }
}

// class airObstacles {
//   constructor() {
//     this.x;
//     this.y;
//     this.dx;
//   }

//   move() {
//     this.x -= 10;
//   }

//   display() {
//     rect(this.x,this.y,this.w,this.h);
//   }
// }


function keyPressed() {
  if (keyCode === 87 || keyCode === 38) {
    player.jump();
  }
}

function printScore() { 
  textAlign(LEFT);      
  fill(50);       
  textSize(30); 
  text("Score: "+ score, 5*width/6, height/9); 
}


function StartScreen() {             
  background(236, 240, 241);         
  textAlign(CENTER);               
  fill(52, 73, 94);                
  textSize(100);                     
  text("Start", width/2, height/2); 

  fill(92,167,182);                 
  noStroke();                        
  rectMode(CENTER);                  
  rect(width/2, height-40, 200,60,5); 
  fill(236,240,241);               
  textSize(30);                  
  text("Jump", width/2, height-30);   
}

function endScreen() { 

  background(23, 24, 24,3);   
  textAlign(CENTER);        
  fill(255, 227, 132);                  
  textSize(30);                            
  text("Highest Score", width/2, height/10);           

  fill(230, 180, 80);                      
  textSize(30);                          
  text("Score", width/2, height/2-110);    
  textSize(150);                       
  text(score, width/2, height/2+50);       

  fill(92,167,182);                  
  rectMode(CENTER);                
  noStroke();                      
  rect(width/2, height-40, 200,60,5);   
  fill(236,240,241);                 
  textSize(30);                   
  text("Restart PLay Again", width/2, height-30);    
}






