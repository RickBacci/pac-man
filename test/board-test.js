'use strict';

const chai   = require('chai');
const expect = chai.expect;

const Board  = require('../lib/board');
const Block  = require('../lib/block');

describe('Board', function(){

  context('when created', function(){
    it('should instantiate a new board', function(){
      let board = new Board();

      expect(board).to.be.instanceOf(Board)
    });

    it('should have columns based on the first argument', function(){
      let board = new Board(30);

      expect(board.columns).to.eql(30);
    });

    it('should have rows based on the second argument', function(){
      let board = new Board(30, 30);

      expect(board.rows).to.eql(30);
    });

    it('should default to 20 columns', function(){
      let board = new Board();

      expect(board.columns).to.eql(20);
    });

    it('should default to 10 rows', function(){
      let board = new Board();

      expect(board.rows).to.eql(10);
    });

    it('should start with an empty array of blocks', function(){
      let board = new Board();

      expect(board.blocks).to.be.an.array
    });

  });


  describe('addBlock', function(){
    it('should add a block to the board', function(){
      let board = new Board();

      let block = board.addBlock(5,6);

      expect(board.blocks).to.include(block);
      expect(block.x).to.eql(5);
      expect(block.y).to.eql(6);
    });

  });

});
