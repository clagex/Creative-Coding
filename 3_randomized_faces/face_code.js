/*
 * This file should contain code that draws your faces.
 *
 * Each function takes parameters and draws a face that is within
 * the bounding box (-10, -10) to (10, 10).
 *
 * These functions are used by your final arrangement of faces as well as the face editor.
 */

var xoff = 0;
const outlineColor = "#2b2a2a";
const outlineWeight = 0.1;
const offWhite = "#F9F3F3";

/**
 * draw the first face, a round face
 * @param x --- the x position
 * @param y --- the y position
 * @param size --- the size of the face
 * @param angle --- rotation angle
 * @param colMap --- a color map for drawing
 * @param eyeIndex --- one of two eyes will be drawn
 * @param mouthIndex --- one of two mouths will be drawn
 */
function drawFace1(x, y, size, angle, colMap, eyeIndex, mouthIndex) {  // 
  strokeWeight(outlineWeight);
  stroke(outlineColor);
  noFill();
  push();
    translate(x, y)
    rotate(angle);
    scale(size);
    // draw the face
    drawRoundFace(x, y, size, angle, colMap.get('face'), colMap.get('bg'));
    // draw the eyes
    if (eyeIndex == 0) {
      drawCrossEyes(-1.5, -1, 10, 10);
    } else if (eyeIndex == 1) {
      drawBigEyes(0, -1, 3, colMap.get('eye'));
    }
    // draw the mouth
    if (mouthIndex == 0) {
      drawTongueOut(0, 1.5, color(outlineColor), color('red'));
    } else if (mouthIndex == 1) {
      drawSmile(0, 0);
    }
  pop();
}

/**
 * rectangle face
 * @param size --- the width, varies from 17 to 19.5
 * @param radius --- roundness of the face, 0-5
 * @param angle --- -15 to 15, turn the head around
 * @param colMap --- a map for filling colors
 * @param eyeIndex --- the number indicates which eyes will be drawn
 * @param mouthIndex --- the number indicates which mouth will be drawn
 */
 function drawFace2(size, radius, angle, colMap, eyeIndex, mouthIndex) {
  strokeWeight(outlineWeight);
  stroke(outlineColor);
  noFill();
  let width = 10, height = 5;
  let fillCol = colMap.get('face');
  let eyeCol = colMap.get('eye');
  let x = 0, y = 2;
  push();
    rotate(angle);
    scale(size);
    // draw the halo if it is cross eyes with tongue
    if (mouthIndex == 0 && eyeIndex == 0) {
      drawHalo(x, y-height*0.9, 6, 2, outlineColor, colMap.get('bg'));
    }
    // draw the face
    drawRectFace(x, y, width, height, radius, fillCol, colMap.get('bg'));
    // draw the eyes
    if (eyeIndex == 0) {
      drawCrossEyes(x, y+1, 10, 10);
    } else {
      drawBigEyes(x+1.5, y+1, width*0.2, eyeCol);
    }
    // draw the mouth
    if (mouthIndex == 0) {
      drawTongueOut(x, y+height*0.1, color(outlineColor), color('red'));
    } else {
      push();
      scale(width*0.05);
      drawSmile(x, y+0.2);
      pop();
    }

  pop();
}

/**
 * draw the third face shape, a wide face, with a unique glasses eyes
 * @param size --- the size of the face
 * @param angle --- rotation angle
 * @param colMap --- a map for color selection
 * @param eyeIndex --- choose one of three eyes
 * @param mouthIndex --- choose one of 2 mouth
 */
function drawFace3(size, angle, colMap, eyeIndex, mouthIndex) {
  stroke(outlineColor);
  strokeWeight(outlineWeight);
  push();
    scale(size);
    rotate(angle);
    // draw the face
    drawWideFace(colMap.get('face'), colMap.get('bg'));
    // draw the eyes
    if(eyeIndex == 0) {
      drawCrossEyes(0, -0.5, 8, 2);
    } else if (eyeIndex == 1) {
      drawBigEye(1.5, -1, 2, colMap.get('eye'));
      drawBigEye(-1.5, -1, 2, colMap.get('eye'));
    } else {
      drawGlasses();
    }
    // draw the mouth
    if(mouthIndex == 0) {
      drawTongueOut(0.5, 1.5, outlineColor, color('red'));
    } else if (mouthIndex == 1) {
      push();
      scale(0.5);
      drawSmile(0.5, 0);
      pop();
    }
  pop();
}

