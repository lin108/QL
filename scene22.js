var sceneInit = true;
var sceneGame = false;
var bird;
var pipes =[];
var score = 10;
var bg;
var lijia;

// console.log(scoreEl)


// scoreEl.textContent = score;

function preload(){
    Char = loadImage("assets/Char1.png");
    bg=loadImage("assets/BG.jpg");
}

function setup() {
  lijia = new lijia();

/*  var lijia = createSprite(800,800);
 lijia.addAnimation('normal','assets/Char1.png','assets/CharUp.png');
 lijia.mouseActive=true;
  
  createCanvas(1800,1000);
  bird = new Bird();
  pipes.push(new Pipe());   */
 
  
}

function draw() {

    background(bg);
//initial scene
    if(sceneInit == true){
        background(35);
        fill(255,255,0);
        text("START",500,500);
         lijia.show(); 
//LIJIA
        /* if(lijia.mouseIsOver){
            lijia.rotation-= 10;
            lijia.visible=!lijia.mouseIsPressed
        } */
       
       /*  drawSprites(); */
     
    }
//game scene

    else if(sceneGame==true){

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
}



function mousePressed(){
    if(sceneInit==true){
        if(mouseX<500){
            sceneGame=true;
        }
        sceneInit=false;
    }
    
}


function keyPressed(){
    if(key==' '){ 
        bird.up();
       // console.log("SPACE")
    }
}

function lijia(){
    this.x=800;
    this.y=500;
    this.show = function(){
        image(Char,this.x,this.y,800,500);
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
        image(Char,this.x,this.y,60,60);
        // var img = new Image();
        // img.src = "r1.png"
        // this.img = img;

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
                score= score-1;
               // console.log(score)
                updateScore(score)
                return true;
            }
      
        }
        this.highlight=false;
        return false;


    }


}


//formal parameter
function updateScore(num) {
    var scoreEl = document.querySelector(".score-board");
    scoreEl.innerHTML = num;
}


