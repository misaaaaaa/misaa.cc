// https://www.youtube.com/watch?v=pohgg2RTtjE

//ancho y alto canvas
let w = 338;
let h = 600;

canvas.parent('canvasForHTML');


//vértices figura
let ax, ay, bx, by, cx, cy, dx, dy;

//márgen rebote
var marg = 30;

//Frame y direcciones de movimiento
var tik = 0;
var dirax = 1;
var diray = 1;
var dirbx = 1;
var dirby = 1;
var dircx = 1;
var dircy = 1;
var dirdx = 1;
var dirdy = 1;

//color
var col = 0;

function setup() {

  var canvas = createCanvas(winWidth, winHeight);
      canvas.parent('canvasForHTML');
  colorMode(HSB, 360, 100, 100, 100);

  //Posición inicial figura
  ax = round(random(marg, w - marg));
  ay = round(random(marg, h - marg));
  bx = round(random(marg, w - marg));
  by = round(random(marg, h - marg));
  cx = round(random(marg, w - marg));
  cy = round(random(marg, h - marg));
  dx = round(random(marg, w - marg));
  dy = round(random(marg, h - marg));


}

function draw() {


  background(col, 23, 99);

  //frame rate sin sacar el framerate
  var x = frameCount % 1;
  if (x == 0) {
    tik = 1
  } else {
    tik = 0
  }

  if (tik == 1) { //si hay tik

    //Número asigna velocidad de movimiento
    ax = ax + 0.1 * dirax;
    ay = ay + 0.13 * diray;
    if (ax > w - marg) { //si choca margen, devuelve
      dirax = -1;
    }
    if (ax < 0 + marg) {
      dirax = 1;
    }
    if (ay > h - marg) {
      diray = -1;
    }
    if (ay < 0 + marg) {
      diray = 1;
    }

    //Lo mismo para cada vértice

    bx = bx + 0.15 * dirbx;
    by = by + 0.23 * dirby;
    if (bx > w - marg) {
      dirbx = -1;
    }
    if (bx < 0 + marg) {
      dirbx = 1;
    }
    if (by > h - marg) {
      dirby = -1;
    }
    if (by < 0 + marg) {
      dirby = 1;
    }

    cx = cx + 0.01 * dircx;
    cy = cy + 0.15 * dircy;
    if (cx > w - marg) {
      dircx = -1;
    }
    if (cx < 0 + marg) {
      dircx = 1;
    }
    if (cy > h - marg) {
      dircy = -1;
    }
    if (cy < 0 + marg) {
      dircy = 1;
    }

    dx = dx + 0.2 * dirdx;
    dy = dy + 0.14 * dirdy;
    if (dx > w - marg) {
      dirdx = -1;
    }
    if (dx < 0 + marg) {
      dirdx = 1;
    }
    if (dy > h - marg) {
      dirdy = -1;
    }
    if (dy < 0 + marg) {
      dirdy = 1;
    }


    //alteracolor
    col = ((frameCount/10)%360);
    //   col += 0.3;
    //   if (col >= 360) {
    //     col = 0;
    //   }
    }


    //Dibuja lineas principales en posiciones deseadas
    strokeWeight(5);
    stroke(360 - col, 30, 75)
    line(ax, ay, bx, by);
    line(bx, by, cx, cy);
    line(cx, cy, dx, dy);
    line(dx, dy, ax, ay);
    line(ax, ay, cx, cy);
    line(bx, by, dx, dy);

    //Lineas secundarias entre vértice A y puntos medios
    strokeWeight(1);
    stroke(360 - col, 30, 30)
    line(ax, ay, (cx + bx) / 2, (cy + by) / 2); //1
    line(ax, ay, (bx + dx) / 2, (by + dy) / 2); //2
    line(ax, ay, (cx + dx) / 2, (cy + dy) / 2); //3

    //Lineas entre puntos medios
    line((cx + bx) / 2, (cy + by) / 2, (bx + dx) / 2, (by + dy) / 2); //1 y 2
    line((bx + dx) / 2, (by + dy) / 2, (cx + dx) / 2, (cy + dy) / 2); //2 y 3
    line((cx + bx) / 2, (cy + by) / 2, (cx + dx) / 2, (cy + dy) / 2); //1 y 3

    //Dibuja y rellena un triangulo en una cara para generar sensación de base
    strokeWeight(0)
    fill(360 - col, 100, 100, 20);
    triangle(cx, cy, bx, by, dx, dy);

    //  textSize(5);
    // fill(0, 102, 153);
    //  text('a', ax, ay);
    //  text('b', bx, by);
    //  text('c', cx, cy);
    //  text('d', dx, dy);



  }
