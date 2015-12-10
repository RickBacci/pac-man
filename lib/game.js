'use strict';

const Board               = require('./board.js')
const Block               = require('./block.js')
const handleKeyPressEvent = require('./handle-key-press-event.js');
const beginGameLoop       = require('./begin-game-loop.js');

class Game {

  constructor() {
    // super();
    this.state  = "started";
    this.board  = new Board(300, 200)

    this.block  = new Block(10, 10, 'pacman', this.board, 'alive');

    this.wall   = new Block(11, 10, 'wall', this.board, 'wall');
    this.ghost  = new Block(10, 9, 'ghost', this.board, 'offense');
    this.pellet = new Block(10, 11, 'pellet', this.board, 'unEaten' );

    this.board.blocks.forEach(function(block) { console.log(block) });
  }

  start() {
    handleKeyPressEvent(this);
    beginGameLoop(game);

  }

}

module.exports = Game;

let game = new Game();
game.start();

