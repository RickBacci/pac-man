'use strict';

const Block = require('./block.js')

class Board {

  constructor(columns, rows) {
    this.columns = columns || 20;
    this.rows    = rows || 10;
    this.blocks  = [];

  }

  addBlock(x, y, type) {
    return new Block(x, y, type, this);
  }

}


module.exports = Board;
