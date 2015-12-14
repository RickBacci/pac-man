'use strict';

const Vector = require('./vector.js');


function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1);
  this.speed = new Vector(0, 0);
}

Player.prototype.type = "player";

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  let otherActor = level.actorAt(this);

  if (otherActor) {
    level.playerTouched(otherActor.type, otherActor);
  }

  // Losing animation
  if (level.status === "lost") {
    this.pos.y += step;
    this.size.y -= step;
  }

};

let playerXSpeed = 7;

Player.prototype.moveX = function(step, level, keys) {

  this.speed.x = 0;

  if (keys.left) {
    this.speed.x -= playerXSpeed;
  }

  if (keys.right) {
    this.speed.x += playerXSpeed;
  }

  let motion   = new Vector(this.speed.x * step, 0);

  let newPos   = this.pos.plus(motion);
  let obstacle = level.obstacleAt(newPos, this.size);

  if (obstacle) {
    level.playerTouched(obstacle);
  } else {
    this.pos = newPos;
  }

};

let playerYSpeed = 7;

Player.prototype.moveY = function(step, level, keys) {

  this.speed.y = 0;

  if (keys.up)   { this.speed.y -= playerYSpeed; }
  if (keys.down) { this.speed.y += playerYSpeed; }

  let motion   = new Vector(this.speed.y * step, 0);

  let newPos   = this.pos.plus(motion);
  let obstacle = level.obstacleAt(newPos, this.size);

  if (obstacle) {
    level.playerTouched(obstacle);
  } else {
    this.pos = newPos;
  }

};


// var gravity = 30;
// var jumpSpeed = 17;

// Player.prototype.moveY = function(step, level, keys) {
//   this.speed.y += step * gravity;
//   var motion = new Vector(0, this.speed.y * step);
//   var newPos = this.pos.plus(motion);
//   var obstacle = level.obstacleAt(newPos, this.size);
//   if (obstacle) {
//     level.playerTouched(obstacle);
//     if (keys.up && this.speed.y > 0)
//       this.speed.y = -jumpSpeed;
//     else
//       this.speed.y = 0;
//   } else {
//     this.pos = newPos;
//   }
// };



module.exports = Player;

