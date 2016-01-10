'use strict';

const Vector = require('./vector.js');


function Player(pos) {
  this.pos    = pos;
  this.size   = new Vector(0.8, 0.8);
  this.speed  = new Vector(0, 0);
  this.status = 'alive';
  this.score  = 0;
  this.lives  = 3;
}

Player.prototype.type = "player";

Player.prototype.act = function(step, level, keys) {

  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  let otherActor = level.actorAt(this);

  if (otherActor) {
    level.playerTouched(otherActor.type, otherActor);
  }

  if (level.status === "lost") {
    // TODO: add animation for pacman
  }

};


let defaultSpeed = 6;

Player.prototype.moveX = function(step, level, keys) {

  if (keys.left)  { this.speed.x = -defaultSpeed; }
  if (keys.right) { this.speed.x =  defaultSpeed; }

  let motion   = new Vector(this.speed.x * step, 0);
  let newPos   = this.pos.plus(motion);
  let obstacle = level.obstacleAt(newPos, this.size);

  if (obstacle) {
    this.speed.x = 0;
    this.pos.x   = Math.round(this.pos.x);
    level.playerTouched(obstacle);
  } else {
    this.pos = newPos;
  }

};

Player.prototype.moveY = function(step, level, keys) {

  if (keys.up)   { this.speed.y = -defaultSpeed; }
  if (keys.down) { this.speed.y =  defaultSpeed; }

  let motion   = new Vector(0, this.speed.y * step);
  let newPos   = this.pos.plus(motion);
  let obstacle = level.obstacleAt(newPos, this.size);

  if (obstacle) {
    this.speed.y = 0;
    this.pos.y   = Math.round(this.pos.y);
    level.playerTouched(obstacle);
  } else {
    this.pos = newPos;
  }

};


module.exports = Player;

