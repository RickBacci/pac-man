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

    it('should have a refererence to the level', function(){
      this.level.generate();

      expect(this.ghost.level).to.eql(this.level);
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

  context('can move', function(){

    beforeEach(function() {
      this.ghost = new Ghost(new Vector(20, 20), 'red', 65, this.level);
    });


    it('to the right', function(){
      this.ghost = new Ghost(new Vector(20, 20), 'red', 65, this.level);

      this.ghost.act(new Vector(1, 0), this.level);


      this.ghost.act(1, 0);


      expect(this.block.x).to.eql(11);
      expect(this.block.y).to.eql(10);
    });
  });

});

