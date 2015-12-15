'use strict';

const Vector = require('./vector.js');

function PowerPellet(pos) {

  this.pos  = pos;
  this.size = new Vector(1, 1);

}

PowerPellet.prototype.type = "powerPellet";

PowerPellet.prototype.act = function(step) {
  console.log(step);

};


module.exports = PowerPellet;

