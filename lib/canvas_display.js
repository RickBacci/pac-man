'use strict';

const scale = 16;
// const $ = require('jquery');

let otherSprites  = document.createElement("img");
otherSprites.src  = "img/sprites.png";

let playerSprites = document.createElement("img");
playerSprites.src = "img/pacman.png";


class CanvasDisplay {

  constructor(parent, level) {
    this.canvas        = document.getElementById("board");

    this.cx            = this.canvas.getContext("2d");

    this.level         = level;
    this.animationTime = 0;
    this.flipPlayer    = false;

    this.viewport = {
      left:   0,
      top:    0,
      width:  this.canvas.width,
      height: this.canvas.height
    };

    this.drawFrame(0);
  }

  clear() {
    this.canvas.parentNode.removeChild(this.canvas);

  }

  drawFrame(step) {
    this.animationTime += step;

    this.clearDisplay();
    this.drawBackground();
    this.drawActors();

  }

  clearDisplay() {

    if (this.level.status === "won") {
    } else if (this.level.status === "lost") {
    } else {
    }

    this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    this.cx.drawImage(otherSprites, 227, 0, 225, 248, 0, 0, 448, 496 );

  }

  drawPlayer(x, y, width) {

    let player = this.level.player;

    if (player.speed.x !== 0) { this.flipPlayer = player.speed.x < 0; }
    if (player.speed.y !== 0) { this.flipPlayer = player.speed.y < 0; }

    this.cx.save();

    if (this.flipPlayer) { flipHorizontally(this.cx, x + width / 2); }
    if (this.flipPlayer) { flipVertically(this.cx, y + width / 2);   }

    this.cx.drawImage(otherSprites, 455, 0, 16, 16, x, y, scale, scale);

    this.cx.restore();

  }

  drawActors() {

    this.level.actors.forEach(function(actor) {

      let width  = actor.size.x * scale;
      let height = actor.size.y * scale;

      let x      = actor.pos.x  * scale;
      let y      = actor.pos.y  * scale;

      if (actor.type === "player") {

        this.drawPlayer(x, y, width, height);

      } else if (actor.type === 'ghost') {

        let _this = this;

        if (actor.color === 'red') {
          drawRedGhost(_this, x, y, scale, 65);
        } else if (actor.color === 'pink') {
          drawPinkGhost(_this, x, y, scale, 81);
        } else if (actor.color === 'turq') {
          drawTurqGhost(_this, x, y, scale, 97);
        } else {
          drawYellowGhost(_this, x, y, scale, 113);
        }
      } else if (actor.type === 'pellet') {
        this.cx.drawImage(otherSprites,
                          200, 8,7, 7, x, y, scale, scale );
      } else {
        this.cx.drawImage(otherSprites, 205, 21,14, 14, x, y, scale, scale);
      } }, this);

  }

}
function drawRedGhost(_this, x, y, scale, colorOffset) {
  _this.cx.drawImage(otherSprites, 471, colorOffset, 16, 16, x, y, scale, scale);

}

function drawPinkGhost(_this, x, y, scale, colorOffset) {
  _this.cx.drawImage(otherSprites, 471, colorOffset, 16, 16, x, y, scale, scale);

}

function drawTurqGhost(_this, x, y, scale, colorOffset) {
  _this.cx.drawImage(otherSprites, 471, colorOffset, 16, 16, x, y, scale, scale);

}

function drawYellowGhost(_this, x, y, scale, colorOffset) {
  _this.cx.drawImage(otherSprites, 471, colorOffset, 16, 16, x, y, scale, scale);

}

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

module.exports = CanvasDisplay;

