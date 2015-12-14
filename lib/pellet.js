'use strict';

const Vector = require('./vector.js');

function Pellet(pos) {

  this.basePos = this.pos = pos.plus(new Vector(0.8, 0.8));
  this.size    = new Vector(0.2, 0.2);

}

Pellet.prototype.type = "pellet";

Pellet.prototype.act = function(step) {
  this.pos = this.basePos;

};


module.exports = Pellet;

