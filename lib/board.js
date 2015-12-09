'use strict';


const Block = require('./block.js')

class Board {

  constructor(columns, rows) {
    this.columns = columns || 20;
    this.rows    = rows || 10;
    this.blocks  = [];

  }

  addBlock(x, y) {

    return new Block(this, x, y);
  }

}


module.exports = Board;
