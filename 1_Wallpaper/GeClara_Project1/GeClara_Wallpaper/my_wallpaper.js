//your parameter variables go here!
var gridWidth = 210; var gridHeight = 200;
var xPos = 100;
var yPos = -50;
var size = 0.8;
var seed = 68;
var c1 = [30,100,150]; //background upper color
var c2 = [61,51,109]; //background lower color

//constants calculated from variables //can be changed
var bodyWr = gridWidth*0.19; var bodyHr = gridHeight*0.32;
var headWr = bodyWr*0.5; var headHr = bodyHr*0.8;
var signalWr = gridWidth*0.25; var signalHr = gridHeight*0.15;
var signalXPos = xPos-gridWidth*0.2; var signalYPos =  yPos-gridHeight*0.45;
var flying = 1;


function setup_wallpaper(pWallpaper) {
  randomSeed(seed);
  colorMode(RGB,255,255,255,1);
  pWallpaper.output_mode(GLIDE_WALLPAPER);
  pWallpaper.resolution(A3);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = gridWidth;
  pWallpaper.grid_settings.cell_height = gridHeight;
  pWallpaper.grid_settings.row_offset  = 120;
}

//set a gradient color backgound
function wallpaper_background() {
  col1 = color(c1[0],c1[1],c1[2]);
  col2 = color(c2[0],c2[1],c2[2]);
  setGradient(col1,col2);
}

//draw robin, x, y value is at its center
function my_symbol(x, y) {
  strokeJoin(ROUND);
  smooth();
  let booleans = [0, 1];
  flying = random(booleans);
  drawStaff(xPos, yPos,(bodyHr*0.92)*size);
  if(flying==0){drawRobin(xPos, yPos);}
  else{drawRobin(xPos, yPos-gridHeight*0.1*size);}
}

//a function to draw robin's body, leg and costume with colors
//does not draw the staff
function drawRobin(x,y){
  // color constants
  let myWhite = color(227,221,204);
  let myGreen = color(77,144,104);
  let myYellow = color(231,187,74);
  let myRed = color(192,50,42);
  let myBrown = color(55,33,15);
  drawLight(signalXPos, signalYPos, x+bodyWr*0.2*size, y+bodyHr*0.5*size);
  drawSignal(signalXPos, signalYPos);
  drawRobinLeg(x,y,(bodyHr*0.91)*size,myBrown);
  drawRobinBody(x,y,myWhite,myRed,myYellow);
  drawRobinCostume(x,y,myGreen, myYellow);
}

// to draw the robin's body, wing, tail, beak and red fur
function drawRobinBody(x,y,backCol,frontCol,wingCol){
  stroke(0);
  strokeWeight(bodyWr*0.015*size);
  //draw the body
  fill(backCol);
  bezier(x-(bodyWr*1.01)*size,y,         x-(bodyWr*1.01)*size,y+bodyHr*size,
         x+bodyWr*0.93*size,y+bodyHr*size,    x+bodyWr*size,y-bodyHr*0.1*size);
  noStroke();
  rect(x, y-(bodyHr*0.3)*size, bodyWr*0.99*size, bodyHr*0.22*size);

  //head
  stroke(0);
  strokeWeight(bodyWr*0.015*size);
  fill(0);
  bezier(x-headWr*2.1*size,y+headHr*0.026*size, x-headWr*2.1*size,y-headHr*0.955*size,
         x+headWr*0.1*size,y-(headHr*0.955)*size,     x+headWr*0.5*size,y+headHr*0.01*size);

  //tail and beak
  beginShape();
  vertex(x+bodyWr*0.6*size,y-bodyHr*0.2*size);
  quadraticVertex(x+bodyWr*0.75*size,y-bodyHr*0.4*size, x+bodyWr*0.7*size,y-bodyHr*0.7*size);
  quadraticVertex(x+bodyWr*1*size,y-bodyHr*0.55*size, x+bodyWr*1.3*size,y-bodyHr*0.55*size);
  quadraticVertex(x+bodyWr*1.1*size,y-bodyHr*0.4*size, x+bodyWr*1*size,y-bodyHr*0.1*size);
  endShape();
  triangle(x-headWr*1.86*size,y-headHr*0.45*size, x-headWr*2.2*size,y-headHr*0.4*size, x-headWr*1.95*size,y-headHr*0.33*size);

  //wing
  if(flying==0){
    bezier(x-headWr*0.5*size,y+headHr*0.01*size, x-headWr*0.5*size,y-headHr*size,
           x+bodyWr*2.5*size,y+(headHr*0.1)*size,  x+headWr*0.5*size,y+headHr*0.075*size);
  } else {
    fill(wingCol);
    bezier(x+bodyWr*1.1*size,y-bodyHr*0.5*size, x+bodyWr*0.9*size,y-bodyHr*0.1*size,
           x+bodyWr*0.2*size,y+bodyHr*0.09*size, x-bodyWr*0.01*size,y+bodyHr*0.07*size);
    fill(0);
     bezier(x-headWr*0.2*size,y+headHr*0.18*size, x+headWr*0.1*size,y-headHr*1.5*size,
            x+bodyWr*2.5*size,y-headHr*1.1*size,  x+headWr*0.3*size,y+headHr*0.075*size);
  }

  //draw the front red fur
  fill(frontCol);
  beginShape();
  vertex(x-bodyWr*0.9*size,y-bodyHr*0.4*size);
  bezierVertex(x-bodyWr*0.7*size,y-bodyHr*0.47*size, x-bodyWr*0.2*size,y-bodyHr*0.6*size, x-bodyWr*0.3*size,y-headHr*0.25*size);
  bezierVertex(x-bodyWr*0.3*size,y-bodyHr*0.2*size, x+bodyWr*0.6*size,y+bodyHr*0.3*size, x-bodyWr*0.5*size,y+bodyHr*0.66*size);
  bezierVertex(x-bodyWr*1.1*size,y+bodyHr*0.49*size, x-bodyWr*1.16*size,y-bodyHr*0.1*size, x-bodyWr*0.9*size,y-bodyHr*0.4*size);
  endShape();
}

