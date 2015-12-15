'use strict';

const Vector = require('./vector.js');

function Ghost(pos, color, colorOffset, board) {

  this.pos         = pos;
  this.size        = new Vector(1, 1);
  this.speed       = new Vector(0, 1);
  this.color       = color;
  this.colorOffset = 0;
  this.board       = board;
}

Ghost.prototype.type = "ghost";

Ghost.prototype.act = function(step, level) {

  let newPos     = this.pos.plus(this.speed.times(step));
  let playerSize = this.size;

  if (pathClear(level, newPos, playerSize)) {
    this.pos = newPos;
  } else {
    this.speed = this.speed.times(-1);
  }

};

function pathClear(level, newPos, size) {
  return !level.obstacleAt(newPos, size);
}


module.exports = Ghost;

