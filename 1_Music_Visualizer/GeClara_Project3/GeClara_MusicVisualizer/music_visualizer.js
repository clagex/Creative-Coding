// Song Artist = Katharine McPhee
// Song Name = The 20th Century Fox Mambo

// used counter, big changes at 50 seconds in and changes at 1min 42sec

// the particle system is referenced from https://p5js.org/examples/simulate-smokeparticles.html
// Particle System may cause lagging, can comment out the particle system
// in function draw_one_frame to see the non-lagging version without particle system
// the particle system is at line 62 to line 69, change the boolean to turn on and off
var particleSystem = true; // to turn on annd off the particle system

// vocal, drum, bass, and other are volumes ranging from 0 to 100
var firstRun = true;
var opa_vocal, opa_drum, opa_bass, opa_other, other_count; // set the opacity value
var sec, bassCount = 0; // counting variables
var curtainHeight = 500; // initial the height of the backdrop curtain
var foreCurtain, particle_texture; // the curtain image, and the particle tecture image
var wallLights = [], shuffleLight = [];// an array with light objects
var psLeft, psRight; // the particle system
var seed = 0; // the random seed number for the particle

function draw_one_frame(vocal, drum, bass, other, counter) {
  if (firstRun) {
    imageMode(CENTER);
    loadWallLight();
    foreCurtain = loadImage('assets/curtain.png');
    particle_texture = loadImage('assets/particle_texture.png');
    psLeft = new ParticleSystem(0, createVector(0, 500), particle_texture); // create the particle system
    psRight = new ParticleSystem(0, createVector(1280, 500), particle_texture); // create the particle system
    colorMode(RGB, 255, 255, 255, 1); //set opacity
    curtainHeight = 500;
    firstRun = false;
  }
  ellipseMode(CENTER);
  noStroke();
  sec = counter / 60; // get second through counter value

  // map for opacity
  opa_vocal = map(vocal, 0, 100, -1, 1, true); // vocal - spotlight
  opa_drum = map(drum, 0, 100, -1, 0.5, true); // drum - wall of light
  opa_bass = map(bass, 0, 100, -1, 0.3, true); // bass - two light in the back
  opa_other = map(other, 0, 100, -1, 0.3, true); // other - wall of light
  other_count = round(map(other, 0, 100, 0, 225, true)); // number count for other
  background(0); // clear the graphics each time
  // draw the stage
  drawStage();
  // draw the wall of light and two bass light
  drawDrumlight();
  drawBasslightR();
  drawBasslightL();
  //  draw the curtain, which will move up after 50 seconds and goes back down at 158 seconds
  if (sec > 50 && curtainHeight > 0 && sec < 52) {
    curtainHeight -= 10;
  } else if (sec > 158 && curtainHeight <= 500) {
    curtainHeight += 10;
  }
  drawCurtain(curtainHeight);
  // draw the microphone and the spotlight(vocal)
  drawSpotlight();
  drawMic();

  // ======== start of particle system =========
  if(particleSystem){
    randomSeed(counter);
    noSmooth(); // no smooth while drawing images to prevent lagging
    drawPaticle();
    noTint();
  }
  // ======== end of particle system ===========

  frontCurtain();
  smooth(); // enable smooth for drawing shapes
}

// function for the stage
// also draws little white spot like stage usually has
function drawStage() {
  if (sec < 50 || sec > 158) { // color is red-black when curtain is there
    var from = color(93, 14, 14);
    var to = color(20, 20, 20);
  } else { // if there are wall lights, draw reflection, else draw black
    if (opa_drum <= 0) {
      var from = color(10, 10, 10);
      var to = color(20, 20, 20);
    } else {
      var from = color(161, 127, 87, opa_drum);
      var to = color(20, 20, 20);
    }
  }
  noStroke();
  for (var i = 0; i < 250; i++) { // draw the gradient color
    var lerp = lerpColor(from, to, i / 120);
    fill(lerp);
    rect(0, 460 + i, 1280, 1);
  }
  fill(217, 218, 186);
  randomSeed(24);
  for (var i = 0; i < 50; i++) { // draw the white spots/confetti
    push();
    fill(217, 218, 186, random(1));
    translate(random(1280), random(530, 720));
    rect(0, 0, random(3, 7), random(3));
    pop();
  }
}

// curtains that will change its height from parameter
function drawCurtain(h) {
  randomSeed(99);
  noStroke();
  //var h = 500;
  fill(117, 20, 20);
  rect(0, 0, 1280, h - 10);
  for (var i = 0; i < 26; i++) {
    var w = random(40, 45);
    fill(150, 37, 37);
    rect(i * 50 + 10, 0, w, h, 0, 0, 20, 20);
  }
}

