
// https://www.youtube.com/watch?v=pohgg2RTtjE
let freqMax = 150;
let freqMin = 200;

let prevWidth = 0;
let prevHeight = 0;

//ancho y alto canvas
let w = 338;
let h = 600;

//vértices figura
let ax, ay, bx, by, cx, cy, dx, dy;

//márgen rebote
var marg = 16;

let click = "click para comenzar audio";

//Frame y direcciones de movimiento
var tik = 0;
var dirax = 1; 
var diray = -1;
var dirbx = 1;
var dirby = -1;
var dircx = 1;
var dircy = -1;
var dirdx = 1;
var dirdy = -1;

let osc1, osc2, osc3, osc4;
let audioStarted = false;

//color
var col = 0;

function setup() {
  frameRate(25);
  createCanvas(windowWidth, windowHeight);
 
  colorMode(HSB, 360, 100, 100, 100);

  //Posición inicial figura
  ax = round(random(marg, windowWidth - marg));
  ay = round(random(marg, windowHeight - marg));
  bx = round(random(marg, windowWidth - marg));
  by = round(random(marg, windowHeight - marg));
  cx = round(random(marg, windowWidth - marg));
  cy = round(random(marg, windowHeight - marg));
  dx = round(random(marg, windowWidth - marg));
  dy = round(random(marg, windowHeight - marg));

  // Crear osciladores sin iniciar
  osc1 = new p5.SinOsc();
  osc2 = new p5.SinOsc();
  osc3 = new p5.SinOsc();
  osc4 = new p5.SinOsc();
}

