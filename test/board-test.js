'use strict';

const chai   = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const Board  = require('../lib/board');
const Block  = require('../lib/block');

describe('Board', function(){

 it('should instantiate a new board', function(){
   let board = new Board();

   assert.isObject(board);
 });

 it('should have columns based on the first argument', function(){
   let board = new Board(20);
   assert.equal(20, board.columns)
 });

 it('should have rows based on the second argument', function(){
   let board = new Board(20, 20);
   assert.equal(20, board.rows)
 });

 it('should default to 20 columns', function(){
   let board = new Board();

   assert.equal(20, board.columns);
 });

 it('should default to 10 rows', function(){
   let board = new Board();

   assert.equal(10, board.rows);

 });

 it('should start with an empty array of blocks', function(){
   let board = new Board();

   assert.isArray(board.blocks);
 });


  describe('addBlock', function(){
    it('should add a block to the board', function(){
      let board = new Board();

      let block = board.addBlock(5,6);

      assert.include(board.blocks, block);
      assert.equal(block.x, 5);
      assert.equal(block.y, 6);
    });

  });

});