/* ------------------ drawing elements -------------------- */

/* draw a rectangle face */
function drawRectFace(x, y, width, height, radius, fillCol, bgCol) {
  let rectArr = [];
  fill(offWhite);
  noStroke();
  drawRect(x, y, width*1.1, height*1.1, radius);
  fill(bgCol);
  stroke(outlineColor);
  rectArr = drawRect(x, y, width, height, radius);
  noFill();
  doFill(flat(rectArr), fillCol);
  drawShape(rectArr);
  for (var i = 0; i < 2; i++) {
    drawRect(x, y, width, height, radius);
  }
}

/* draw a rounded face */
function drawRoundFace(x, y, size, angle, col, bgCol) {
  let face = [];
  fill(bgCol); // fill it with background colors to avoid color blending
  this.xoff = updateXoff();
  append(face, computeBezier(-6.2, -7, -3, -8, -1, -8, 2, -7));
  append(face, computeBezier(2, -7, 5, -6, 3, -4, 4, -2));
  append(face, computeBezier(4, -2, 7, 0, 8, 3, 4, 6));
  append(face, computeBezier(4, 6, 2, 7, -1, 8, -5, 5));
  append(face, computeBezier(-5, 5, -8, 3, -8, -3, -6, -7));
  drawShape(face);
  noFill();
  doFill(flat(face), col);
  drawShape(face);
  doContour(face, bgCol);
  for (var i = 0; i < 4; i++) {
    face = [];
    this.xoff = updateXoff();
    append(face, computeBezier(-6.2, -7, -3, -8, -1, -8, 2, -7));
    append(face, computeBezier(2, -7, 5, -6, 3, -4, 4, -2));
    append(face, computeBezier(4, -2, 7, 0, 8, 3, 4, 6));
    append(face, computeBezier(4, 6, 2, 7, -1, 8, -5, 5));
    append(face, computeBezier(-5, 5, -8, 3, -8, -3, -6, -7));
    drawShape(face);
  }
}

/* draw a wide face with the given color and background color */
function drawWideFace(col, bgCol) {
  let face = [];
  fill(bgCol); // fill it with background colors to avoid color blending
  this.xoff = updateXoff();
  append(face, computeBezier(-3, -1, -5, -6,  5, -6,  3, -1));
  append(face, computeBezier( 2.8, -1,  5,  1,  4,  3,  3.5, 3.4));
  append(face, computeBezier( 3.4, 3.4,  1, 4, -2,  4, -3, 3));
  append(face, computeBezier(-3, 3, -5,  2, -4,  0, -3, -1));
  drawShape(face);
  noFill();
  doFill(flat(face), col);
  drawShape(face);
  doContour(face, bgCol);
  for (var i = 0; i < 3; i++) {
    face = [];
    this.xoff = updateXoff();
    append(face, computeBezier(-3, -1, -5, -6,  5, -6,  3, -1));
    append(face, computeBezier( 2.8, -1,  5,  1,  4,  3,  3.5, 3.4));
    append(face, computeBezier( 3.4, 3.4,  1, 4, -2,  4, -3, 3));
    append(face, computeBezier(-3, 3, -5,  2, -4,  0, -3, -1));
    drawShape(face);
  }
}

/* draw a cross eye with the given dimension, the angle is random */
function drawCross(x, y, w, h) {
  ratio = random(0.3, 0.6);
  r_ratio = 1-ratio
  drawLine(x-w*r_ratio, y-h*ratio, x+w*r_ratio, y+h*ratio);
  drawLine(x+w*ratio, y-h*r_ratio, x-w*ratio, y+h*r_ratio);
}