// draw the robin's leg
function drawRobinLeg(x,y,length,clr){
  smooth();
  stroke(clr);
  strokeWeight(gridWidth*0.006*size);
  noFill();
  var offset = -gridWidth*0.05*size;
  line(x, y, x+offset, y+length*0.99);
  line(x-offset*1.8, y, x-offset*0.5, y+length);
  bezier(x+offset*1.4, y+length, x+offset*1.3, y+length*0.9, x+offset*0.7, y+length*0.9,  x+offset*0.6, y+length*1.01);
  bezier(x-offset*0.1, y+length*1.01, x-offset*0.2, y+length*0.9, x-offset*0.8, y+length*0.9, x-offset*0.8, y+length*1.01);
}

// draw the costumes, including mask, badge, pants, belt and buttons
function drawRobinCostume(x,y,dominoClr, badgeClr){
  // draw the domino mask
  stroke(0);
  strokeWeight(bodyWr*0.015*size);
  fill(dominoClr);
  beginShape();
    vertex(x-headWr*1.87*size,y-headHr*0.45*size);
    quadraticVertex(x-headWr*1.6*size,y-headHr*0.5*size, x-headWr*1.4*size,y-headHr*0.45*size);
    quadraticVertex(x-headWr*1.35*size,y-headHr*0.5*size, x-headWr*1.45*size,y-headHr*0.55*size);
    quadraticVertex(x-headWr*1.03*size,y-headHr*0.42*size, x-headWr*1.45*size,y-headHr*0.25*size);
    quadraticVertex(x-headWr*1.38*size,y-headHr*0.3*size, x-headWr*1.4*size,y-headHr*0.37*size);
    quadraticVertex(x-headWr*1.55*size,y-headHr*0.25*size, x-headWr*1.95*size,y-headHr*0.35*size);
  endShape();
  fill(175);
  ellipse(x-headWr*1.69*size, y-headHr*0.4*size, headWr*0.25*size, headHr*0.035*size);
  //draw the robin badge background
  fill(0);
  push();
  translate(x-bodyWr*0.45*size, y-bodyHr*0.1*size);
  rotate(55);
  ellipse(0, 0, bodyWr*0.15*size, bodyHr*0.2*size);
  pop();
  // draw the "R"
  fill(badgeClr);
  beginShape();
    vertex(x-bodyWr*0.55*size, y-bodyHr*0.15*size);
    bezierVertex(x-bodyWr*0.35*size, y-bodyHr*0.21*size, x-bodyWr*0.35*size, y-bodyHr*0.15*size, x-bodyWr*0.4*size, y-bodyHr*0.1*size);
    vertex(x-bodyWr*0.31*size, y-bodyHr*0.02*size);
    vertex(x-bodyWr*0.46*size, y-bodyHr*0.09*size);
    vertex(x-bodyWr*0.48*size, y-bodyHr*0.02*size);
    vertex(x-bodyWr*0.535*size, y-bodyHr*0.01*size);
    vertex(x-bodyWr*0.5*size, y-bodyHr*0.12*size);
    vertex(x-bodyWr*0.45*size, y-bodyHr*0.125*size);
    vertex(x-bodyWr*0.455*size, y-bodyHr*0.105*size);
    bezierVertex(x-bodyWr*0.38*size, y-bodyHr*0.13*size, x-bodyWr*0.46*size, y-bodyHr*0.16*size, x-bodyWr*0.56*size, y-bodyHr*0.14*size);
  endShape();
  //draw pants
  fill(dominoClr);
  beginShape();
    vertex(x-bodyWr*0.91*size,y+bodyHr*0.39*size);
    quadraticVertex(x-bodyWr*0.05*size,y+bodyHr*0.45*size, x+bodyWr*0.87*size,y+bodyHr*0.3*size);
    quadraticVertex(x+bodyWr*0.7*size,y+bodyHr*0.55*size, x+bodyWr*0.42*size,y+bodyHr*0.645*size);
    quadraticVertex(x+bodyWr*0.14*size,y+bodyHr*0.54*size, x-bodyWr*0.61*size,y+bodyHr*0.62*size);
    quadraticVertex(x-bodyWr*0.83*size,y+bodyHr*0.53*size, x-bodyWr*0.925*size,y+bodyHr*0.39*size);
  endShape();
  //draw buttons
  fill(badgeClr);
  arc(x-bodyWr*1.04*size,y,gridWidth*0.02*size, gridHeight*0.01*size,-90,90,OPEN);
  arc(x-bodyWr*1.02*size,y+gridHeight*0.04*size,gridWidth*0.02*size, gridHeight*0.01*size,-120,110,OPEN);
  arc(x-bodyWr*1.0*size,y+gridHeight*0.08*size,gridWidth*0.02*size, gridHeight*0.01*size,-100,80,OPEN);
  //draw belt
  beginShape();
    vertex(x-bodyWr*0.925*size,y+bodyHr*0.39*size);
    quadraticVertex(x-bodyWr*0.05*size,y+bodyHr*0.45*size, x+bodyWr*0.87*size,y+bodyHr*0.3*size);
    quadraticVertex(x+bodyWr*0.89*size,y+bodyHr*0.27*size, x+bodyWr*0.9*size,y+bodyHr*0.25*size);
    quadraticVertex(x-bodyWr*0.1*size,y+bodyHr*0.34*size, x-bodyWr*0.98*size,y+bodyHr*0.3*size);
    quadraticVertex(x-bodyWr*0.95*size,y+bodyHr*0.35*size, x-bodyWr*0.925*size,y+bodyHr*0.39*size);
  endShape();
  rect(x-bodyWr*0.8*size,y+bodyHr*0.28*size,gridWidth*0.01*size, gridHeight*0.05*size,2);
  bezier(x-bodyWr*0.98*size,y+bodyHr*0.3*size, x-bodyWr*0.8*size,y+bodyHr*0.2*size, x-bodyWr*0.75*size,y+bodyHr*0.46*size, x-bodyWr*0.9*size,y+bodyHr*0.42*size);
  noFill()
  strokeCap(ROUND);
  arc(x-bodyWr*0.91*size,y+bodyHr*0.35*size,bodyWr*0.1*size, bodyHr*0.1*size, -154,90,OPEN);
}

