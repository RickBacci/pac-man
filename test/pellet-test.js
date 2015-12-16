'use strict';

const chai   = require('chai');
const expect = chai.expect;

const Pellet = require('../lib/pellet.js');
const Vector = require('../lib/vector.js');

describe('Pellet', function(){

  it('has a pellet type', function(){
    let pellet = new Pellet(new Vector(10, 10));

    expect(pellet.type).to.eql('pellet');
  });

 xit('has an action', function(){
 });

  context('has a Vector position', function() {

    it('with an X coordinate', function(){
      let pellet = new Pellet(new Vector(10, 0));

      expect(pellet.pos).to.be.an.instanceof(Vector);
      expect(pellet.pos.x).to.eql(10);
    });

    it('with a Y coordinate', function(){
      let pellet = new Pellet(new Vector(0, 10));

      expect(pellet.pos).to.be.an.instanceof(Vector);
      expect(pellet.pos.y).to.eql(10);
    });


  });
});

