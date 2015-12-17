'use strict';

const chai   = require('chai');
const expect = chai.expect;

const Vector = require('../lib/vector.js');


describe('Vector', function(){

  it('should have an x coordinate', function(){
    let vector = new Vector(1,5);

    expect(vector.x).to.eql(1);

  });

  it('should have an y coordinate', function(){
    let vector = new Vector(5,50);

    expect(vector.y).to.eql(50);

  });

  it('can add another vector', function(){
    let vector      = new Vector(20, 20);
    let otherVector = new Vector(5, 5);

    let newVector   = vector.plus(otherVector)

    expect(newVector).to.eql(new Vector(25, 25));
  });

  it('can multiply another vector', function(){
    let vector      = new Vector(10, 10);

    let newVector   = vector.times(5);

    expect(newVector).to.eql(new Vector(50, 50));
  });


});