//draw the staff that robin is stand on
function drawStaff(x,y,length){
  stroke(0);
  strokeWeight(bodyWr*0.015*size);
  fill(190,201,204);
  rect(0,y+length*0.94, gridWidth, length*0.06,2);
  stroke(0);
  strokeWeight(gridWidth*0.005*size)
  for(let i = gridWidth/5; i < gridWidth; i+=gridWidth/5){
    line(i,y+length*0.95,i,y+length*0.99);
  }
}

// draw the bat signal, light up when flying
function drawSignal(x,y){
  noStroke();
  if(flying==0){
    fill(150,150,150,0.5);
    ellipse(x,y,signalWr*2,signalHr*2);
  }
  else{
    fill(231,187,74,0.7);
    ellipse(x,y,signalWr*2,signalHr*2);
  }
  if (flying==0){fill(0,0,0,0.4);}
  else{fill(0,0,0,0.6);}
  drawHalfSignal(x,y);
    push();
    translate(x*2,0);
    applyMatrix(-1,0,0,1,0,0);
    drawHalfSignal(x,y);
    pop();
}

//draw half of batsignal
function drawHalfSignal(x,y){
  beginShape();
    vertex(x-signalWr*0.5,y-signalHr*0.8);
    quadraticVertex(x-signalWr*1.3,y, x-signalWr*0.6, y+signalHr*0.7);
    quadraticVertex(x-signalWr*0.7, y, x-signalWr*0.3, y+signalHr*0.35);
    quadraticVertex(x-signalWr*0.2, y, x, y+signalHr*0.7);
    vertex(x,y-signalHr*0.6);
    quadraticVertex(x-signalWr*0.05, y-signalHr*0.59, x-signalWr*0.1, y-signalHr*0.58);
    quadraticVertex(x-signalWr*0.15, y-signalHr, x-signalWr*0.2, y-signalHr*0.5);
    quadraticVertex(x-signalWr*0.45, y-signalHr*0.4, x-signalWr*0.5,y-signalHr*0.8);
  endShape();
}

//draw the light source from the lighted bat signal
function drawLight(x1,y1,x2,y2){
  if(flying==1){
    noStroke();
    fill(231,187,74,0.3);
    triangle(x1-signalWr*1, y1, x1+signalWr, y1, x2, y2);
  }
}

//function for the gradient for background color
function setGradient(c1, c2) {
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}
