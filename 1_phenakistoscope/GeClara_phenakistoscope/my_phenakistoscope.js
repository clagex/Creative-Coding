// this Pscope is inspired by nintendo company and its intellectual property
// this code has three images (sequence) loaded, others are done by code

//fields
var darkSky;
var lightSky;
var bobaNum;
var bobaCupWidth;
var bobaCupHeight;

//set up
function setup_pScope(pScope) {
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.draw_slits(false);
  pScope.set_direction(CCW);
  pScope.set_slice_count(16);
  pScope.load_image_sequence("kirby", "png", 20);
  pScope.load_image_sequence("cloud", "png", 8);
  pScope.load_image("grass", "png");
  rectMode(CENTER);
  colorMode(RGB, 255, 255, 255, 1);
}

function setup_layers(pScope) {
  //lets us draw the whole circle background, ignoring the boundaries
  new PLayer(null, 65, 131, 44); //dark green background
  darkSky = color(115, 164, 246);
  lightSky = color(148, 208, 247);
  //the sky layers
  var skyLyr1 = new PLayer(darkSkyBG);
  skyLyr1.mode(RING);
  skyLyr1.set_boundary(900, 1000);

  var skyLyr2 = new PLayer(lightSkyBG);
  skyLyr2.mode(RING);
  skyLyr2.set_boundary(525, 650);

  var lerpLyr1 = new PLayer(lerpSkyBG1);
  lerpLyr1.mode(RING);
  lerpLyr1.set_boundary(650, 675);

  var lerpLyr2 = new PLayer(lerpSkyBG2);
  lerpLyr2.mode(RING);
  lerpLyr2.set_boundary(675, 700);

  var lerpLyr3 = new PLayer(lerpSkyBG3);
  lerpLyr3.mode(RING);
  lerpLyr3.set_boundary(700, 725);

  var lerpLyr4 = new PLayer(lerpSkyBG4);
  lerpLyr4.mode(RING);
  lerpLyr4.set_boundary(725, 750);

  var lerpLyr5 = new PLayer(lerpSkyBG5);
  lerpLyr5.mode(RING);
  lerpLyr5.set_boundary(750, 775);

  var lerpLyr6 = new PLayer(lerpSkyBG6);
  lerpLyr6.mode(RING);
  lerpLyr6.set_boundary(775, 800);

  var lerpLyr7 = new PLayer(lerpSkyBG7);
  lerpLyr7.mode(RING);
  lerpLyr7.set_boundary(800, 825);

  var lerpLyr8 = new PLayer(lerpSkyBG8);
  lerpLyr8.mode(RING);
  lerpLyr8.set_boundary(825, 850);

  var lerpLyr9 = new PLayer(lerpSkyBG9);
  lerpLyr9.mode(RING);
  lerpLyr9.set_boundary(850, 900);

  // the center background layber
  var centerLyr = new PLayer(centerBG);
  centerLyr.mode(RING);
  centerLyr.set_boundary(0, 480);

  //cloud layer that rotates around center
  var cloudLyr = new PLayer(cloud);
  cloudLyr.mode(RING);
  cloudLyr.set_boundary(600, 900);

  // a coin layer that appears after kirby ate the mushroom
  var coinLyr = new PLayer(coin);
  coinLyr.mode(RING);
  coinLyr.set_boundary(500, 550);

  // the kirby layer with bright green background
  var kirbyLyr = new PLayer(kirby);
  kirbyLyr.mode(RING);
  kirbyLyr.set_boundary(490, 508);

  var grassLyr = new PLayer(grass);
  grassLyr.mode(RING);
  grassLyr.set_boundary(490, 508);

  // center joystick layers
  var baseLyr = new PLayer(joystickBase);
  baseLyr.mode(RING);
  baseLyr.set_boundary(0, 480);

  var joystickLyr = new PLayer(joystick);
  joystickLyr.mode(RING);
  joystickLyr.set_boundary(0, 480);

  // mushroom layer
  var mushroomLyr = new PLayer(mushroom);
  mushroomLyr.mode(SWIRL(2));
  mushroomLyr.set_boundary(250, 625);

}

