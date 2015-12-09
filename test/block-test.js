'use strict';

const chai   = require('chai');
const expect = chai.expect;

const Board  = require('../lib/board');
const Block  = require('../lib/block');


describe('Block', function(){

  context('can move', function(){

    beforeEach(function() {
      this.board = new Board();
      this.block = new Block(this.board, 10, 10);

    });

    it('to the right', function(){
      this.block.move(1, 0);

      expect(this.block.x).to.eql(11);
      expect(this.block.y).to.eql(10);
    });

    it('to the left', function(){
      this.block.move(-1, 0);

      expect(this.block.x).to.eql(9);
      expect(this.block.y).to.eql(10);
    });

    it('upward', function(){
      this.block.move(0, -1);

      expect(this.block.x).to.eql(10);
      expect(this.block.y).to.eql(9);
    });

    it('downward', function(){
      this.block.move(0, 1);

      expect(this.block.x).to.eql(10);
      expect(this.block.y).to.eql(11);
    });

  });


  context('belongs to a board', function(){

    beforeEach(function() {
      this.board = new Board();
    });

    it('should have a refererence to the board', function(){
      let block = new Block(this.board);

      expect(block.board).to.eql(this.board);
    });

    it('should have an X-coordinate', function(){
      let block = new Block(this.board, 0);

      expect(block.x).to.deep.eql(0);
    });

    it('should have an Y-coordinate', function(){
      let block = new Block(this.board, 0, 0);

      expect(block.y).to.deep.eql(0);
    });

    it('should be included in the board\'s array of blocks', function(){
      let block = new Block(this.board, 0, 0);

      expect(this.board.blocks).to.include(block);
    });

  });

});