function draw() {
    background(col, 23, 99);
 //frame rate sin sacar el framerate
  var x = frameCount % 1;
  if (x == 0) {
    tik = 1;
  } else {
    tik = 0;
  }

  if (tik == 1) {
    //si hay tik

    //Número asigna velocidad de movimiento
    ax = ax + 0.1 * dirax;
    ay = ay + 0.13 * diray;
    if (ax > windowWidth - marg) {
      //si choca margen, devuelve
      dirax = -1;
    }
    if (ax < 0 + marg) {
      dirax = 1;
    }
    if (ay > windowHeight - marg) {
      diray = -1;
    }
    if (ay < 0 + marg) {
      diray = 1;
    }

    //Lo mismo para cada vértice

    bx = bx + 0.15 * dirbx;
    by = by + 0.23 * dirby;
    if (bx > windowWidth - marg) {
      dirbx = -1;
    }
    if (bx < 0 + marg) {
      dirbx = 1;
    }
    if (by > windowHeight - marg) {
      dirby = -1;
    }
    if (by < 0 + marg) {
      dirby = 1;
    }

    cx = cx + 0.01 * dircx;
    cy = cy + 0.15 * dircy;
    if (cx > windowWidth - marg) {
      dircx = -1;
    }
    if (cx < 0 + marg) {
      dircx = 1;
    }
    if (cy > windowHeight - marg) {
      dircy = -1;
    }
    if (cy < 0 + marg) {
      dircy = 1;
    }

    dx = dx + 0.2 * dirdx;
    dy = dy + 0.14 * dirdy;
    if (dx > windowWidth - marg) {
      dirdx = -1;
    }
    if (dx < 0 + marg) {
      dirdx = 1;
    }
    if (dy > windowHeight - marg) {
      dirdy = -1;
    }
    if (dy < 0 + marg) {
      dirdy = 1;
    }

    //alteracolor
    col = (frameCount / 50) % 360;
    //   col += 0.3;
    //   if (col >= 360) {
    //     col = 0;
    //   }
  }

  //Dibuja lineas principales en posiciones deseadas
  strokeWeight(1);
  stroke(360 - col, 30, 75);
  line(ax, ay, bx, by);
  line(bx, by, cx, cy);
  line(cx, cy, dx, dy);
  line(dx, dy, ax, ay);
  line(ax, ay, cx, cy);
  line(bx, by, dx, dy);

  //Lineas secundarias entre vértice A y puntos medios
  strokeWeight(0.1);
  stroke(360 - col, 30, 30);
  line(ax, ay, (cx + bx) / 2, (cy + by) / 2); //1
  line(ax, ay, (bx + dx) / 2, (by + dy) / 2); //2
  line(ax, ay, (cx + dx) / 2, (cy + dy) / 2); //3

  //Lineas entre puntos medios
  line((cx + bx) / 2, (cy + by) / 2, (bx + dx) / 2, (by + dy) / 2); //1 y 2
  line((bx + dx) / 2, (by + dy) / 2, (cx + dx) / 2, (cy + dy) / 2); //2 y 3
  line((cx + bx) / 2, (cy + by) / 2, (cx + dx) / 2, (cy + dy) / 2); //1 y 3

  //Dibuja y rellena un triangulo en una cara para generar sensación de base
  strokeWeight(0);
  fill(360 - col, 100, 100, 20);
  triangle(cx, cy, bx, by, dx, dy);

  //AUDIO AUDIO AUDIO
  // change oscillator frequency based on mouseX
  let frecu1 = map(ax, 0, windowWidth, freqMax, freqMin) + freqMax*dirax/10 - freqMax*diray/12;
  osc1.freq(frecu1);
  let ampli1 = map(ay, 0, windowHeight, 0.05, 0.01);
  osc1.amp(ampli1);
  let panning1 = map(ay, 0, windowHeight, -1.0, 1.0);
  osc1.pan(panning1);

  let frecu2 = map(by, 0, windowHeight, freqMin, freqMax) + freqMax*dirby/10 + freqMax*dirbx/12;
  osc2.freq(frecu2);
  let ampli2 = map(bx, 0, windowWidth, 0.01, 0.05);
  osc2.amp(ampli2);
  let panning2 = map(bx, 0, windowWidth, 1.0, -1.0);
  osc2.pan(panning2);

  let frecu3 = map(cy, 0, windowHeight, freqMin, freqMax) + freqMax*dircy/10 + freqMax*dircx/12;
  osc3.freq(frecu3);
  let ampli3 = map(cx, 0, windowWidth,  0.05, 0.01);
  osc3.amp(ampli3);
  let panning3 = map(cy, 0, windowHeight, -1.0, 1.0);
  osc3.pan(panning3);

  let frecu4 = map(dx, 0, windowWidth, freqMax, freqMin) + freqMax*dirdx/10 - freqMax*dirdy/12;
  osc4.freq(frecu4);
  let ampli4 = map(dy, 0, windowHeight, 0.01, 0.05);
  osc4.amp(ampli4);
  let panning4 = map(dx, 0, windowWidth, 1.0, -1.0);
  osc4.pan(panning4);

 textSize(20);
//   fill(0, 102, 153);
//   text("a", ax, ay);
//   text("b", bx, by);
//   text("c", cx, cy);
//   text("d", dx, dy);

  if (audioStarted == 0){
    fill(360, 100, 100, 100); // Set text color to white
    textSize(20);
    textAlign(CENTER);
    text(click, mouseX,mouseY);

  }

  if (prevWidth != windowWidth || prevHeight != windowHeight) {
    resizeCanvas(windowWidth, windowHeight);
  }

  prevWidth = windowWidth;
  prevHeight = windowHeight;

}

function touchStarted() {
  if (!audioStarted) {
   fill(360,100,100,100); // Set text color to white
     noCursor();
    userStartAudio();

    osc1.freq(220);
    osc1.amp(0.2);
    osc1.start();

    osc2.freq(300);
    osc2.amp(0.2);
    osc2.start();

    osc3.freq(250);
    osc3.amp(0.2);
    osc3.start();

    osc4.freq(180);
    osc4.amp(0.2);
    osc4.start();

    audioStarted = true;
    console.log("✅ AudioContext activado y osciladores iniciados.");
  }
}

function mousePressed() {
  if (!audioStarted) {
   fill(360,100,100,100); // Set text color to white
     noCursor();
    userStartAudio();

    osc1.freq(220);
    osc1.amp(0.2);
    osc1.start();

    osc2.freq(300);
    osc2.amp(0.2);
    osc2.start();

    osc3.freq(250);
    osc3.amp(0.2);
    osc3.start();

    osc4.freq(180);
    osc4.amp(0.2);
    osc4.start();

    audioStarted = true;
    console.log("✅ AudioContext activado y osciladores iniciados.");
  }
}
