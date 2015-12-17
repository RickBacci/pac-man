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
          case '-':
          case '|':
          case '+':
            actor = new Actor(new Vector(x, y), ch);
            this.actors.push(actor);
            break;
          case '0':
            fieldType = "wall";
            break;

          default:
        }

        gridLine.push(fieldType);
      }
      this.grid.push(gridLine);
      this.addGhosts();
    }
    this.player = this.addPlayer();
    this.status = this.finishDelay = null;
  }

  addPlayer() {
    let Actor = Player;
    let actor;

    actor = new Actor(new Vector(16, 23), this);
    this.actors.push(actor);
    return actor;
  }

  addGhosts() {
    let Actor = Ghost;
    let actor;

    actor = new Actor(new Vector(15, 13), 'r', 0, this);
    actor.color = 'red';
    actor.speed = actor.speed.plus(new Vector(0, 1));
    this.actors.push(actor);

    actor = new Actor(new Vector(21, 17), 'p', 0, this);
    actor.color = 'pink';
    actor.speed = actor.speed.plus(new Vector(0, 1));
    this.actors.push(actor);

    actor = new Actor(new Vector(1, 5), 't', 0, this);
    actor.color = 'turq';
    actor.speed = actor.speed.plus(new Vector(1, 0));
    this.actors.push(actor);

    actor = new Actor(new Vector(6, 6), 'o', 0, this);
    actor.color = 'orng';
    actor.speed = actor.speed.plus(new Vector(0, 1));
    this.actors.push(actor);

  }

  isFinished() {
    return this.status !== null && this.finishDelay < 0;
  }

  obstacleAt(pos, size) {

    let xStart = Math.floor(pos.x);
    let xEnd   = Math.ceil(pos.x + size.x);

    let yStart = Math.floor(pos.y);
    let yEnd   = Math.ceil(pos.y + size.y);

    if (xStart < 0 ) { return 'passage'; }

    if (xEnd > this.width) { return 'passage'; }


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

    // console.log(this.actors);

    while (step > 0) {

      let thisStep = Math.min(step, maxStep);

      for (let i = 0, l = this.actors.length; i < l; i++) {

        let actor = this.actors[i];

        if (actor.type === 'pellet'     ) { continue; }
        if (actor.type === 'PowerPellet') { continue; }

        actor.act(thisStep, this, keys);
      }

      step -= thisStep;
    }

  }


  playerTouched(type, actor) {

    if (type === "ghost" && this.status === null) {
      this.status      = "lost";
      this.finishDelay = 1;



    } else if (type === "passage") {

      if (this.player.pos.x < 1) {

        this.player.pos = new Vector(27, this.player.pos.y);

      } else {

        this.player.pos = new Vector(0, this.player.pos.y);
      }

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

