'use strict';

const Block = require('./block.js')

class Board {

  constructor(columns, rows) {
    this.columns = columns || 20;
    this.rows    = rows || 10;
    this.blocks  = [];
    this.score   = 0;

  }

  addBlock(x, y, type, board, state) {
    return new Block(x, y, type, this);
  }

}


module.exports = Board;
