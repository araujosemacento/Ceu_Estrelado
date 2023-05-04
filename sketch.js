let ceu;

function setup() {
  createCanvas(1080, 720);
  ceu = new Ceu(50);
}

function draw() {
  ceu.estrelas();
  ceu.lua();
  ceu.nuvens();
}

function Ceu(stars) {
  if (stars != undefined) {
    this.numeroEstrelas = stars > 0 ? (stars + 1) * 10 : (-1 * stars + 1) * 10;
  } else {
    this.numeroEstrelas = 100;
  }
  this.estrelaPosX = Array.from(
    { length: this.numeroEstrelas },
    (valor) => (valor = random(width))
  );
  this.estrelaPosY = Array.from(
    { length: this.numeroEstrelas },
    (valor) => (valor = random(height))
  );

  let [luaX, luaY] = [random(75, width - 100), random(0, height - 175)];

  this.numeroNuvens = stars % 4;
  this.nuvemPosX = Array.from(
    { length: this.numeroNuvens },
    (valor) => (valor = random(width / 5, (width * 4) / 5))
  );
  this.nuvemPosY = Array.from(
    { length: this.numeroNuvens },
    (valor) => (valor = random(height / 5, (height * 4) / 5))
  );

  this.estrelas = function () {
    background(0);
    for (let i = 0; i < this.numeroEstrelas; i++) {
      ellipse(this.estrelaPosX[i], this.estrelaPosY[i], random(2, 5));
    }
  };

  this.lua = function () {
    beginShape();
    vertex(luaX, luaY);
    bezierVertex(
      luaX,
      luaY + 75,
      luaX + 25,
      luaY + 100,
      luaX + 100,
      luaY + 100
    );
    bezierVertex(luaX, luaY + 175, luaX - 75, luaY + 75, luaX, luaY);
    endShape(CLOSE);
  };

  this.nuvens = function () {
    let nuvem = [];
    for (let i = 0; i < this.numeroNuvens; i++) {
      noStroke();
      nuvem[i] = [
        rect(this.nuvemPosX[i], this.nuvemPosY[i], 100, 50),
        ellipse(this.nuvemPosX[i], this.nuvemPosY[i] + 50 / 2, 50),
        ellipse(this.nuvemPosX[i] + 100, this.nuvemPosY[i] + 50 / 2, 50),
        ellipse(this.nuvemPosX[i] + 15, this.nuvemPosY[i] + 10, 50),
        ellipse(this.nuvemPosX[i] + 45, this.nuvemPosY[i], 50),
        ellipse(this.nuvemPosX[i] + 80, this.nuvemPosY[i], 60),
      ];
      if (this.nuvemPosX[i] - 25 > width) {
        this.nuvemPosY[i] = random(height / 5, (height * 4) / 5);
        this.nuvemPosX[i] = -125;
      } else if (this.nuvemPosX[i] - 25 < -150) {
        this.nuvemPosY[i] = random(height / 5, (height * 4) / 5);
        this.nuvemPosX[i] = width + 25;
      }
    }
    this.nuvemPosX = this.nuvemPosX.map(
      (x, i) => (x = i % 2 == 0 ? x + 0.5 + i / 5 : x - (0.5 + i / 5))
    );
  };
}