//mushroom layer
function mushroom(x, y, animation, pScope) {
  push();
  rotate(animation.frame * 180); // rotate around the center
  var radius;
  // the mushroom turns big and then small
  if (animation.frame <= 0.6) {
    radius = 7 * animation.frame;
  }
  if (animation.frame > 0.6) {
    var radius = 7 - 4 * animation.frame;
  }
  drawMushroom(x, y, radius);
  pop();
}
// draw the whole mushroom
function drawMushroom(x, y, pixelSize) {
  drawHalfMushroom(x, y, pixelSize);
  push(); // flip through y axis and draw the other half
  translate(x, y);
  applyMatrix(-1, 0, 0, 1, 0, 0);
  translate(-x, -y);
  drawHalfMushroom(x, y, pixelSize);
  pop();
}
// draw the hald mushroom
function drawHalfMushroom(x, y, pixelSize) {
  var skinShade = color(217, 186, 158);
  var skinCol = color(245, 224, 198);
  var darkRed = color(162, 27, 13);
  var midRed = color(235, 28, 36);
  var brightRed = color(245, 16, 25);
  rectMode(CENTER);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  stroke(0);
  fill(255);
  strokeWeight(pixelSize / 2);
  //shape
  beginShape();
  vertex(x - 0 * pixelSize, y - 8 * pixelSize);
  vertex(x + 3 * pixelSize, y - 8 * pixelSize);
  vertex(x + 3 * pixelSize, y - 7 * pixelSize);
  vertex(x + 5 * pixelSize, y - 7 * pixelSize);
  vertex(x + 5 * pixelSize, y - 6 * pixelSize);
  vertex(x + 6 * pixelSize, y - 6 * pixelSize);
  vertex(x + 6 * pixelSize, y - 5 * pixelSize);
  vertex(x + 7 * pixelSize, y - 5 * pixelSize);
  vertex(x + 7 * pixelSize, y - 3 * pixelSize);
  vertex(x + 8 * pixelSize, y - 3 * pixelSize);
  vertex(x + 8 * pixelSize, y + 3 * pixelSize);
  vertex(x + 7 * pixelSize, y + 3 * pixelSize);
  vertex(x + 7 * pixelSize, y + 4 * pixelSize);
  vertex(x + 6 * pixelSize, y + 4 * pixelSize);
  vertex(x + 6 * pixelSize, y + 6 * pixelSize);
  vertex(x + 5 * pixelSize, y + 6 * pixelSize);
  vertex(x + 5 * pixelSize, y + 7 * pixelSize);
  vertex(x - 0 * pixelSize, y + 7 * pixelSize);
  endShape();
  //face, the fill color name stated which part it is being drawn
  noFill();
  beginShape();
  vertex(x - 0 * pixelSize, y + 2 * pixelSize);
  vertex(x + 5 * pixelSize, y + 2 * pixelSize);
  vertex(x + 5 * pixelSize, y + 3 * pixelSize);
  vertex(x + 8 * pixelSize, y + 3 * pixelSize);
  endShape();
  noStroke();
  fill(0);
  rect(x + 6.25 * pixelSize, y + 3.5 * pixelSize, pixelSize, 1 * pixelSize);
  fill(skinShade);
  rect(x + 2.4 * pixelSize, y + 2.75 * pixelSize, 4.8 * pixelSize, 1 * pixelSize);
  rect(x + 5.25 * pixelSize, y + 4.5 * pixelSize, 1 * pixelSize, 2.5 * pixelSize);
  rect(x + 4.25 * pixelSize, y + 6.25 * pixelSize, 1 * pixelSize, 1 * pixelSize);
  fill(skinCol);
  rect(x + 2.4 * pixelSize, y + 4.5 * pixelSize, 4.8 * pixelSize, 2.5 * pixelSize);
  rect(x + 1.9 * pixelSize, y + 6.25 * pixelSize, 3.8 * pixelSize, 1 * pixelSize);
  fill(0);
  rect(x + 2 * pixelSize, y + 3 * pixelSize, pixelSize, 2 * pixelSize);
  fill(darkRed);
  rect(x + 6.5 * pixelSize, y + 1.89 * pixelSize, 2.5 * pixelSize, 2 * pixelSize);
  rect(x + 5.75 * pixelSize, y - 3.75 * pixelSize, 2 * pixelSize, 2 * pixelSize);
  rect(x + 4.75 * pixelSize, y + 1.35 * pixelSize, 2 * pixelSize, 0.8 * pixelSize);
  fill(darkRed);
  rect(x + 0.5 * pixelSize, y - 7.25 * pixelSize, pixelSize, pixelSize);
  fill(midRed);
  rect(x + 6 * pixelSize, y + 1 * pixelSize, 1.5 * pixelSize, 1.5 * pixelSize);
  rect(x + 4.88 * pixelSize, y + 0.63 * pixelSize, 0.75 * pixelSize, 0.75 * pixelSize);
  rect(x + 6.39 * pixelSize, y - 2.4 * pixelSize, 0.75 * pixelSize, 0.75 * pixelSize);
  rect(x + 5.75 * pixelSize, y - 1.75 * pixelSize, 0.75 * pixelSize, 4.5 * pixelSize);
  rect(x + 4.65 * pixelSize, y - 3.61 * pixelSize, 1.5 * pixelSize, 0.75 * pixelSize);
  rect(x + 3.75 * pixelSize, y - 4.36 * pixelSize, 2 * pixelSize, 0.77 * pixelSize);
  rect(x + 2.85 * pixelSize, y - 5.25 * pixelSize, 1.75 * pixelSize, 1.1 * pixelSize);
  rect(x + 1 * pixelSize, y - 6.25 * pixelSize, 2 * pixelSize, 1 * pixelSize);
  fill(brightRed);
  rect(x + 4.95 * pixelSize, y - 1.48 * pixelSize, 0.88 * pixelSize, 3.55 * pixelSize);
  rect(x + 4 * pixelSize, y - 2.86 * pixelSize, 1.5 * pixelSize, 0.75 * pixelSize);
  rect(x + 2.95 * pixelSize, y - 3.6 * pixelSize, 2 * pixelSize, 0.75 * pixelSize);
  rect(x + 1.25 * pixelSize, y - 4.35 * pixelSize, 3 * pixelSize, 0.75 * pixelSize);
  rect(x + 0.9 * pixelSize, y - 5.24 * pixelSize, 2.15 * pixelSize, 1.1 * pixelSize);
}

