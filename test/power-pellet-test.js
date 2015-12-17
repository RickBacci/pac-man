'use strict';

const chai   = require('chai');
const expect = chai.expect;

const PowerPellet = require('../lib/power_pellet.js');
const Vector = require('../lib/vector.js');

describe('PowerPellet', function(){

  it('has a powerPellet type', function(){
    let powerPellet = new PowerPellet(new Vector(10, 10));

    expect(powerPellet.type).to.eql('powerPellet');
  });

  xit('has an action', function(){
    // can of whoop-ass
  });

  context('has a Vector position', function() {

    it('with an X coordinate', function(){
      let powerPellet = new PowerPellet(new Vector(10, 10));

      expect(powerPellet.pos).to.be.an.instanceof(Vector);
      expect(powerPellet.pos.x).to.eql(10);
    });

    it('with a Y coordinate', function(){
      let powerPellet = new PowerPellet(new Vector(10, 10));

      expect(powerPellet.pos).to.be.an.instanceof(Vector);
      expect(powerPellet.pos.y).to.eql(10);
    });


  });
});

