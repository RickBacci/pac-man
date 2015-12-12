'use strict';

const Vector = require('./vector.js');

class Pellet {

  constructor(position) {
    this.basePosition = this.position = position.plus(new Vector(0.2, 0.1));
    this.size         = new Vector(0.6, 0.6);
    this.wobble       = Math.random() * Math.PI * 2;

  }
  act(step) {
    let wobbleSpeed = 8, wobbleDist = 0.07;
    this.wobble  += step * wobbleSpeed;

    let wobblePos   = Math.sin(this.wobble) * wobbleDist;
    this.position   = this.basePosition.plus(new Vector(0, wobblePos));

  }
  type() {
    'Pellet';
  }

}


module.exports = Pellet;
