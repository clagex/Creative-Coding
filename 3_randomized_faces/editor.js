/*
 * This editor shows the possible faces that can be created
 */

const canvasWidth = 960;
const canvasHeight = 500;
let slider1, slider2, slider3, slider4, slider5;
let slider6, slider7, slider8, slider9, slider10;
let faceSelector;
let faceGuideCheckbox;
const face_cols = ["#FFE794", "#61FF8B", "#6E7DFF", "#FFA987"];
const eye_cols = ["#4D8DB3", "#70B86B", "#000000"];

function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');
  angleMode(DEGREES);
  strokeCap(ROUND);

  // create sliders
  slider1 = createSlider(0, 100, 50);
  slider2 = createSlider(0, 100, 50);
  slider3 = createSlider(0, 100, 50);
  slider4 = createSlider(0, 100, 50);
  slider5 = createSlider(0, 100, 50);
  slider6 = createSlider(0, 100, 50);
  slider7 = createSlider(0, 100, 50);
  slider8 = createSlider(0, 100, 50);
  slider9 = createSlider(0, 100, 50);
  slider10 = createSlider(0, 100, 50);

  slider1.parent('slider1Container');
  slider2.parent('slider2Container');
  slider3.parent('slider3Container');
  slider4.parent('slider4Container');
  slider5.parent('slider5Container');
  slider6.parent('slider6Container');
  slider7.parent('slider7Container');
  slider8.parent('slider8Container');
  slider9.parent('slider9Container');
  slider10.parent('slider10Container');

  faceGuideCheckbox = createCheckbox('', true);
  faceGuideCheckbox.parent('checkbox1Container');

  faceSelector = createSelect();
  faceSelector.option('1');
  faceSelector.option('2');
  faceSelector.option('3');
  faceSelector.value('1');
  faceSelector.parent('selector1Container');
}

const bg_color = [225, 206, 187];

function draw () {
  strokeJoin(ROUND);

  let mode = faceSelector.value();

  background(bg_color);

  let s1 = slider1.value();
  let s2 = slider2.value();
  let s3 = slider3.value();
  let s4 = slider4.value();
  let s5 = slider5.value();
  let s6 = slider6.value();
  let s7 = slider7.value();
  let s8 = slider8.value();
  let s9 = slider9.value();
  let s10 = slider10.value();

  let show_face_guide = faceGuideCheckbox.checked();


  // use same size / y_pos for all faces
  let face_size = canvasWidth / 5;
  let face_scale = face_size / 10;
  let face_y = height / 2;
  let face_x = width / 2;

  push();
    translate(face_x, face_y);
    scale(face_scale);
    randomSeed(65);
    noiseSeed(78)
    push();
      if (mode == '1') {
        // draw round face
        let x = map(s1, 0, 100, -5, 5);
        let y = map(s2, 0, 100, -5, 5);
        let angle = map(s3, 0, 100, -45, 45);
        let size = 0.95 - max(abs(x), abs(y)) * 0.1;
        let colMap = new Map();
        let faceInt = int(map(s6, 0, 100, 0, 3));
        let eyeInt = int(map(s7, 0, 100, 0, 2));
        colMap.set('face', face_cols[faceInt]);
        colMap.set('tongue', color('red'));
        colMap.set('eye', eye_cols[eyeInt]);
        colMap.set('bg', bg_color);
        let eyeIndex = int(map(s4, 0, 100, 0, 1));
        let mouthIndex = int(map(s5, 0, 100, 0, 1));
        drawFace1(x, y, size, angle, colMap, eyeIndex, mouthIndex);
      }

      if (mode == '2') {
        // draw rect face
        let radius = map(s1, 0, 100, 0, 5);
        let angle = map(s2, 0, 100, -15, 15);
        let size = map(s3, 0, 100, 0.8, 1.5);
        let colMap = new Map();
        let faceInt = int(map(s4, 0, 100, 0, 3));
        let eyeInt = int(map(s7, 0, 100, 0, 2));
        colMap.set('face', face_cols[faceInt]);
        colMap.set('tongue', color('red'));
        colMap.set('eye', eye_cols[eyeInt]);
        colMap.set('bg', bg_color);
        let eyeIndex = int(map(s5, 0, 100, 0, 1));
        let mouthIndex = int(map(s6, 0, 100, 0, 1));
        drawFace2(size, radius, angle, colMap, eyeIndex, mouthIndex);
      }

      if (mode == '3') {
        // draw wide face
        let angle = map(s1, 0, 100, -15, 15);
        let size = map(s2, 0, 100, 1, 1.8);
        let colMap = new Map();
        let faceInt = int(map(s3, 0, 100, 0, 3));
        let eyeInt = int(map(s6, 0, 100, 0, 2));
        colMap.set('face', face_cols[faceInt]);
        colMap.set('tongue', color('red'));
        colMap.set('eye', eye_cols[eyeInt]);
        colMap.set('bg', bg_color);
        let eyeIndex = int(map(s4, 0, 100, 0, 2));
        let mouthIndex = int(map(s5, 0, 100, 0, 1));
        drawFace3(size, angle, colMap, eyeIndex, mouthIndex);
      }
    pop();

  if(show_face_guide) {
    strokeWeight(0.1);
    rectMode(CORNER); 
    noFill()
    stroke(0, 0, 255);
    // ellipse(0, 0, 20, 20);
    rect(-10, -10, 20, 20);
    line(  0, -11,  0, -10);
    line(  0,  10,  0, 11);
    line(-11,   0,-10,  0);
    line( 11,   0, 10,  0);
  }

  pop();
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
