'use strict';

const chai   = require('chai');
const expect = chai.expect;

const Board  = require('../lib/board');
const Block  = require('../lib/block');


describe('Pac-man block', function(){

  context('that collides with a wall', function(){

    beforeEach(function() {
      this.board = new Board();
      this.pacman = new Block(this.board, 10, 10, 'pacman');
      this.wall = new Block(this.board, 10, 10, 'wall');

    });

    it('will not be able to move', function(){

      expect(this.pacman.x).to.eql(10);
      expect(this.pacman.y).to.eql(10);

      this.pacman.move(1, 0);

      expect(this.pacman.x).to.eql(10);
      expect(this.pacman.y).to.eql(10);
    });

  });


  context('that collides with a ghost', function(){

    beforeEach(function() {
      this.board = new Board();
      this.block = new Block(this.board, 10, 10);

    });

    xit('should die', function(){
      let block = new Block(this.board);

      expect(block.board).to.eql(this.board);
    });


  });

});

