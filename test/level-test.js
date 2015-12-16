'use strict';

const chai   = require('chai');
const expect = chai.expect;



const Level       = require('../lib/level.js');
const Player      = require('../lib/player.js');
const Ghost       = require('../lib/ghost.js');
const Pellet      = require('../lib/pellet.js');
const PowerPellet = require('../lib/power_pellet.js');
const Vector      = require('../lib/vector.js');
const GAME_LEVELS = require('../lib/game_levels.js')

const actorChars = {
  '@': Player,
  'r': Ghost,
  'p': Ghost,
  't': Ghost,
  'o': Ghost,
  'O':PowerPellet,
  '-': Pellet,
  '|': Pellet,
  '+': Pellet
};

describe('Level', function(){


  context('when created', function(){

    it('should instantiate a new level', function(){
      let plan  = GAME_LEVELS[0];
      let level = new Level(plan);
      level.generate(plan);

      expect(level).to.be.instanceOf(Level)
    });

    it('should have a width', function(){
      let plan  = GAME_LEVELS[0];
      let level = new Level(plan);
      level.generate();

       expect(level.width).to.eql(28);
     });

    it('should have a height', function(){
      let plan  = GAME_LEVELS[0];
      let level = new Level(plan);

      expect(level.height).to.eql(31);
    });

    it('should have a grid based off the level plan', function(){
      let plan  = GAME_LEVELS[0];
      let level = new Level(plan);
      level.generate();

      expect(level.grid[0].length).to.eql(plan[0].length);
      expect(level.grid.length).to.eql(plan.length);
    });


   it('should start with an empty array of actors', function(){

      let plan  = GAME_LEVELS[0];
      let level = new Level(plan);

      expect(level.actors).to.be.an.array
      expect(level.actors).to.be.empty
    });

  });


  describe('Level', function(){

    it('can be generated', function(){
      let plan  = GAME_LEVELS[0];
      let level = new Level(plan);
      level.generate();

      expect(level.actors).to.not.be.empty;
    });


  });

});
