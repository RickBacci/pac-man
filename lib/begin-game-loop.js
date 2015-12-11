function beginGameLoop(game) {

  var canvas   = document.getElementById('game');
  var context  = canvas.getContext('2d');

  window.focus();

  requestAnimationFrame(function gameLoop(){
    context.clearRect(0,0, canvas.width, canvas.height);

    game.board.blocks.forEach(function(block) {

      if (block.type === 'wall') {

        context.fillStyle = "grey";
        context.fillRect(block.x, block.y, block.size, block.size);
      }

      if (block.type == 'pacman') {

        context.fillStyle = "yellow";
        context.fillRect(block.x, block.y, block.size, block.size);
      }

      if (block.type == 'pellet') {

        context.fillStyle = "red";
        context.fillRect(block.x, block.y, block.size, block.size);
      }
    });

    requestAnimationFrame(gameLoop);
  });

}

module.exports = beginGameLoop;
