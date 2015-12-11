'use strict';

class Block {

  constructor(x, y, type, board, state) {
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
    this.state  = state || '';

    this.board.blocks.push(this);

  }

  move(x, y) {

    let nextX = this.x += x;
    let nextY = this.y += y;

    let nextPosition = this.nextPosition(nextX, nextY);

    if(nextPosition === 'empty') {

      this.x += x;
      this.y += y;

    } else if(nextPosition === 'wall') {

      nextX = this.x -= x;
      nextY = this.y -= y;

    } else if (nextPosition === 'pellet') {

      this.board.score += 1;
      this.state = 'eaten';

    } else if (nextPosition === 'ghost') {

      this.state = 'dead'

    }

  }

  nextPosition(nextX, nextY) {

    let pacman       = this;
    let blocks       = this.board.blocks;
    let nextLocation = '';

    for (var i = 0, l = blocks.length; i < l; i++) {

      var block      = blocks[i];
      var block_type = block.type;

      if (block.type !== 'pacman') {

        if (nextX === block.x && nextY === block.y) {

          switch (block_type) {

            case 'empty':
              return 'empty';
              break;

            case 'wall':
              return 'wall';
              break;

            case 'ghost':
              return 'ghost';
              break;

            case 'pellet':
              return 'pellet';
              break;

          }

        }

      }

    }

  }

}


module.exports = Block;
