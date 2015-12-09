var canvas         = document.getElementById('game');
var context        = canvas.getContext('2d');

var handleMovement = require('../lib/handle-movement.js')

// new Game function

// Game.prototype.state
// Game.prototype.start

handleMovement();

requestAnimationFrame(function gameLoop(){
  context.clearRect(0,0, canvas.width, canvas.height);

  context.fillRect(20, 20, 10, 10);

  requestAnimationFrame(gameLoop);
});

