function handleKeyPressEvent(_this) {

  document.addEventListener('keydown', function(event) {
    _this.keyWasPressed(event);
  });

}

module.exports = handleKeyPressEvent;



