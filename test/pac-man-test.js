var Pacman         = require('../lib/pacman.js')
var handleMovement = require('../lib/handle-movement.js')
var expect         = require('chai').expect
  , pacman         = new Pacman(10, 10)
  // , beverages      = { tea: [ 'chai', 'matcha', 'oolong' ] };



describe('Pac-man', function(){
  it('can exist', function(){

    var pacman = new Pacman(10, 10)

    expect(pacman.x).to.equal(10)
    expect(pacman.y).to.equal(10)
  });

  it('can move right', function(){
    var pacman = new Pacman(10, 10)

    pacman.move(1, 0);

    expect(pacman.x).to.eql(11);
    expect(pacman.y).to.eql(10);
  });

  it('can move left', function(){
    var pacman = new Pacman(10, 10)

    pacman.move(-1, 0);

    expect(pacman.x).to.eql(9);
    expect(pacman.y).to.eql(10);
  });

  it('can move up', function(){
    var pacman = new Pacman(10, 10)

    pacman.move(0, -1);

    expect(pacman.x).to.eql(10);
    expect(pacman.y).to.eql(9);
  });

  it('can move down', function(){
    var pacman = new Pacman(10, 10)

    pacman.move(0, 1);

    expect(pacman.x).to.eql(10);
    expect(pacman.y).to.eql(11);
  });

});


