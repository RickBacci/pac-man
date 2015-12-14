'use strict';

const Vector = require('./vector.js');


function Pellet(pos) {

  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size    = new Vector(0.6, 0.6);
  this.wobble  = Math.random() * Math.PI * 2;

}

Pellet.prototype.type = "pellet";

let wobbleSpeed = 8, wobbleDist = 0.07;

Pellet.prototype.act = function(step) {

  this.wobble += step * wobbleSpeed;
  let wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));

};


module.exports = Pellet;

