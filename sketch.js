var bird;
var pipes =[];

function setup() {
  createCanvas(1800,1000);
  bird = new Bird();
  pipes.push(new Pipe());  
    // put setup code here
}

function draw() {
 
    background(0);
    bird.show();
    bird.update();  


    if(frameCount% 40 == 0){
        pipes.push(new Pipe());  
    }

    for( var i = pipes.length-1; i>=0; i--){
    pipes[i].show();
    pipes[i].update();
      
//collison
    if(pipes[i].hits(bird)){

    }

//offscreen pipes deleting 
    if(pipes[i].offscreen()){
        pipes.splice(i,1);
    }

    }   
    // put drawing code here 
}

function keyPressed(){
    if(key==' '){ 
        bird.up();
       // console.log("SPACE")
    }
}


//bird.js 
function Bird(){ 
    this.y = 500;  
    this.x =500;
    this.gravity = 0.4;
    this.lift = -13;
    this.velocity = 0;  

    this.show = function(){
        fill(255);
        ellipse(this.x,this.y, 50,50); 
    }

    this.up = function(){ 
        this.velocity += this.lift;
    }
    

    this.update = function (){ 
         this.velocity+=this.gravity;
         
         this.y+=this.velocity;

//if touch the bottom 
         if(this.y>height){
             this.y=height;
             this.velocity=0;
         }
    }
}



////PIPE.js
function Pipe(){
    this.top = random(height/2);
    this.bottom = random(height/2);
    this.x = width;
    this.w = 30;
    this.speed = 5;

    this.show = function(){
        fill(255);
        if(this.highlight){
            fill(255,0,0);
        }
        //rect(this.x, 0 ,this.w , this.top);
        rect(this.x, height-this.bottom,this.w, this.bottom);
    }

    this.update = function(){
        this.x -= this.speed;
    }
    

    this.offscreen = function(){ 
        if(this.x < this.w)
        {  return true; } 
          

            else
             {
                return false;
            }
    }


    this.hits=function(bird){
        if(bird.y> height-this.bottom){
            if(bird.x>this.x && bird.x< this.x+this.w){
                this.highlight= true;
                return true;
            }
      
        }
        this.highlight=false;
        return false;


    }




}

