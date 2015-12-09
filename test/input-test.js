'use strict';

const chai   = require('chai');

const assert = chai.assert;

const Board  = require('../lib/board');
const Block  = require('../lib/block');

var Pacman         = require('../lib/pacman.js')
var handleMovement = require('../lib/handle-movement.js')

var expect         = require('chai').expect
  , pacman    = new Pacman(10, 10)


  describe('Pacman', function() {
    describe('moves', function(){

      beforeEach(function() {
        this.board = new Board();
      });


      it("left when the 'j' key is pressed." , function () {
        // function leftKeyWasPressed

      });

      it("right when the 'l' key is pressed." , function () {

      });

      it("up when the 'i' key is pressed." , function () {

      });

      it("down when the 'k' key is pressed." , function () {

      });
    });

  });


