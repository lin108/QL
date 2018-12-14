
var x, y;

function preload() {

 x = loadAnimation('r2.png', 'r2.png');


}

function setup() {
  createCanvas(1800, 1300);
}

function draw() {
  background(255, 255, 255);

  //specify the animation instance and its x,y position
  //animation() will update the animation frame as well
  animation(x, 300, 150);
  animation(y, 500, 150);
}
