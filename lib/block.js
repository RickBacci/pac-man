function Block (board, x, y, type) {
  this.board = board;
  this.x     = x;
  this.y     = y;
  this.type = type;

  this.board.blocks.push(this);
}

Block.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;

}


module.exports = Block;
