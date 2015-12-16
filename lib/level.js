'use strict';

const Player = require('./player.js');
const Ghost  = require('./ghost.js');
const Pellet = require('./pellet.js');
const PowerPellet = require('./power_pellet.js');

const Vector = require('./vector.js');

const actorChars = {
  '@': Player,
  'r': Ghost,
  'p': Ghost,
  't': Ghost,
  'o': Ghost,
  'O': PowerPellet,
  '-': Pellet,
  '|': Pellet,
  '+': Pellet
};


class Level {

  constructor(plan) {

    this.width  = plan[0].length;
    this.height = plan.length;

    this.grid   = [];
    this.actors = [];

    this.plan = plan;

  }

  generate() {

    for (let y = 0; y < this.height; y++) {

      let line = this.plan[y], gridLine = [];

      for (let x = 0; x < this.width; x++) {

        let ch        = line[x];
        let fieldType = null;
        let Actor     = actorChars[ch];
        let actor;

        switch (ch) {
          case '@':
          case '-':
          case '|':
          case '+':
          case 'r':
            actor = new Actor(new Vector(x, y), ch);
            actor.color = 'red';
            this.actors.push(actor);
            break;
          case 'p':
            actor = new Actor(new Vector(x, y), ch);
            actor.color = 'pink';
            actor.speed.x = 1;
            actor.speed.y = 0;
            this.actors.push(actor);
            break;
          case 't':
            actor = new Actor(new Vector(x, y), ch);
            actor.color = 'turq';
            this.actors.push(actor);
            break;
          case 'o':
            actor = new Actor(new Vector(x, y), ch);
            actor.color = 'orng';
            actor.speed.x = 1;
            actor.speed.y = 0;
            this.actors.push(actor);
            break;
          case 'O':
            actor = new Actor(new Vector(x, y), ch);
            this.actors.push(actor);
            break;
          case '0':
            fieldType = "wall";
            break;

        }

        gridLine.push(fieldType);
      }
      this.grid.push(gridLine);
    }
    this.player =
      this.actors.filter(function(actor) { return actor.type === "player"; })[0];
      this.status = this.finishDelay = null;
  }


  isFinished() {
    return this.status !== null && this.finishDelay < 0;
  }

  obstacleAt(pos, size) {

    let xStart = Math.floor(pos.x);
    let xEnd   = Math.ceil(pos.x + size.x);

    let yStart = Math.floor(pos.y);
    let yEnd   = Math.ceil(pos.y + size.y);

    if (xStart < 0 || xEnd > this.width) { return "wall"; }
    if (yStart < 0 || yEnd > this.width) { return "wall"; }

    for (  let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {

        let fieldType = this.grid[y][x];

        if (fieldType) { return fieldType; }

      }
    }

  }

  actorAt(actor) {

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

  }

  animate(step, keys) {

    let maxStep = 0.05;

    if (this.status !== null) { this.finishDelay -= step; }

    while (step > 0) {

      let thisStep = Math.min(step, maxStep);

      this.actors.forEach(function(actor) {
        actor.act(thisStep, this, keys);
      }, this);

      step -= thisStep;
    }

  }


  playerTouched(type, actor) {

    if (type === "ghost" && this.status === null) {
      this.status      = "lost";
      this.finishDelay = 1;

    } else if (type === "pellet") {

      this.actors = this.actors.filter(function(other) { return other !== actor; });

      if (!this.actors.some(function(actor) {
        return actor.type === "pellet" || actor.type === "powerPellet"; })) {
        this.status      = "won";

        this.finishDelay = 1;
        // show press start

      }

    } else if (type === "powerPellet") {
      this.actors = this.actors.filter(function(other) { return other !== actor; });

      if (!this.actors.some(function(actor) { return actor.type === "pellet" || actor.type === "powerPellet"; })) {
        this.status      = "won";
        // show press start

      }
    }


  }

}

module.exports = Level;

