function handleKeyPressEvent(_this) {

  // todo: learn more about bind(this)
  document.addEventListener('keydown', function(event) {
    keyWasPressed(event, _this);
  }.bind(this));

}

function keyWasPressed(event, _this) {

  switch (event.keyCode) {
    case 73:
      _this.block.move(0, -1);
      console.log(_this.block);
      break;

    case 74:
      _this.block.move(-1, 0);
      console.log(_this.block);
      break;

    case 75:
      _this.block.move(0, 1);
      console.log(_this.block);
      break;

    case 76:
      _this.block.move(1, 0);
      console.log(_this.block);
      break;
  }

}


module.exports = handleKeyPressEvent;

