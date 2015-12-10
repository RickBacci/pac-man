'use strict';

const chai   = require('chai');
const expect = chai.expect;

const Board  = require('../lib/board');
const Block  = require('../lib/block');


describe('Pac-man', function(){

  context('that collides with a wall', function(){

    beforeEach(function() {
      this.board  = new Board();
      this.pacman = new Block(10, 10, 'pacman', this.board, 'alive');
      this.wall   = new Block(10, 10, 'wall', this.board);

    });

    it('will not be able to move', function(){

      expect(this.pacman.x).to.eql(10);
      expect(this.pacman.y).to.eql(10);

      this.pacman.move(1, 0);

      expect(this.pacman.x).to.eql(10);
      expect(this.pacman.y).to.eql(10);

      this.pacman.move(0, 1);

      expect(this.pacman.x).to.eql(10);
      expect(this.pacman.y).to.eql(10);

      this.pacman.move(-1, 0);

      expect(this.pacman.x).to.eql(10);
      expect(this.pacman.y).to.eql(10);

      this.pacman.move(0, -1);

      expect(this.pacman.x).to.eql(10);
      expect(this.pacman.y).to.eql(10);

    });

  });


  context('that collides with a ghost', function(){

    beforeEach(function() {
      this.board  = new Board();
      this.pacman = new Block(10, 10, 'pacman', this.board, 'alive');
      this.ghost  = new Block(11, 10, 'ghost', this.board, 'offense');

    });

    context('should die', function(){

      it('when it moves to the right', function(){

        expect(this.pacman.state).to.eql('alive');
        expect(this.ghost.state).to.eql('offense');

        this.pacman.move(1, 0);

        expect(this.pacman.state).to.eql('dead');
      });

    });

  });

});

