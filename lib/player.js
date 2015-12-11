'use strict';

const Vector = require('./vector.js');

class Player {

  constructor(position) {
    this.position = position.plus(new Vector(0, -0.5));
    this.size     = new Vector(0.8, 1.5);
    this.speed    = new Vector(0, 0);

    var playerXSpeed = 7;
    var gravity      = 30;
    var jumpSpeed    = 17;
  }

  type() {
    'player';
  }

  moveX() {
    this.speed.x = 0;

    if (keys.left)  this.speed.x -= playerXSpeed;
    if (keys.right) this.speed.x += playerXSpeed;

    let motion      = new Vector(this.speed.x * step, 0);
    let newPosition = this.position.plus(motion);
    let obstacle    = level.obstacleAt(newPosition, this.size);

    if (obstacle)
      level.playerTouched(obstacle);
    else
      this.position = newPosition;
  }

  moveY(step, level, keys) {

    this.speed.y += step * gravity;

    var motion      = new Vector(0, this.speed.y * step);
    var newPosition = this.position.plus(motion);
    var obstacle    = level.obstacleAt(newPosition, this.size);

    if (obstacle) {

      level.playerTouched(obstacle);

      if (keys.up && this.speed.y > 0)
        this.speed.y = -jumpSpeed;
      else
        this.speed.y = 0;

    } else {
      this.position = newPosition;
    }

  }

  act(step, level, keys) {

    this.moveX(step, level, keys);
    this.moveY(step, level, keys);

    var otherActor = level.actorAt(this);

    if (otherActor)
      level.playerTouched(otherActor.type, otherActor);

    // Losing animation
    if (level.status == "lost") {
      this.position.y += step;
      this.size.y     -= step;
    }
  }

}


module.exports = Player;