/* draw two cross eyes */
function drawCrossEyes(x, y, width, height) {
  let eyeLeftX = x-width*0.2;
  let eyeRightX = x+width*0.2;
  let eyeY = y-height*0.2;
  for (var i = 0; i < 3; i++) {
    drawCross(eyeLeftX, eyeY, 2, 1);
    drawCross(eyeRightX, eyeY, 2, 1);
  }
}

/* draw a halo on top of the head */
function drawHalo(x, y, width, height, strokeCol, bgCol) {
  noStroke();
  fill(offWhite);
  beginShape();
    curveVertex(x-width*0.6, y+height*1.1);
    curveVertex(x-width*0.6, y+height*1.1);
    curveVertex(x-width*0.6, y-height*0.7);
    curveVertex(x, y-height*1.2);
    curveVertex(x+width*0.6, y-height*0.7);
    curveVertex(x+width*0.6, y+height*1.1);
    curveVertex(x+width*0.6, y+height*1.1);
  endShape();

  ovalFill(x, y, width+1, height+1, color(222,217,133));
  stroke(strokeCol);
  for (var i = 0; i < 3; i++) {
    fill(offWhite);
    drawOval(x, y, width-1, height-1);
    noFill();
    drawOval(x, y, width+1, height+1);
  }
}

/* draw glasses for the wide face */
function drawGlasses() {
  drawLine(-3, -1, -2, -0.8);
  drawRect(-1.2, -0.8, 1.7, 0.7, 0.8);
  drawBezier(-0.5, -0.8, 0.1, -1, -0.1, -1, 0.5, -0.8)
  drawRect(1.2, -0.8, 1.7, 0.7, 0.8);
  drawLine(3, -1, 2, -0.8);
  doFill(computeOval(-1.2, -0.8, 0.3, 0.3), 'black');
  doFill(computeOval(1.2, -0.8, 0.3, 0.3), 'black');
}

/* draw a big eye on the given position, with the given radius */
function drawBigEye(x, y, radius, eyeCol) {
  for (var i = 0; i < 3; i++) {
    drawOval(x, y, radius*0.2, radius*0.2);
    drawOval(x, y, radius, radius);
  }
  push();
    translate(x, y);
    for (var i = 0; i < 12; i++) {
      rotate(30);
      for(var j = 0; j < 2; j++) {
        drawLine(radius*-0.15, -radius*-0.15, radius*-0.25, -radius*-0.25);
      }
    }
  pop();
  doFill(computeOval(x, y, radius*0.2, radius*0.2), eyeCol);
}

/* draw two big eyes */
function drawBigEyes(x, y, radius, eyeCol) {
  push();
    translate(x, y);
    drawBigEye(-4, -2, radius, eyeCol);
    drawBigEye(1, -2, radius, eyeCol);
  pop();
}

/* draw the tongue from the given dimension and color */
function drawTongueOut(x, y, strokeCol, fillCol) {
  noFill();
  bezierFill(x-1, y+0.2, x-0.6, y+1.5, x+0.7, y+1.5, x+0.7, y-0.4, fillCol);
  for (var i = 0; i < 3; i++) {
    drawBezier(x-1, y+0.2, x-0.6, y+1.5, x+0.7, y+1.5, x+0.7, y-0.4);
    drawBezier(x, y+0.2, x+0.15, y+0.3, x+0.2, y+0.6, x-0.1, y+1);
    drawLine(x-1.3, y+0.2, x+1.1, y-0.5);
  }
 }

/* draw a mouth that is smiling */
function drawSmile(x, y) {
  push();
    translate(x,y);
    for (var i = 0; i < 4; i++) {
      let mouth = [];
      append(mouth, computeBezier(-3, 1.5, 0, 2, 1, 2, 3.5, 1));
      append(mouth, computeBezier(3.5, 1, 4, 1.5, 4, 2, 3.5, 3));
      append(mouth, computeBezier(3.5, 3, 1.5, 6, -1, 6, -3, 3));
      append(mouth, computeBezier(-3, 3, -3.2, 2.5, -3.3, 2, -3, 1.6));
      drawShape(mouth);
    }
  pop();
}


/* ------------ helper functions ------------------ */

/**
 * fill the shape with color, with the given vector array
 */
