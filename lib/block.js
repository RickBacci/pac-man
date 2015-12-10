'use strict';

class Block {

  constructor(x, y, type, board) {
    // todo: change this to use a hash
    this.size   = 10;
    this.board  = board;
    this.x      = x;
    this.y      = y;
    this.type   = type || 'empty';

    this.top    = y;
    this.bottom = y + this.size
    this.left   = x;
    this.right  = x + this.size;

    this.board.blocks.push(this);

  }

  move(x, y) {

    if(this.noCollision()) {
      // need to search through the blocks that are on the board

      // pacmans bottom edge is higher than the blocks top edge.
      // pacmans top edge is lower than the blocks bottom edge.
      // pacmans left edge is to the right of the blocks right edge.
      // pacmans right edge is to the left of the blocks left edge.

      this.x += x;
      this.y += y;

    }

  }

  noCollision() {

    let pacman  = this;
    let blocks  = this.board.blocks;

    for (var i = 0, l = blocks.length; i < l; i++) {
      var block = blocks[i];

      if (pacman.x === block.x && block.type !== 'pacman') {
        console.log('collision detected');
        return false

      }

    }

    return true;

  }

}


module.exports = Block;
