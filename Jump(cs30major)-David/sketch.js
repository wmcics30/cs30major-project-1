// Jump - CS30 Major-Project
// David(Zihan) Yang
// February 10th, 2021
//
// Extra for Experts:
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
       this.w = ;              
       this.h = ;              
       this.x = ;              
       this.y = height-this.h; 
       this.dx = ;    
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

  