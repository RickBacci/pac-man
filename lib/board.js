const Block = require('./block.js')

function Board(columns, rows) {
  this.columns = columns || 20;
  this.rows    = rows || 10;
  this.blocks  = [];

}

Board.prototype.addBlock = function (x, y) {
  return new Block(this, x, y);
}


module.exports = Board;
