// REFLEXIONANDO SOBRE CAMINOS SINUOSOS
// LISSAJOUS.06
// trama2

// Recuerda agregar en index.html
// <div id="sketch-container06"></div>

function interfaz(){
  waves = 100; //Cuantas ondas
  frameLimit = 20; //cuándo se detiene? [en SEGUNDOS]
  margin = 0; //Dónde rebotan?
  rebotA = 0; // 1 = SI, 0 = NO

  for (let i = 0; i < waves; i++) {
      p[i] = new Particle(
        0, //random(margin, width - margin),
        i*15-5, //random(margin, height - margin), //x,y
        1,
        i/10, //velocidadX,velocidadY
        2,
        i/3, //alterX, alterY
        1, //diam
        margin, // punto de rebote
        rebotA //1 rebota, 0 no rebota
      );
    }

}

function lisax(x, dx, ax) {
  //  ¿Cómo se mueven en el eje X?
  return x + dx * cos(radians((count-pCount) * ax)) * cos(radians((count-pCount) * ax)) //* cos(radians((count-pCount) * ax)) * cos(radians((count-pCount) * ax)) * cos(radians((count-pCount) * ax)) * cos(radians((count-pCount) * ax))
}
function lisay(y, dy, ay) {
  return y + dy * sin(radians((count-pCount) * ay)) * sin(radians((count-pCount) * ay)) * sin(radians((count-pCount) * ay)) * sin(radians((count-pCount) * ay)) //* sin(radians((count-pCount) * ay))
}
function tinte(x) {
  // ¿Cómo cambia el tinte?
  return 180 * sin(radians(frameCount) + x);
}


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////endOfInterfaz///////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



function resetSketch(){
  loop();
  interfaz();



  pCount = frameCount;
  var canvas = createCanvas(600, 600)
  canvas.parent('sketch-container06');
  background(200, 10, 10, 100);
}

function draw() {

  count = frameCount;

  for (let i = 0; i < p.length; i++) {
    p[i].update();
    p[i].draw();
  }

  if (count - pCount == frameLimit * 60) {
    noLoop();
    pCount = count;

    noFill();
    stroke(255);
    rect(0,0,width,height)
  }
}

class Particle {
  constructor(x, y, dx, dy, alterx, altery, diam, margen, rebote) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.alterx = alterx;
    this.altery = altery;
    this.diam = diam;
    this.init = random(0, 360); // Color Inicial
    this.margen = margen; //punto de rebote
    this.rebote = rebote;
  }
  update() {

    this.x = lisax(this.x,this.dx,this.alterx);
    this.y = lisay(this.y,this.dy,this.altery);

    if (this.rebote == 1) {
      if (this.x < this.margen || this.x > width - this.margen) this.dx *= -1; //REBOTE X
      if (this.y < this.margen || this.y > height - this.margen) this.dy *= -1; //REBOTE Y
    }
  }
  draw() {
    push();
    translate(this.x, this.y);
    noStroke();
    //fill(cos(radians(frameCount) + this.init) * 200, 30, 80, 100);
    fill(tinte(this.init), 30, 80, 100);
    ellipse(0, 0, this.diam, this.diam);
    stroke(0, 0, 80);
    pop();
  }
}

function setup() {
  colorMode(HSB, 360, 100, 100, 100);
  var canvas = createCanvas(600, 600)
  canvas.parent('sketch-container06');

  inicio();
  p = [];
  pCount = 0;
}

function mousePressed(){
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
  p.splice(0, p.length)
  resetSketch();
  }
}

function inicio(){
  push();
  textAlign(CENTER);
  textSize(32)
  colorMode(HSB, 360, 100, 100, 100);
  background(200, 10, 10, 100);
  fill(255);
  text("clickToBegin",width/2,height/2)
  pop();
}


let p;
let waves;
let frameLimit;
let margin;
let rebotA;

let count, pCount;