//kirby lyr, kirby jumps up and down
function kirby(x, y, animation, pScope) {
  pScope.draw_image_from_sequence("kirby", x, -600 - animation.wave(-1) * 50, animation.frame);
}
//kirby background, the bright green grass imported from png
function grass(x, y, animation, pScope) {
  push()
  scale(4.5, 5);
  pScope.draw_image("grass", 0, 96.5);
  pop();
}

//sky background, 2 main color and 9 lerp colors
function darkSkyBG(x, y, animation, pScope) {
  pScope.fill_background(darkSky);
}

function lerpSkyBG1(x, y, animation, pScope) {
  var lerp = lerpColor(darkSky, lightSky, 0.9);
  pScope.fill_background(lerp);
}

function lerpSkyBG2(x, y, animation, pScope) {
  var lerp = lerpColor(darkSky, lightSky, 0.8);
  pScope.fill_background(lerp);
}

function lerpSkyBG3(x, y, animation, pScope) {
  var lerp = lerpColor(darkSky, lightSky, 0.7);
  pScope.fill_background(lerp);
}

function lerpSkyBG4(x, y, animation, pScope) {
  var lerp = lerpColor(darkSky, lightSky, 0.6);
  pScope.fill_background(lerp);
}

function lerpSkyBG5(x, y, animation, pScope) {
  var lerp = lerpColor(darkSky, lightSky, 0.5);
  pScope.fill_background(lerp);
}

function lerpSkyBG6(x, y, animation, pScope) {
  var lerp = lerpColor(darkSky, lightSky, 0.4);
  pScope.fill_background(lerp);
}

function lerpSkyBG7(x, y, animation, pScope) {
  var lerp = lerpColor(darkSky, lightSky, 0.3);
  pScope.fill_background(lerp);
}

function lerpSkyBG8(x, y, animation, pScope) {
  var lerp = lerpColor(darkSky, lightSky, 0.2);
  pScope.fill_background(lerp);
}

function lerpSkyBG9(x, y, animation, pScope) {
  var lerp = lerpColor(darkSky, lightSky, 0.1);
  pScope.fill_background(lerp);
}

function lightSkyBG(x, y, animation, pScope) {
  pScope.fill_background(lightSky);
}

//draw the joystick in the middle
//the background as the ground
function centerBG(x, y, animation, pScope) {
  pScope.fill_background(208, 148, 91);
}

//the base, which is another layer drawn before the stick
function joystickBase(x, y, animation, pScope) {
  //some of the ground texture before the joystickL
  randomSeed(93);
  noStroke();
  fill(120, 85, 53); // outside dirt texture
  for (var i = 0; i < 30; i++) {
    rect(random(-100, 100), random(100, 400) + animation.wave(1) * 10, random(10), random(10));
  }
  // inner texture
  rect(0, 0, 300, 300);
  fill(184, 130, 81); // first circle
  ellipse(0, 0, 250);
  fill(158, 112, 70); // second circle
  ellipse(0, 0, 200);
  fill(184, 130, 81); // third circle
  ellipse(0, 0, 100);
  fill(70); // center circle
  ellipse(0, 0, 40);
}

