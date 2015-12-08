var Pacman = require('../lib/pacman.js')
var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

describe('Testing', function() {
  it('should work', function () {

    expect(foo).to.be.a('string');
    expect(foo).to.equal('bar');
    expect(foo).to.have.length(3);
    expect(beverages).to.have.property('tea').with.length(3);

  });

});

describe('Pac-man', function(){
  it('can exist', function(){

    var pacman = new Pacman(10, 10)

    expect(pacman.x).to.equal(10)
    expect(pacman.y).to.equal(10)
  });

  it('can move to the right', function(){
    var pacman = new Pacman(10, 10)

    expect(pacman.x).to.eql(11);
    expect(pacman.y).to.eql(10);
  });
});




