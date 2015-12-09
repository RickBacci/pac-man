'use strict';

const chai   = require('chai');
const expect = require('chai').expect

const Block  = require('../lib/block.js');
const Game = require('../lib/game.js')


  describe('Pac-man', function() {
    describe('moves', function(){

      beforeEach(function() {
        this.game = new Game();
        this.game.start();
      });


      it("left when the 'j' key is pressed." , function () {
        this.game.keyWasPressed(74);

        expect(this.game.block.x).to.eql(9);
      });

      it("right when the 'l' key is pressed." , function () {
        this.game.keyWasPressed(76);

        expect(this.game.block.x).to.eql(11);
      });

      it("up when the 'i' key is pressed." , function () {
        this.game.keyWasPressed(73);

        expect(this.game.block.y).to.eql(9);
      });

      it("down when the 'k' key is pressed." , function () {
        this.game.keyWasPressed(75);

        expect(this.game.block.y).to.eql(11);
      });

    });

  });


