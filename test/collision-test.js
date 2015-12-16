'use strict';

const chai   = require('chai');
const expect = chai.expect;

const Level  = require('../lib/level');
const Player = require('../lib/player');
const Vector = require('../lib/player');


describe('Pac-man', function(){

  context('should not be able to move', function(){

    context('into a wall', function(){

      // beforeEach(function() {
      //   let plan  = [['000', '0@0', '000']]
      // });

      it('to the left', function(){
        let plan  = [['000', '0@0', '000']]
        let level = new Level(plan);
        level.generate(plan);

        // level.player = level.actors.filter(function(actor) { return actor.type === "player"; })[0];
        // level.player = level.actors.filter(function(actor) { return actor.type === "player"; })[0];

        // level.player.moveX(step, level, keys);

        // Player.prototype.moveX = function(step, level, keys) {
        // this.pacman.move(-1, 0);

        expect(level.actors).to.eql(20);
        expect(this.player.y).to.eql(20);

      });

      it('to the right', function(){
        // this.block = new Block(21, 20, 'wall', this.board);

        this.pacman.move(1, 0);

        expect(this.pacman.x).to.eql(20);
        expect(this.pacman.y).to.eql(20);

      });


      xit('upward', function(){
        // this.block = new Block(20, 21, 'wall', this.board);

        this.pacman.move(0, 1);

        expect(this.pacman.x).to.eql(20);
        expect(this.pacman.y).to.eql(20);

      });

      xit('downward', function(){
        // this.block = new Block(20, 19, 'wall', this.board);


        this.pacman.move(0, -1);

        expect(this.pacman.x).to.eql(20);
        expect(this.pacman.y).to.eql(20);

      });

    });

  });


  context('that collides with a ghost', function(){

    beforeEach(function() {
      // this.board  = new Board();
      // this.pacman = new Block(10, 10, 'pacman', this.board, 'alive');

    });

    context('should die', function(){

      xit('when it moves to the right', function(){
        // this.ghost  = new Block(11, 10, 'ghost', this.board, 'offense');
        // expect(this.pacman.state).to.eql('alive');
        // expect(this.ghost.state).to.eql('offense');

        this.pacman.move(1, 0);

        expect(this.pacman.state).to.eql('dead');
      });

      xit('when it moves to the left', function(){

        this.ghost  = new Block(9, 10, 'ghost', this.board, 'offense');

        expect(this.pacman.state).to.eql('alive');
        expect(this.ghost.state).to.eql('offense');

        this.pacman.move(-1, 0);

        expect(this.pacman.state).to.eql('dead');
      });

      xit('when it moves up', function(){

        this.ghost  = new Block(10, 9, 'ghost', this.board, 'offense');

        expect(this.pacman.state).to.eql('alive');
        expect(this.ghost.state).to.eql('offense');

        this.pacman.move(0, -1);

        expect(this.pacman.state).to.eql('dead');
      });

      xit('when it moves down', function(){

        this.ghost  = new Block(10, 11, 'ghost', this.board, 'offense');

        expect(this.pacman.state).to.eql('alive');
        expect(this.ghost.state).to.eql('offense');

        this.pacman.move(0, 1);

        expect(this.pacman.state).to.eql('dead');
      });

    });
  });

  context('that collides with a pellet', function(){

    beforeEach(function() {
      this.board  = new Board(300, 300);
      this.pacman = new Block(10, 10, 'pacman', this.board, 'alive');

    });

    context('should eat the pellet and score points', function(){

      xit('when moving left', function(){
        this.pellet = new Block(9, 10, 'pellet', this.board, 'unEaten');

        this.pacman.move(-1, 0);

        // expect(this.pellet.state).to.eql('eaten');
        expect(this.pacman.board.score).to.eql(1);

      });

      xit('when moving right', function(){
        this.pellet = new Block(11, 10, 'pellet', this.board, 'unEaten');

        expect(this.board.score).to.eql(0);
        expect(this.pellet.state).to.eql('unEaten');

        this.pacman.move(1, 0);

        // expect(this.pellet.state).to.eql('eaten');
        expect(this.board.score).to.eql(1);
      });

      xit('when moving up', function(){
        this.pellet = new Block(10, 9, 'pellet', this.board, 'unEaten');

        expect(this.board.score).to.eql(0);
        expect(this.pellet.state).to.eql('unEaten');

        this.pacman.move(0, -1);

        // expect(this.pellet.state).to.eql('eaten');
        expect(this.board.score).to.eql(1);
      });

      xit('when moving down', function(){
        this.pellet = new Block(10, 11, 'pellet', this.board, 'unEaten');

        expect(this.board.score).to.eql(0);
        expect(this.pellet.state).to.eql('unEaten');

        this.pacman.move(0, 1);

        // expect(this.pellet.state).to.eql('eaten');
        expect(this.board.score).to.eql(1);
      });


    });

  });

});