//joy stick layer, with the stick and the handle
function joystick(x, y, animation, pScope) {
  // it is only drawn on one frame
  if (animation.frame == 9 / 16) {
    drawJoystick(0, 200, 8, 1);
  } else drawJoystick(0, 200, 8, 0);
}

//draw the joystick handle as whole
//and add the stick on to it
function drawJoystick(x, y, pixelSize, trans) {
  //draw the joystick
  drawHalfJoystick(x, y, pixelSize, trans);
  push();
  translate(x, y);
  applyMatrix(-1, 0, 0, 1, 0, 0); //flip through y axis
  translate(-x, -y);
  drawHalfJoystick(x, y, pixelSize, trans);
  pop();
  //draw the stick for handle
  strokeWeight(pixelSize / 2);
  stroke(30, 30, 30, trans);
  fill(78, 78, 78, trans);
  rect(x, y - 75 - pixelSize * 7, 20, 145);
  noStroke();
  ellipse(0, 0, 20);
}

//draw half of the joystick handle
function drawHalfJoystick(x, y, pixelSize, trans) {
  rectMode(CENTER);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  strokeWeight(pixelSize / 2);
  stroke(10, 10, 10, trans);
  fill(235, 28, 36, trans);
  beginShape();
  vertex(x - 1 * pixelSize, y - 7 * pixelSize);
  vertex(x + 2 * pixelSize, y - 7 * pixelSize);
  vertex(x + 2 * pixelSize, y - 6 * pixelSize);
  vertex(x + 4 * pixelSize, y - 6 * pixelSize);
  vertex(x + 4 * pixelSize, y - 5 * pixelSize);
  vertex(x + 5 * pixelSize, y - 5 * pixelSize);
  vertex(x + 5 * pixelSize, y - 4 * pixelSize);
  vertex(x + 6 * pixelSize, y - 4 * pixelSize);
  vertex(x + 6 * pixelSize, y - 2 * pixelSize);
  vertex(x + 7 * pixelSize, y - 2 * pixelSize);
  vertex(x + 7 * pixelSize, y + 2 * pixelSize);
  vertex(x + 6 * pixelSize, y + 2 * pixelSize);
  vertex(x + 6 * pixelSize, y + 4 * pixelSize);
  vertex(x + 5 * pixelSize, y + 4 * pixelSize);
  vertex(x + 5 * pixelSize, y + 5 * pixelSize);
  vertex(x + 4 * pixelSize, y + 5 * pixelSize);
  vertex(x + 4 * pixelSize, y + 6 * pixelSize);
  vertex(x + 2 * pixelSize, y + 6 * pixelSize);
  vertex(x + 2 * pixelSize, y + 7 * pixelSize);
  vertex(x - 1 * pixelSize, y + 7 * pixelSize);
  endShape();
}

//draw the cloud, which rotate seamlessly around center
function cloud(x, y, animation, pScope) {
  push();
  scale(2.5);
  rotate(animation.frame * 51.5);
  pScope.draw_image_from_sequence("cloud", 0, -350, animation.frame);
  pop();
}

//draw the coin for the layer
function coin(x, y, animation, pScope) {
  // coin appears after kirby ate the mushroom, and disappears
  // stays up at frame 9,10,11
  if (animation.frame == 10 / 16) {
    drawCoin(0, 765, 5, 1);
  } else if (animation.frame == 9 / 16 || animation.frame == 11 / 16) {
    drawCoin(0, 750, 5, 0.8);
  } else if (animation.frame == 8 / 16 || animation.frame == 12 / 16) {
    drawCoin(0, 720, 5, 0.7);
  } else if (animation.frame == 7 / 16 || animation.frame == 13 / 16) {
    drawCoin(0, 690, 5, 0.6);
  } else if (animation.frame == 6 / 16 || animation.frame == 14 / 16) {
    drawCoin(0, 660, 5, 0.7);
  } else if (animation.frame == 5 / 16 || animation.frame == 15 / 16) {
    drawCoin(0, 630, 5, 0.5);
  }
}