function doFill(arr, col) {
  stroke(col);
  strokeWeight(outlineWeight*0.3);
  let half = floor(arr.length/2);
  for (var i = 0; i < half; i++) {
    drawLine(arr[i].x, arr[i].y, arr[arr.length-1-i].x, arr[arr.length-1-i].y);
    drawLine(arr[arr.length-1-i].x, arr[arr.length-1-i].y, arr[half+i].x, arr[half+i].y);
    drawLine(arr[i].x, arr[i].y, arr[half-i].x, arr[half-i].y);
  }
  // switch back to outline stroke
  stroke(outlineColor); 
  strokeWeight(outlineWeight);
}

/**
 * fill the bezier with color, with the new calculated points for 
 * better filling visual
 */
function bezierFill(x1, y1, x2, y2, x3, y3, x4, y4, col){
  this.xoff = updateXoff();
  stroke(col);
  for (var t = 0; t <= 0.5; t += 0.04) {
    let to = 1-t, offset = map(noise(this.xoff), 0, 1, -0.03, 0.03);
    let fromx = bezierPoint(x1,x2,x3,x4,t);
    let fromy = bezierPoint(y1,y2,y3,y4,t);
    let tox = bezierPoint(x1,x2,x3,x4,to);
    let toy = bezierPoint(y1,y2,y3,y4,to);
    drawLine(fromx+offset, fromy-offset, tox-offset, toy+offset);
  }
  // switch back to outline stroke
  stroke(outlineColor); 
  strokeWeight(outlineWeight);
}

/**
 * draw a line from x1, y1 to x2, y2, that looks hand drawn
 */
function drawLine(x1, y1, x2, y2) {
  let vertices = computeLine(x1, y1, x2, y2);
  beginShape();
    for (var i = 0; i < vertices.length; i++) {
      curveVertex(vertices[i].x, vertices[i].y);
    }
  endShape();
}

/**
 * compute all the vertices in the line from x1,y1 to x2,y2
 * store them in an array and return it for future drawing purposes
 * @return an array of vectors
 */
function computeLine(x1, y1, x2, y2) {
  let deltaX = x2-x1, deltaY = y2-y1, vertices = [];
  append(vertices, createVector(x1, y1));

  // lines that have slope, calculates m and b, and get an array of vectors with noises added
  if (deltaX != 0 && deltaY != 0) {
    let m = deltaY / deltaX;
    if ((m < 0 && m >= -1) || (m > 0 && m <= 1) || (m < -1 || m > 1)) {
      let y = y1, x = x1, xStep = abs(x2-x1), step = 0.2, b = y1 - m * x1;
      for (var i = 0; i <= xStep; i += step) {
        let offset = map(noise(this.xoff), 0, 1, -0.3, 0.3);
        append(vertices, createVector(x+offset, y));
        if (x2 > x1) {
          x+=step;
        } else if (x2 < x1) {
          x-=step;
        }
        y = m * x + b;
        this.xoff += 0.1;
      }
    }
    append(vertices, createVector(x2, y2))
    return vertices;
  }

  // vertical line
  else if(deltaX == 0 && deltaY != 0) {
      for (var i = 0; i <= abs(deltaY); i+=0.5) {
        let offset = map(noise(this.xoff), 0, 1, -0.3, 0.3);
        if (y2 > y1) {
          append(vertices, createVector(x1+offset, y1+i));
        } else {
          append(vertices, createVector(x1+offset, y1-i));
        }
        this.xoff += 0.15;
      }
      append(vertices, createVector(x2, y2));
      append(vertices, createVector(x2, y2));
      return vertices;
  }

  // horizontal line
  else if(deltaX != 0 && deltaY == 0) {
    let count = 0;
    for (var i = 0; i <= abs(deltaX); i+=0.5) {
      let offset = map(noise(this.xoff), 0, 1, -0.3, 0.3);
      if (x2 > x1) {
        append(vertices, createVector(x1+i, y1+offset));
      } else {
        append(vertices, createVector(x1-i, y1+offset));
      }
      this.xoff += 0.15;
    }
    append(vertices, createVector(x2, y2));
    append(vertices, createVector(x2, y2));
    return vertices;
  }

  else if(deltaX == 0 && deltaY == 0) {
    append(vertices, createVector(x1, y1));
    return vertices;
  }
}

