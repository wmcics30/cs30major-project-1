// Jump - CS30 Major-Project
// David(Zihan) Yang
// February 10th, 2021
//
// Project explanation/Nice to have:
// - describe what you did to take this project "above and beyond"

let player;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Character();
}

function draw() {
  background(220);
  player.display();
  player.move();
}

class Character{                  
  constructor(){          
    this.w = 50;              
    this.h = 100;
    this.x = 75;              
    this.y = height-this.h; 
    this.dx = 5;    
  }  
  
  jump(){                     
  }
  
  move(){                                       
  }
  
  display(){                                       
    rect(this.x,this.y,this.w,this.h);         
  }  
}
 
function keyPressed() {
  if (key === 87 || key === 38) {
    player.jump();
  }
}

class groundObstacles {
  constructor() {
    this.x;
    this.y;
    
  }
}
  