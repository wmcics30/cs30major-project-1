// Jump - CS30 Major-Project
// David(Zihan) Yang
// February 10th, 2021
//
// Project explanation/Nice to have:
// - describe what you did to take this project "above and beyond"

let player;
let lastAddedObstacle = 0;

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
    this.x = 100;              
    this.y = height - this.h; 
    this.dy;    
    this.gravity = 1;
  }  
  
  jump(){  
    if(this.y === height - this.h) {
    }                   
  }
  
  move(){                                       
  }
  
  display(){                                       
    rect(this.x,this.y,this.w,this.h);         
  }  
}

class groundObstacles {
  constructor() {
    this.x = width;
    this.y = height - this.h;
    this.w;
    this.h;
  }

  move() {
    
  }
}

class airObstacles {
  constructor() {
    this.x;
    this.y;
    this.dx;
  }

  move() {
    this.x -= 10;
  }

  display() {
    rect(this.x,this.y,this.w,this.h);
  }
}


function keyPressed() {
  if (key === 87 || key === 38) {
    player.jump();
  }
}


  