/**
 * helper function to draw a rectangle with non-straight lines
 * @return the vector array
 */
function drawStraightRect(x, y, width, height) {
  this.xoff = updateXoff();
  let w = width/2, h = height/2, vertices = [];
  append(vertices, computeLine(x+w, y-h, x-w, y-h)); // top 
  append(vertices, computeLine(x-w, y-h, x-w, y+h)); // left
  append(vertices, computeLine(x-w, y+h, x+w, y+h)); // bottom
  append(vertices, computeLine(x+w, y+h, x+w, y-h)); // right
  
  beginShape();
    for (var i = 0; i < vertices.length; i++) {
      let tmp = vertices[i];
      for (var j = 0; j < tmp.length; j++) {
        curveVertex(tmp[j].x, tmp[j].y);
      }
    }
  endShape();

  return vertices;
}

/**
 * draw a rectangle with round edges
 * @param radius -- how round the edges are, where 0 is just a straight rectangle
 * @return an array of vectors for filling purpose
 */
function drawRect(x, y, width, height, radius) {
  if (radius == 0) {
    let result = drawStraightRect(x, y, width, height);
    return result;
  }

  let w = width/2, h = height/2, vertices = [], step = radius / 2;
  let rightX = max(x + w - radius, x), topY = min(y - h + radius, y);
  let leftX = min(x - w + radius, x), botY = max(y + h - radius, y);
  append(vertices, computeLine(leftX, y-h, rightX, y-h)); // top
  append(vertices, computeBezier(rightX, y-h, rightX+step, y-h, rightX+step*2, y-h, x+w, topY));
  append(vertices, computeLine(x+w, topY, x+w, botY)); // right
  append(vertices, computeBezier(x+w, botY, rightX+step*2, y+h, rightX+step, y+h, rightX, y+h));
  append(vertices, computeLine(rightX, y+h, leftX, y+h)); // bottom
  append(vertices, computeBezier(leftX, y+h, leftX-step, y+h, leftX-step*2, y+h, x-w, botY));
  append(vertices, computeLine(x-w, botY, x-w, topY)); // left
  append(vertices, computeBezier(x-w, topY, leftX-step*2, y-h, leftX-step, y-h, leftX, y-h));

  drawShape(vertices);
  return vertices;
}

/**
 * flatten the array<array<vector>> into array<vector>
 * @return a new array with vectors
 */
function flat(arr) {
  let result = [];
  for (var i = 0; i < arr.length; i++) {
    result = concat(result, arr[i]);
  }
  return result;
}

/**
 * draw a bezier curve from four points
 * @return the vector array for filling purpose
 */
function drawBezier(x1, y1, x2, y2, x3, y3, x4, y4) {
  this.xoff = updateXoff();
  let vertices = computeBezier(x1, y1, x2, y2, x3, y3, x4, y4);
  beginShape();
    for (var i = 0; i < vertices.length; i++) {
      curveVertex(vertices[i].x, vertices[i].y);
    }
  endShape();
  return vertices;
}

/**
 * compute and return an array of points of one bezier curve
 * @return an array of vectors
 */
function computeBezier(x1, y1, x2, y2, x3, y3, x4, y4) {
  let vertices = [];
  append(vertices, createVector(x1, y1));
  append(vertices, createVector(x1, y1));
  // estimate how long the curve is from point to point dist
  let estimateDist = dist(x1, y1, x2, y2) + dist(x2, y2, x3, y3) + dist(x3, y3, x4, y4); 
  for (var i = 0; i <= estimateDist; i += 0.3) {
    let t = i / estimateDist; // t is [0,1], the ratio in the curve that we can get the vector point
    let x = bezierPoint(x1, x2, x3, x4, t); 
    let y = bezierPoint(y1, y2, y3, y4, t);
    let offset = map(noise(this.xoff), 0, 1, -0.3, 0.3);
    append(vertices, createVector(x+offset, y+offset));
    this.xoff += 0.03;
  }
  append(vertices, createVector(x4, y4));
  append(vertices, createVector(x4, y4));
  return vertices;
}

