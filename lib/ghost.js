'use strict';

const Vector = require('./vector.js');

function Ghost(pos, color, colorOffset, level) {

  this.pos         = pos;
  this.size        = new Vector(1, 1);
  this.speed       = new Vector(0, 0);
  this.color       = color;
  this.colorOffset = 0;
  this.level       = level;
  this.state       = 'fight';
}

Ghost.prototype.type = "ghost";

Ghost.prototype.act = function(step, level) {

  let newPos     = this.pos.plus(this.speed.times(step));
  let ghostSize  = this.size;

  if (!level.obstacleAt(newPos, ghostSize)) {
    this.pos = newPos;
  } else {
    this.speed = this.speed.times(-1);
  }

};


module.exports = Ghost;

