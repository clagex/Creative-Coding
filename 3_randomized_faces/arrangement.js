/*
 * This program draws your arrangement of faces on the canvas.
 */

const canvasWidth = 960;
const canvasHeight = 500;
let curRandomSeed = 0;

let lastSwapTime = 0;
const millisPerSwap = 3000;

function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  curRandomSeed = int(random(0, 1000));
  curNoiseSeed = int(random(0, 1000));

  // rotation in degrees
  angleMode(DEGREES);
  // colorMode(RGB, 255, 255, 255, 1);
  // blendMode(REPLACE);
}

function changeRandomSeed() {
  curRandomSeed = curRandomSeed + 1;
  curNoiseSeed++;
  lastSwapTime = millis();
}

// global variables for colors
const bg_color1 = ["#FF7B7F"];
const face_cols = ["#FFE794", "#61FF8B", "#6E7DFF", "#FFA987"];
// 3 of the eye elements are black
const eye_cols = ["#4D8DB3", "#70B86B", "#000000", "#000000", "#000000"];

function mouseClicked() {
  changeRandomSeed();
}

function draw () {
  if(millis() > lastSwapTime + millisPerSwap) {
    changeRandomSeed();
  }

  // reset the random number generator each time draw is called
  randomSeed(curRandomSeed);
  noiseSeed(curNoiseSeed);

  // clear screen
  background(bg_color1);

  // draw a 7x4 grid of faces
  let wOff = canvasWidth * 0.15;
  let hOff = canvasHeight * 0.15;
  let w = (canvasWidth-wOff*2) / 12;
  let h = (canvasHeight-hOff*2) / 9;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 13; j++) {
      let x = wOff + w * j + random(-15, 15);
      let y = hOff + h * i + random(-15, 15);
      let colMap = new Map();
      colMap.set('face', face_cols[int(random(0, 4))]);
      colMap.set('eye', eye_cols[int(random(0, 5))]);
      colMap.set('bg', bg_color1);
      let faceInt = int(random(0,10));
      // face 1, round face
      if (faceInt >= 0 && faceInt < 3) {
        // draw the round face in some cases
        push();
          translate(x, y);
          scale(6);
          let facex = getAveragedRandom(-5,5,4);
          let facey = getAveragedRandom(-5,5,4);
          let size = 0.95 - max(abs(facex), abs(facey)) * 0.1;
          let angle = random(-45, 45);
          let index = int(random(0, 6));
          let eyesIndex = 1;
          if (index == 5) { eyesIndex = 0; }
          let mouthIndex = int(random(0, 2));
          drawFace1(facex, facey, size, angle, colMap, eyesIndex, mouthIndex);
        pop();
      } else if (faceInt >= 3 && faceInt < 8) {
        // mostly draw the rect face
        push();
          translate(x, y);
          scale(7);
          let size = getAveragedRandom(0.8, 1.5, 2);
          let radius = getAveragedRandom(0, 5, 2);
          let angle = random(-15, 15);
          let index = int(random(0, 6));
          let eyesIndex = int(random(0, 2));
          let mouthIndex = int(random(0, 2));
          drawFace2(size, radius, angle, colMap, eyesIndex, mouthIndex);
        pop();
      } else if (faceInt >=8 && faceInt <10){
        // some rare condition, draw the wide face
        push();
          translate(x, y);
          scale(5);
          let size = getAveragedRandom(1, 2, 2);
          let angle = random(-15, 15);
          let index = int(random(0, 6));
          let eyes = int(random(0, 7));
          let mouthIndex = int(random(0, 2));
          let eyesIndex = 0
          if (eyes >= 3 && eyes < 6) {
            eyesIndex = 1;
          } else if (eyes == 6) { // rarely draw the glasses
            eyesIndex = 2;
          }
          drawFace3(size, angle, colMap, eyesIndex, mouthIndex);
        pop();
      }
    }
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}

/* Gaussian Selection */
function getAveragedRandom(min, max, n) {
  let sum = 0;
  for(let i=0; i<n; i++) {
    sum = sum + random(min, max);
  }
  return sum / n;
}
