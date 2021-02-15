// Jump - CS30 Major-Project
// David(Zihan) Yang
// February 10th, 2021
//
// Project explanation/Nice to have:
// - describe what you did to take this project "above and beyond"

let player, gObs;
let lastAddedObstacle = 0;
let gObstacles = []; 

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





