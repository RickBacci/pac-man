'use strict';

const Player = require('./player.js');
const Ghost  = require('./ghost.js');
const Pellet = require('./pellet.js');
const Vector = require('./vector.js');


let pacmanBoard = [
  "         ",
  "  wwwww  ",
  "  wooow  ",
  "  wPwow  ",
  "  wooow  ",
  "  wwwww  ",
  "         "
];

let actorChars = {
  'p': Player,
  'o': Pellet,
  'g': Ghost
};

class Level {

  constructor(plan) {

    this.width  = plan[0].length;
    this.height = plan[0].length;

    this.grid   = [];
    this.actors = [];

    for (let y = 0; y < this.height; y++) {
      let line = plan[y], gridLine = [];
      for (let x = 0; x < this.width; x++) {
        let ch = line[x], fieldType = null;

        // let Actor = function() {
        //   return actorChars[ch];
        // }

        let Actor = actorChars[ch];

        if (Actor)
          this.actors.push(new Actor(new Vector(x, y), ch));
        else if (ch == "w")
          fieldType = "wall";
        // else if (ch == "!")
        //   fieldType = "lava";

        gridLine.push(fieldType);

      }

      this.grid.push(gridLine);

    }

    this.player = this.actors.filter(function(actor) {
      return actor.type == "player";
    })[0];

    this.status = this.finishDelay = null;
  }

  isFinished() {
    return this.status != null && this.finishDelay < 0;
  }

  obstacleAt(position, size) {

    var xStart = Math.floor(position.x);
    var xEnd   = Math.ceil(position.x + size.x);
    var yStart = Math.floor(position.y);
    var yEnd   = Math.ceil(position.y + size.y);

    if (xStart < 0 || xEnd > this.width || yStart < 0)
      return "wall";
    // if (yEnd > this.height)
    //   return "lava";
    for (var y = yStart; y < yEnd; y++) {
      for (var x = xStart; x < xEnd; x++) {
        var fieldType = this.grid[y][x];
        if (fieldType) return fieldType;
      }
    }

  }

  actorAt(actor) {

    for (var i = 0; i < this.actors.length; i++) {

      var other = this.actors[i];

      if (other != actor &&
          actor.position.x + actor.size.x > other.position.x &&
          actor.position.x < other.position.x + other.size.x &&
            actor.position.y + actor.size.y > other.position.y &&
              actor.position.y < other.position.y + other.size.y)
              return other;
    }
  }

  animate(step, keys) {
    if (this.status != null)
      this.finishDelay -= step;

    while (step > 0) {
      var maxStep  = 0.05;
      var thisStep = Math.min(step, maxStep);
      this.actors.forEach(function(actor) {
        actor.act(thisStep, this, keys);
      }, this);
      step -= thisStep;
    }
  }

  playerTouched(type, actor) {
    if (type == "lava" && this.status == null) {

      this.status      = "lost";
      this.finishDelay = 1;

    } else if (type == "pellet") {

      this.actors = this.actors.filter(function(other) {
        return other != actor;
      });

      if (!this.actors.some(function(actor) {
        return actor.type == "pellet";
      })) {
        this.status = "won";
        this.finishDelay = 1;
      }
    }
  }

}

// let simpleLevel = new Level(pacmanBoard);


module.exports = Level;

