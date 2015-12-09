function beginGameLoop(game) {

  var canvas   = document.getElementById('game');
  var context  = canvas.getContext('2d');

  window.focus();

  requestAnimationFrame(function gameLoop(){
    context.clearRect(0,0, canvas.width, canvas.height);

    context.fillRect(game.block.x, game.block.y, 10, 10);

    requestAnimationFrame(gameLoop);
  });

}

module.exports = beginGameLoop;
