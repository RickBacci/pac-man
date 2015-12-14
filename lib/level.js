'use strict';

const Player = require('./player.js');
const Ghost  = require('./ghost.js');
const Pellet = require('./pellet.js');

const Vector = require('./vector.js');

const actorChars = { '@': Player, 'o': Pellet, 'g': Ghost };


function Level(plan) {

  this.width  = plan[0].length;
  this.height = plan.length;
  this.grid   = [];
  this.actors = [];

  for (let y = 0; y < this.height; y++) {
    let line = plan[y], gridLine = [];
    for (let x = 0; x < this.width; x++) {
      let ch = line[x], fieldType = null;

      let Actor = actorChars[ch];

      if (Actor) {
        this.actors.push(new Actor(new Vector(x, y), ch));
      } else if (ch === "x") {
        fieldType = "wall";
      }

      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }

  this.player = this.actors.filter(function(actor) {
    return actor.type === "player";
  })[0];

  this.status = this.finishDelay = null;

}

Level.prototype.isFinished = function() {
  return this.status !== null && this.finishDelay < 0;
};

Level.prototype.obstacleAt = function(pos, size) {

  let xStart = Math.floor(pos.x);
  let xEnd   = Math.ceil(pos.x + size.x);
  let yStart = Math.floor(pos.y);
  let yEnd   = Math.ceil(pos.y + size.y);

  if (xStart < 0 || xEnd > this.width || yStart < 0) {
    return "wall";
  }

  if (yEnd > this.height) {
    return "lava";
  }

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let fieldType = this.grid[y][x];
      if (fieldType) {
        return fieldType;
      }
    }
  }
};

Level.prototype.actorAt = function(actor) {
  for (let i = 0; i < this.actors.length; i++) {
    let other = this.actors[i];
    if (other !== actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y) {

              return other;
            }
  }

};

let maxStep = 0.05;

Level.prototype.animate = function(step, keys) {

  if (this.status !== null) {
    this.finishDelay -= step;
  }

  while (step > 0) {
    let thisStep = Math.min(step, maxStep);

    this.actors.forEach(function(actor) { actor.act(thisStep, this, keys); }, this);

    step -= thisStep;
  }

};

Level.prototype.playerTouched = function(type, actor) {

  if (type === "ghost" && this.status === null) {
    this.status      = "lost";
    this.finishDelay = 1;
  } else if (type === "pellet") {
    this.actors = this.actors.filter(function(other) { return other !== actor; });

    if (!this.actors.some(function(actor) { return actor.type === "pellet"; })) {
      this.status = "won";
      this.finishDelay = 1;
    }
  }

};


module.exports = Level;

