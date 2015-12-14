'use strict';

const Vector = require('./vector.js');

function Ghost(pos, ch) {

  this.pos  = pos.plus(new Vector(0.6, 0));

  this.size = new Vector(0.4, 0.5);

  if (ch === "g") { this.speed = new Vector(0, 1); }

}

Ghost.prototype.type = "ghost";

Ghost.prototype.act = function(step, level) {

  let newPos = this.pos.plus(this.speed.times(step));

  if (!level.obstacleAt(newPos, this.size)) {
    this.pos = newPos;
  } else if (this.repeatPos) {
    this.pos = this.repeatPos;
  } else {
    this.speed = this.speed.times(-1);
  }

};


module.exports = Ghost;

