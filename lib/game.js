var canvas  = document.getElementById('game');
var context = canvas.getContext('2d');





requestAnimationFrame(function gameLoop(){
  context.clearRect(0,0, canvas.width, canvas.height);

  context.fillRect(20, 20, 10, 10);

  requestAnimationFrame(gameLoop);
});

