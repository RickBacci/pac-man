function Block (board, x, y) {
  this.board = board;
  this.x     = x;
  this.y     = y;

  this.board.blocks.push(this);
}


module.exports = Block;
