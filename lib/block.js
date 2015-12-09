'use strict';

class Block {

  constructor(board, x, y, type) {
    this.board = board;
    this.x     = x;
    this.y     = y;
    this.type  = type;

    this.board.blocks.push(this);
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

}


module.exports = Block;