function drawCoin(x, y, pixelSize, trans) {
  rectMode(CENTER);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  strokeWeight(pixelSize / 2);
  // draw the coin outline
  stroke(0, 0, 0, trans);
  fill(245, 186, 6, trans);
  beginShape();
  vertex(x - 2 * pixelSize, y + 8 * pixelSize);
  vertex(x + 3 * pixelSize, y + 8 * pixelSize);
  vertex(x + 3 * pixelSize, y + 7 * pixelSize);
  vertex(x + 5 * pixelSize, y + 7 * pixelSize);
  vertex(x + 5 * pixelSize, y + 5 * pixelSize);
  vertex(x + 6 * pixelSize, y + 5 * pixelSize);
  vertex(x + 6 * pixelSize, y - 4 * pixelSize);
  vertex(x + 5 * pixelSize, y - 4 * pixelSize);
  vertex(x + 5 * pixelSize, y - 6 * pixelSize);
  vertex(x + 3 * pixelSize, y - 6 * pixelSize);
  vertex(x + 3 * pixelSize, y - 7 * pixelSize);
  vertex(x - 2 * pixelSize, y - 7 * pixelSize);
  vertex(x - 2 * pixelSize, y - 6 * pixelSize);
  vertex(x - 4 * pixelSize, y - 6 * pixelSize);
  vertex(x - 4 * pixelSize, y - 5 * pixelSize);
  vertex(x - 5 * pixelSize, y - 5 * pixelSize);
  vertex(x - 5 * pixelSize, y - 3 * pixelSize);
  vertex(x - 6 * pixelSize, y - 3 * pixelSize);
  vertex(x - 6 * pixelSize, y + 4 * pixelSize);
  vertex(x - 5 * pixelSize, y + 4 * pixelSize);
  vertex(x - 5 * pixelSize, y + 6 * pixelSize);
  vertex(x - 4 * pixelSize, y + 6 * pixelSize);
  vertex(x - 4 * pixelSize, y + 7 * pixelSize);
  vertex(x - 2 * pixelSize, y + 7 * pixelSize);
  vertex(x - 2 * pixelSize, y + 8 * pixelSize);
  endShape();
  //draw the inner black lines
  fill(0, 0, 0, trans);
  rect(x - 0.5 * pixelSize, y + 7.25 * pixelSize, 2 * pixelSize, 0.75 * pixelSize);
  rect(x - 2.8 * pixelSize, y + 6.2 * pixelSize, 2 * pixelSize, 0.75 * pixelSize);
  rect(x - 3.75 * pixelSize, y + 5 * pixelSize, 2 * pixelSize, 2 * pixelSize);
  rect(x - 4.8 * pixelSize, y + 0.5 * pixelSize, 1.5 * pixelSize, 6.75 * pixelSize);
  rect(x - 3.75 * pixelSize, y - 4 * pixelSize, 2 * pixelSize, 2 * pixelSize);
  rect(x - 2.8 * pixelSize, y - 5.2 * pixelSize, 2 * pixelSize, 0.75 * pixelSize);
  rect(x - 0.5 * pixelSize, y - 6.25 * pixelSize, 2 * pixelSize, 0.75 * pixelSize);
  rect(x - 1 * pixelSize, y + 1 * pixelSize, 0.75 * pixelSize, 8 * pixelSize);
  rect(x + 0.75 * pixelSize, y - 3 * pixelSize, 4 * pixelSize, 0.75 * pixelSize);
  //draw the inner white lines
  stroke(255, 255, 255, trans);
  fill(255, 255, 255, trans);
  rect(x + 1.75 * pixelSize, y + 7.25 * pixelSize, 1.5 * pixelSize, 0.75 * pixelSize);
  rect(x + 3.6 * pixelSize, y + 6.25 * pixelSize, 1.5 * pixelSize, 0.5 * pixelSize);
  rect(x + 4.25 * pixelSize, y + 5.75 * pixelSize, 0.5 * pixelSize, 1.5 * pixelSize);
  rect(x + 5.25 * pixelSize, y + 0.5 * pixelSize, 0.5 * pixelSize, 7.8 * pixelSize);
  rect(x + 1.75 * pixelSize, y - 6.25 * pixelSize, 1.5 * pixelSize, 0.75 * pixelSize);
  rect(x + 3.6 * pixelSize, y - 5.25 * pixelSize, 1.5 * pixelSize, 0.5 * pixelSize);
  rect(x + 4.25 * pixelSize, y - 4.75 * pixelSize, 0.5 * pixelSize, 1.5 * pixelSize);
  rect(x + 2.5 * pixelSize, y + 1.5 * pixelSize, 0.75 * pixelSize, 7.5 * pixelSize);
  rect(x + 1.25 * pixelSize, y + 5 * pixelSize, 3 * pixelSize, 0.75 * pixelSize);
}
