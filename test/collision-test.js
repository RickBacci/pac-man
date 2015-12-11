'use strict';

const chai   = require('chai');
const expect = chai.expect;

const Board  = require('../lib/board');
const Block  = require('../lib/block');


describe('Pac-man', function(){

  context('should not be able to move', function(){

    beforeEach(function() {
      this.board  = new Board();
      this.pacman = new Block(20, 20, 'pacman', this.board, 'alive');
    });

    context('into a wall', function(){

      it('to the left', function(){
        this.block = new Block(19, 20, 'wall', this.board);

        this.pacman.move(-1, 0);

        expect(this.pacman.x).to.eql(20);
        expect(this.pacman.y).to.eql(20);

      });

      it('to the right', function(){
        this.block = new Block(21, 20, 'wall', this.board);

        this.pacman.move(1, 0);

        expect(this.pacman.x).to.eql(20);
        expect(this.pacman.y).to.eql(20);

      });


      it('upward', function(){
        this.block = new Block(20, 21, 'wall', this.board);

        this.pacman.move(0, 1);

        expect(this.pacman.x).to.eql(20);
        expect(this.pacman.y).to.eql(20);

      });

      it('downward', function(){
        this.block = new Block(20, 19, 'wall', this.board);


        this.pacman.move(0, -1);

        expect(this.pacman.x).to.eql(20);
        expect(this.pacman.y).to.eql(20);

      });

    });

  });


  context('that collides with a ghost', function(){

    beforeEach(function() {
      this.board  = new Board();
      this.pacman = new Block(10, 10, 'pacman', this.board, 'alive');

    });

    context('should die', function(){

      it('when it moves to the right', function(){
        this.ghost  = new Block(11, 10, 'ghost', this.board, 'offense');
        expect(this.pacman.state).to.eql('alive');
        expect(this.ghost.state).to.eql('offense');

        this.pacman.move(1, 0);

        expect(this.pacman.state).to.eql('dead');
      });

      it('when it moves to the left', function(){

        this.ghost  = new Block(9, 10, 'ghost', this.board, 'offense');

        expect(this.pacman.state).to.eql('alive');
        expect(this.ghost.state).to.eql('offense');

        this.pacman.move(-1, 0);

        expect(this.pacman.state).to.eql('dead');
      });

      it('when it moves up', function(){

        this.ghost  = new Block(10, 9, 'ghost', this.board, 'offense');

        expect(this.pacman.state).to.eql('alive');
        expect(this.ghost.state).to.eql('offense');

        this.pacman.move(0, -1);

        expect(this.pacman.state).to.eql('dead');
      });

      it('when it moves down', function(){

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

      it('when moving left', function(){
        this.pellet = new Block(9, 10, 'pellet', this.board, 'unEaten');

        this.pacman.move(-1, 0);

        // expect(this.pellet.state).to.eql('eaten');
        expect(this.pacman.board.score).to.eql(1);

      });

      it('when moving right', function(){
        this.pellet = new Block(11, 10, 'pellet', this.board, 'unEaten');

        expect(this.board.score).to.eql(0);
        expect(this.pellet.state).to.eql('unEaten');

        this.pacman.move(1, 0);

        // expect(this.pellet.state).to.eql('eaten');
        expect(this.board.score).to.eql(1);
      });

      it('when moving up', function(){
        this.pellet = new Block(10, 9, 'pellet', this.board, 'unEaten');

        expect(this.board.score).to.eql(0);
        expect(this.pellet.state).to.eql('unEaten');

        this.pacman.move(0, -1);

        // expect(this.pellet.state).to.eql('eaten');
        expect(this.board.score).to.eql(1);
      });

      it('when moving down', function(){
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

