'use strict';

const Vector = require('./vector.js');


function Player(pos) {
  this.pos   = pos;
  this.size  = new Vector(0.8, 0.8);
  this.speed = new Vector(0, 0);
  this.status = 'alive';
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
    //pacman dying
    this.size.x -= step;
    this.size.y -= step;
  }

};

let playerXSpeed = 7;

Player.prototype.moveX = function(step, level, keys) {

  this.speed.x = 0;

  if (keys.left)  { this.speed.x = -playerXSpeed; }
  if (keys.right) { this.speed.x = playerXSpeed; }

  let motion   = new Vector(this.speed.x * step, 0);
  let newPos   = this.pos.plus(motion);

  let obstacle = level.obstacleAt(newPos, this.size);
  let _this    = this;

  return obstacleName(_this, obstacle, newPos, level);

};

let playerYSpeed = 7;

Player.prototype.moveY = function(step, level, keys) {

  this.speed.y = 0;

  if (keys.up)   { this.speed.y -= playerYSpeed; }
  if (keys.down) { this.speed.y += playerYSpeed; }

  let motion   = new Vector(0, this.speed.y * step);
  let newPos   = this.pos.plus(motion);
  let obstacle = level.obstacleAt(newPos, this.size);
  let _this    = this;

  return obstacleName(_this, obstacle, newPos, level);

};

function obstacleName(_this, obstacle, newPos, level) {
  if (obstacle) {
    return level.playerTouched(obstacle);
  } else {
    return _this.pos = newPos;
  }

}


module.exports = Player;

