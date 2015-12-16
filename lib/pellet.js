'use strict';

const Vector = require('./vector.js');

function Pellet(pos) {

  this.pos  = pos;
  this.size = new Vector(1, 1);

}

Pellet.prototype.type = "pellet";

Pellet.prototype.act = function(step) {
  // add score?
};


module.exports = Pellet;