/**
 * compute and return an array of points of one oval
 * @return an array of vectors
 */
function computeOval(x, y, width, height) {
  let vertices = [];
  let range = min(width, height) * 0.07;
  // used function (x,y) = (acost, bsint), where a is width radius, and b is height radius
  let a = width/2, b = height/2;
  append(vertices, createVector(a+x,y));
  append(vertices, createVector(a+x,y));
  for (var t = 0; t < 366; t+=7) {
    let offset = map(noise(this.xoff), 0, 1, -range, range);
    let newX = (a+offset) * cos(t) + x;
    let newY = (b+offset) * sin(t) + y;
    append(vertices, createVector(newX, newY));
    this.xoff += 0.2;
  }
  append(vertices, createVector(a+x,y));
  append(vertices, createVector(a+x,y));
  return vertices;
}

/**
 * draw an oval with the given width and height
 */
function drawOval(x, y, width, height) {
  this.xoff = updateXoff();
  let vertices = computeOval(x, y, width, height);
  beginShape();
    for (var i = 0; i < vertices.length; i++) {
      curveVertex(vertices[i].x, vertices[i].y);
    }
  endShape();
  return vertices;
}

/**
 * fill the oval with pencil texture
 */
function ovalFill(x, y, width, height, col) {
  let vertices = [];
  let range = min(width, height) * 0.07;
  // used function (x,y) = (acost, bsint), where a is width radius, and b is height radius
  let a = width/2, b = height/2;
  //append(outer, createVector(a,y));
  append(vertices, createVector(a+x,y));
  for (var t = 0; t < 366; t+=6) {
    let offset = map(noise(this.xoff), 0, 1, -range, range);
    let newX = (a+offset) * cos(t) ;
    let newY = (b+offset) * sin(t) + y;
    append(vertices, createVector(newX, newY));
    this.xoff += 0.2;
  }
  append(vertices, createVector(a+x,y));
  //append(outer, createVector(a,-5));
  doFill(vertices, col);
  return vertices;
}

/**
 * draw a rounded shape from the vector array with curve vertex
 */
function drawShape(vertices) {
  beginShape();
    curveVertex(vertices[0][0].x, vertices[0][0].y);
    for (var i = 0; i < vertices.length; i++) {
      let tmp = vertices[i];
      for (var j = 3; j < tmp.length - 3; j++) {
        curveVertex(tmp[j].x, tmp[j].y);
      }
    }
    let last = vertices[vertices.length-1];
    let index = last.length-1;
    curveVertex(last[index].x, last[index].y);
  endShape(CLOSE);
}

/**
 * do a white outline as a countour to block out some of the overfill filling strokes
 */
function doContour(vertices, col) {
  fill(offWhite);
  noStroke();
  beginShape();
    vertex(vertices[0][0].x*1.1, vertices[0][0].y*1.1);
    for (var i = 0; i < vertices.length; i++) {
      let tmp = vertices[i];
      for (var j = 3; j < tmp.length - 3; j++) {
        vertex(tmp[j].x*1.1, tmp[j].y*1.1);
      }
    }
    let last = vertices[vertices.length-1];
    let index = last.length-1;
    vertex(last[index].x*1.1, last[index].y*1.1);
    beginContour();
      last = vertices[vertices.length-1];
      index = last.length-1;
      vertex(last[index].x, last[index].y);
      for (var i = vertices.length-1; i >= 0; i--) {
        let tmp = vertices[i];
        for (var j = tmp.length - 4; j >= 3; j--) {
          vertex(tmp[j].x, tmp[j].y);
        }
      }
      vertex(vertices[0][0].x, vertices[0][0].y);
    endContour();
  endShape(CLOSE);
  noFill();
  stroke(outlineColor);
  strokeWeight(outlineWeight);
}

/**
 * reset the xoff value each time a new shape is being drawn
 */
function updateXoff() { return random(-1, 1); }
