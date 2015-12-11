const Board               = require('./board.js')
const Block               = require('./block.js')
const handleKeyPressEvent = require('./handle-key-press-event.js');
const beginGameLoop       = require('./begin-game-loop.js');

class Game {

  constructor() {
    this.state = "started";
    this.board = new Board(300, 200)

    this.block = new Block(10, 10, 'pacman', this.board, 'alive');

  }

  start() {
    handleKeyPressEvent(this);
    beginGameLoop(game);

  }

}

module.exports = Game;

let game = new Game();
game.start();

