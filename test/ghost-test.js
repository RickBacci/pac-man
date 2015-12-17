'use strict';

const chai   = require('chai');
const expect = chai.expect;

const Ghost   = require('../lib/ghost');
const Vector  = require('../lib/vector');
const Level   = require('../lib/level');


describe('Ghost', function(){

  context('belongs to a level', function(){

    beforeEach(function() {
      let plan  = [['r0', '00', '00']];
      this.level = new Level(plan);
      this.ghost = new Ghost(new Vector(20, 20), 'red', 65, this.level);
    });

    it('can exist', function(){
      expect(this.ghost).to.be.instanceOf(Ghost);
    });

    it('should have 4 ghosts per level', function(){
      this.level.addGhosts();

      expect(this.level.actors.length).to.eql(4);
    });

    it('should have an X-coordinate', function(){
      this.ghost = new Ghost(new Vector(20, 20), 'red', 65, this.level);

      expect(this.ghost.pos.x).to.deep.eql(20);
    });

    it('should have an Y-coordinate', function(){
      this.ghost = new Ghost(new Vector(20, 20), 'red', 65, this.level);

      expect(this.ghost.pos.y).to.deep.eql(20);
    });

  });


});

