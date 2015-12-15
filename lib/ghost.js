'use strict';

const Vector = require('./vector.js');

function Ghost(pos, color) {

  this.pos   = pos;
  this.size  = new Vector(1, 1);
  this.speed = new Vector(0, 1);
  this.color = color;

}

Ghost.prototype.type = "ghost";

Ghost.prototype.act = function(step, level) {

  let newPos = this.pos.plus(this.speed.times(step));

  if (!level.obstacleAt(newPos, this.size)) {
    this.pos = newPos;
  } else {
    this.speed = this.speed.times(-1);
  }

};


module.exports = Ghost;

