'use strict';

const Board  = require('./board.js')
const Block  = require('./block.js')
const handleKeyPressEvent = require('./handle-key-press-event.js');
const beginGameLoop = require('./begin-game-loop.js');

class Game {

  constructor() {
    // super();
    this.state  = "started";
    this.board  = new Board(300, 200)
    this.block  = new Block(this.board, 10, 10, 'pacman');
  }

  start() {
    handleKeyPressEvent(this);

  }


  keyWasPressed(event) {

    switch (event.keyCode) {
      case 73:
        this.block.move(0, -1);
        console.log(this.block);
        return console.log('moved up')

        break;

      case 74:
        this.block.move(-1, 0);
        console.log(this.block);
        return console.log('moved left')
        break;

      case 75:
        this.block.move(0, 1);
        console.log(this.block);
        return console.log('moved down')
        break;

      case 76:
        this.block.move(1, 0);
        console.log(this.block);
        return console.log('moved right')
        break;
    }

  }

}

module.exports = Game;

let game = new Game();
game.start();
beginGameLoop(game);

