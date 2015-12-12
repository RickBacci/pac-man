'use strict';

const Vector = require('./vector.js');

class Player {

  constructor(position) {
    this.position = position.plus(new Vector(0, -0.5));
    this.size     = new Vector(0.8, 1.5);
    this.speed    = new Vector(0, 0);

  }

  type() {
    'player';
  }

  moveX(step, level, keys) {

    let playerXSpeed = 7;

    this.speed.x = 0;


    if (keys.left) { this.speed.x -= playerXSpeed; }
    if (keys.right) { this.speed.x += playerXSpeed; }

    let motion      = new Vector(this.speed.x * step, 0);
    let newPosition = this.position.plus(motion);
    let obstacle    = level.obstacleAt(newPosition, this.size);

    if (obstacle) {
      level.playerTouched(obstacle);
    } else {
      this.position = newPosition;
    }

  }

  moveY(step, level, keys) {
    let jumpSpeed    = 17;
    let gravity      = 30;

    this.speed.y += step * gravity;

    let motion      = new Vector(0, this.speed.y * step);
    let newPosition = this.position.plus(motion);
    let obstacle    = level.obstacleAt(newPosition, this.size);

    if (obstacle) {

      level.playerTouched(obstacle);

      if (keys.up && this.speed.y > 0) {
        this.speed.y = -jumpSpeed;
      } else {
        this.speed.y = 0;
      }

    } else {
      this.position = newPosition;
    }

  }

  act(step, level, keys) {

    this.moveX(step, level, keys);
    this.moveY(step, level, keys);

    let otherActor = level.actorAt(this);

    if (otherActor) {
      level.playerTouched(otherActor.type, otherActor);
    }

    // Losing animation
    if (level.status === "lost") {
      this.position.y += step;
      this.size.y     -= step;
    }
  }

}


module.exports = Player;

