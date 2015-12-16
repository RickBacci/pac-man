'use strict';

const chai   = require('chai');
const expect = chai.expect;

const Player = require('../lib/player');
const Vector = require('../lib/vector');

describe('Player', function() {

  it('has a player type', function(){
    let player = new Player(new Vector(5, 5));

    expect(player.type).to.eql('player');
  });

  context('has a Vector size', function() {

    it('with an X coordinate', function(){
      let player = new Player(new Vector(5, 10));

      expect(player.size.x).to.eql(0.7);
    });

    it('with a Y coordinate', function(){
      let player = new Player(new Vector(5, 10));

      expect(player.size.y).to.eql(0.7);
    });


  });

  context('has a Vector position', function() {

    it('with an X coordinate', function(){
      let player = new Player(new Vector(5, 5));

      expect(player.pos).to.be.an.instanceof(Vector);
      expect(player.pos.x).to.eql(5);
    });

    it('with a Y coordinate', function(){
      let player = new Player(new Vector(5, 1));

      expect(player.pos).to.be.an.instanceof(Vector);
      expect(player.pos.y).to.eql(1);
    });


  });

  context('has a Vector speed', function() {

    it('with a X coordinate of 0', function(){
      let player = new Player(new Vector(4, 0));

      expect(player.speed).to.be.an.instanceof(Vector);
      expect(player.speed.x).to.eql(0);
    });

    it('with a Y coordinate of 0', function() {
      let player = new Player(new Vector(0, 4));

      expect(player.speed).to.be.an.instanceof(Vector);
      expect(player.speed.y).to.eql(0);

    });
  });


});


