'use strict';

const scale = 10;

function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}

function flipVertically(context, around) {
  context.translate(0, around);
  context.scale(1, -1);
  context.translate(0, -around);
}

function CanvasDisplay(parent, level) {

  this.canvas        = document.createElement("canvas");

  this.canvas.width  = Math.min(432, level.width * scale);
  this.canvas.height = Math.min(512, level.height * scale);

  parent.appendChild(this.canvas);

  this.cx            = this.canvas.getContext("2d");

  this.level         = level;
  this.animationTime = 0;
  this.flipPlayer    = false;

  this.viewport = {
    left: 0,
    top: 0,
    width: this.canvas.width / scale,
    height: this.canvas.height / scale
  };

  this.drawFrame(0);
}

CanvasDisplay.prototype.clear = function() {
  this.canvas.parentNode.removeChild(this.canvas);
};

CanvasDisplay.prototype.drawFrame = function(step) {
  this.animationTime += step;

  this.clearDisplay();
  this.drawBackgroundWalls();
  this.drawActors();
};


CanvasDisplay.prototype.clearDisplay = function() {

  if (this.level.status === "won") {

    // show winning stuff

  } else if (this.level.status === "lost") {

    // show losing stuff

  } else {
    this.cx.fillStyle = 'black';
  }
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);

};

let otherSprites = document.createElement("img");
otherSprites.src = "img/sprites.png";

CanvasDisplay.prototype.drawBackgroundWalls = function() {

  let view   = this.viewport;
  let xStart = Math.floor(view.left);
  let xEnd   = Math.ceil(view.left + view.width);
  let yStart = Math.floor(view.top);
  let yEnd   = Math.ceil(view.top + view.height);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {

      let tile = this.level.grid[y][x];

      if (tile === null) { continue; }

      let screenX = x * scale;
      let screenY = y * scale;

      this.cx.fillStyle = 'blue';
      this.cx.fillRect(xStart, yStart, xEnd * scale, yEnd * scale);

    }
  }
 this.cx.drawImage(otherSprites, 225, 0, 230, 248, xStart, yStart, xEnd * scale, yEnd * scale);

};

let playerSprites = document.createElement("img");
playerSprites.src = "img/pacman.png";

CanvasDisplay.prototype.drawPlayer = function(x, y, width, height) {

  let player = this.level.player;

  if (player.speed.x !== 0) { this.flipPlayer = player.speed.x < 0; }
  if (player.speed.y !== 0) { this.flipPlayer = player.speed.y < 0; }

  this.cx.save();

  if (this.flipPlayer) { flipHorizontally(this.cx, x + width / 2); }
  if (this.flipPlayer) { flipVertically(this.cx, y + width / 2);   }

  let widthOffset  = 0;
  let heightOffset = 0;

  this.cx.drawImage(otherSprites, 455, 0, 16, 16, x, y, scale, scale);

  this.cx.restore();

};

CanvasDisplay.prototype.drawActors = function() {
  this.level.actors.forEach(function(actor) {

    let width  = actor.size.x * scale;
    let height = actor.size.y * scale;

    let x      = actor.pos.x  * scale;
    let y      = actor.pos.y  * scale;

    if (actor.type === "player") {

      this.drawPlayer(x, y, width, height);

    } else if (actor.type === 'ghost') {
      this.cx.drawImage(otherSprites, 471, 65, 16, 16, x, y, scale, scale);
    } else if (actor.type === 'pellet') {
      this.cx.drawImage(otherSprites, 200, 8,7, 7, x, y, scale, scale );
    } else {
      this.cx.drawImage(otherSprites, 205, 21,14, 14, x, y, scale, scale);
    }
  }, this);

};


module.exports = CanvasDisplay;
