int canvaWidth = 1280, canvaHeight = 720;

function draw_one_frame(vocal, drum, bass, other) {
  background(150);
  drawStage(480, 240);
}

function drawBackground() {
  for (var i = 0; i < 26; i++) {
    fill(117, 20, 20);
    rect(i * 50, 0, 10, 650, 0, 0, 5, 5);
    fill(180, 37, 37);
    rect(i * 50 + 10, 0, 40, 670, 0, 0, 20, 20);
  }
}

function drawStage(float start, float h){
  var from = color(93, 14, 14);
  var to = color(0, 0, 0);
  noStroke();
  for(var i = 0; i < h; i++){
    var lerp = lerpColor(from, to, i/h);
    fill(lerp);
    rect(0, start+h+i, canvaWidth, 1);
  }
}

function drawBG1(){
  bg.background(148,25,35);
  bg.fill(117,49,36);
  bg.ellipseMode(CENTER);
  bg.ellipse(640, 600, 400,200);
  bg.noStroke();
  for(var i = 0; i < 26; i++){
    bg.fill(117,20,20);
    bg.rect(i*50, 0, 10, 650, 0, 0, 5, 5);
    bg.fill(180,37,37);
    bg.rect(i*50+10, 0, 40, 670, 0, 0, 20, 20);
  }
  image(bg,0,0);
  bg.filter(ERODE);
}

function setVocal(){
  var r = 30;
  vocalImg.noStroke();
  vocalImg.colorMode(RGB,255,255,255,1);
  vocalImg.ellipseMode(CENTER);
  vocalImg.fill(255, 255, 200, 0.6);
  vocalImg.triangle(vocalImg.width/2, 0, vocalImg.width/2-100, vocalImg.height-r, vocalImg.width/2+100, vocalImg.height-r);
  vocalImg.ellipse(vocalImg.width/2, vocalImg.height-r, 200, r*2);
  vocalImg.arc(vocalImg.width/2, vocalImg.height-r, 200, r*2, 0, PI);
}

function setDrum(){
  var r = 50;
  drumImg.noStroke();
  drumImg.colorMode(RGB,255,255,255,1);
  drumImg.ellipseMode(CENTER);
  drumImg.fill(255, 255, 240, 0.9);
  for(var i = 0; i < 8; i++){
    drumImg.ellipse(100+150*i,100,r,r);
  }
}
