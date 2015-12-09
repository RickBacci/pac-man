'use strict';

const chai   = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const Board  = require('../lib/board');
const Block  = require('../lib/block');


describe('Block', function(){

  beforeEach(function() {
    this.board = new Board();
  });

  it('should have a refererence to the board', function(){
    let block = new Block(this.board);

    assert.equal(block.board, this.board);
  });

  it('should have an X-coordinate', function(){
    let block = new Block(this.board, 0);

    assert.strictEqual(block.x, 0);
  });

  it('should have an Y-coordinate', function(){
    let block = new Block(this.board, 0, 0);

    assert.strictEqual(block.y, 0);
  });

  it('should be included in the board\'s array of blocks', function(){
    let block = new Block(this.board, 0, 0);

    assert.include(this.board.blocks, block);
  });

});



describe('Block', function(){

  beforeEach(function() {
    this.board = new Board();
    this.block = new Block(this.board, 10, 10);

  });

  it('that is pacman can be created', function(){

    expect(this.block.x).to.equal(10)
    expect(this.block.y).to.equal(10)
  });

  it('can move right', function(){
    this.block.move(1, 0);

    expect(this.block.x).to.eql(11);
    expect(this.block.y).to.eql(10);
  });

  it('can move left', function(){
    this.block.move(-1, 0);

    expect(this.block.x).to.eql(9);
    expect(this.block.y).to.eql(10);
  });

  it('can move up', function(){
    this.block.move(0, -1);

    expect(this.block.x).to.eql(10);
    expect(this.block.y).to.eql(9);
  });

  it('can move down', function(){
    this.block.move(0, 1);

    expect(this.block.x).to.eql(10);
    expect(this.block.y).to.eql(11);
  });
});