// a spot light whose opacity changes from the vocal numbers
function drawSpotlight() {
  var r = 80; //height of the ellipse
  var width = 150; // width of the ellipse
  var yPos = 700;
  var xPos = 640;
  noStroke();
  fill(255, 255, 200, opa_vocal);
  triangle(xPos, 0, xPos - width, yPos - r, xPos + width, yPos - r);
  ellipse(xPos, yPos - r, width * 2, r * 2);
  arc(xPos, yPos - r, width * 2, r * 2, 0, 180);
}

// one of the bass light shoots from the right of the wall
function drawBasslightR() {
  var r = 80; // height of the ellipse
  var width = 150; // width of the ellipse
  var height = 570;
  var xOff = 1000; // the length of the light
  var yPos = 50;
  var xPos = 0;
  noStroke();
  // changes light color from time to time
  if (bassCount < 50){
    fill(255, 171, 163, opa_bass);
  } else if (bassCount < 100){
    fill(200, 200, 255, opa_bass);
  } else if (bassCount == 100){
    fill(200, 200, 255, opa_bass);
    bassCount = 0;
  }
  // draw four side polygon for the light
  beginShape();
  vertex(xPos, yPos);
  vertex(xPos, yPos + 40);
  vertex(xPos + xOff - width * 0.68, yPos + height - r * 0.26);
  vertex(xPos + width * 0.68 + xOff, yPos + height - r * 1.73);
  endShape();
  // draw the circle
  ellipse(xOff, yPos + height - r, width * 2, r * 2);
  arc(xOff, yPos + height - r, width * 2, r * 2, -30, 150);
  bassCount++;
}

// the other bass light shoots from the left side of the wall
// using translation for the right side method
function drawBasslightL() {
  push();
  translate(640, 360);
  scale(-1, 1);
  translate(-640, -360);
  drawBasslightR();
  pop();
}

// nested loop to draw the 25*9 lights on the wall, quantity controlled by other value
// array shuffle every second
function drawDrumlight() {
  if(sec % 0.5 == 0){ // if one second has passed
    shuffleLight = shuffle(wallLights); // shuffle the list
  }
  let count = 0; // counter for the other value
  for (var i = 0; i < 225; i++) {
    if (count <= other_count) { // if i is still under the other count, draw it light
      shuffleLight[i].drawWallLight(opa_drum, sec);
    } else { // else draw dark
      shuffleLight[i].drawWallLight(0, sec);
    }
    count++;
  }

}

// load the wall light object into the array
function loadWallLight() {
  var pos = 0; // count the index of the array
  var r = 30;
  for (var row = 0; row < 25; row++) {
    for (var col = 0; col < 9; col++) {
      wallLights[pos] = (new WallLight(50 * row + r + 10, 50 * col + r * 0.8));
      pos++;
    }
  }
}

// draw the microphone on the center of the stage
function drawMic() {
  var micWidth = 50;
  var micHeight = 80;
  var micX = width / 2 - micWidth / 2;
  var micY = 198;
  noStroke();
  fill(8, 8, 11, 1 - opa_vocal);
  rect(micX, micY, micWidth, micHeight, 15); // mic
  rect(630, 286, 20, 35, 5); // grip
  rect(637.5, 321, 5, 310); //long stand
  rect(637.5, 278, 5, 3); // stand's other small half
  // three legs
  push();
  translate(639, 627);
  rotate(60);
  rect(0, 0, 5, 50);
  rotate(135);
  rect(-3, -2, 5, 40);
  rotate(100);
  rect(-5, 0, 5, 50);
  pop();
  // draw the white part
  fill(238, 235, 221, 1 - opa_vocal);
  for (var i = micY + 15; i < micY + micHeight - 10; i += 10) {
    rect(micX, i, 20, 5, 0, 10, 10, 0);
    rect(micX + micWidth / 2 + 5, i, 20, 5, 10, 0, 0, 10);
  }
  // the round thing on the mic
  noFill();
  stroke(8, 8, 11, 1 - opa_vocal);
  strokeWeight(7);
  beginShape();
  curveVertex(613, 245);
  curveVertex(613, 245);
  curveVertex(613, 263);
  curveVertex(615, 276);
  curveVertex(625, 283);
  curveVertex(655, 283);
  curveVertex(665, 276);
  curveVertex(667, 263);
  curveVertex(667, 245);
  curveVertex(667, 245);
  endShape();

}

// draw the front curtain as the constant background
function frontCurtain() {
  image(foreCurtain, 640, 360);
}

