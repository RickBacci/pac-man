function Pacman(board, x, y) {
  this.board = board;
  this.x = x;
  this.y = y;

}

Pacman.prototype.move = function (x, y) {

  this.x += x;
  this.y += y;

}


module.exports = Pacman;