function drawPaticle(){
  var leftdx = 0.2; // direction vector's x, goes right
  var rightdx = -0.2 // goes left
  var windL = createVector(leftdx, 0.03);
  var windR = createVector(rightdx, 0.03);
  psLeft.applyForce(windL); // apply the wind force
  psRight.applyForce(windR);
  psLeft.run();
  psRight.run();
  if(sec > 0 && sec < 40){ // the time period where new particles will be added
    for (var i = 0; i <2; i++){
      psLeft.addParticle();
      psRight.addParticle();
    }
  }
}

// ========= Particle System ==========
// a particle system class, reference from https://p5js.org/examples/simulate-smokeparticles.html
// num is the number of particles
// v is the origin of the particle System
// img_ is the texture
let ParticleSystem = function(num, v, img_){
  this.particles = [];
  this.origin = v.copy(); // copy the vector value for safety
  this.img = img_;
  for(var i = 0; i < num; i++){
    this.particles.push(new Particle(this.origin, this.img));
  }
}

// runs the particle System
ParticleSystem.prototype.run = function(){
  var length = this.particles.length; // get the length first because we might modify the array
  for(var i = length - 1; i>=0; i--){
    var particle = this.particles[i]; // get the particle
    particle.run(); // update and render the particle
    // if the particle is dead, remove it, splice(a,b) => a is where to start at, b is how many
    if(particle.isDead()){
      this.particles.splice(i, 1);
    }
  }
}

// add a force vector to all particles currently in the system
ParticleSystem.prototype.applyForce = function(dir){
  let length = this.particles.length;
  for(var i = 0; i < length; ++i){
    this.particles[i].applyForce(dir);
  }
}

// adds a new particle to the system at the origin
ParticleSystem.prototype.addParticle = function(){
  this.particles.push(new Particle(this.origin, this.img));
}


//=========== Particle ===========
/**
* a particle class, reference from https://p5js.org/examples/simulate-smokeparticles.html
*/
let Particle = function (pos, img_){
  this.loc = pos.copy(); // position

  let vx = randomGaussian() * 0.3;
  let vy = randomGaussian() * 0.7 - 1.0;

  this.vel = createVector(vx, vy);
  this.acc = createVector();
  this.lifespan = 0.4;
  this.texture = img_;
}

// updates and displays a particle
Particle.prototype.run = function(){
  this.update();
  this.render();
}

// function to display a particle
Particle.prototype.render = function(){
  imageMode(CENTER);
  tint(255, this.lifespan);
  image(this.texture, this.loc.x, this.loc.y);
}

// function to apply a force vector to a particle
Particle.prototype.applyForce = function(f){
  this.acc.add(f);
}

// check to see if the particle has reached the end of lifespan
// returns a boolean
Particle.prototype.isDead = function(){
  if (this.lifespan <= 0.0){
    return true;
  } else {
    return false;
  }
}

// updates the position of a particle
Particle.prototype.update = function(){
  this.vel.add(this.acc); // add the acceleration to velocity
  this.loc.add(this.vel); // add the new velocity to the location (time is 1 unit)
  this.lifespan -= 0.005;
  this.acc.mult(0); // reset the acceleration
}

// ========== wall light ===============
// a class for the wall of light, which stores its lightness, x, y position
class WallLight {
  // constructor, which contains three field, lightness, x and y
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // draw a WallLight
  drawWallLight(on, sec) {
    ellipseMode(CENTER);
    if (on > 0 && on <= 0.5) { // turn on the light if the drum value is above 0
      if (sec > 50 && sec < 101.5) { // set the maximum intensity to 0.8 in the middle of the sone
        on += 0.3;
      }
      if (sec >= 101.5 && sec < 158) { // set the maximum intensity to 1.5 towards the final of the song
        on += 0.7;
      }
      noStroke();
      // draw the orange outer ring
      var radius = 40;
      var l = lerp(0, 0.15, on);
      for (var i = l; i > 0; i -= 0.01) {
        fill(245, 156, 58, i);
        ellipse(this.x, this.y, radius, radius);
        radius += 2 + on * 2;
      }
      // draw the white middle ring
      radius = 30;
      l = lerp(0, 0.7, on);
      for (var i = l; i > 0; i -= 0.05) {
        fill(255, 255, 217, i);
        ellipse(this.x, this.y, radius, radius);
        radius += 0.5 + on;
      }
      // draw orange the white inner glow
      fill(243, 137, 29, on);
      ellipse(this.x, this.y, 30, 30);
      stroke(161, 127, 87, 0.1);
      fill(255, 255, 255, on);
      ellipse(this.x, this.y, 30, 30);
    } else if (on <= 0) { // if the value is less than 0, turn the light off
      noFill();
      stroke(161, 127, 87, 0.1);
      fill(255, 255, 255, 0.1);
      ellipse(this.x, this.y, 30);
    }
  }
}
