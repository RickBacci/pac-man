function keyWasPressed(event) {

  switch (event.keyCode) {
    case 73:
      upKeyWasPressed();
      break;

    case 74:
      leftKeyWasPressed();
      break;

    case 75:
      downKeyWasPressed();
      break;

    case 76:
      rightKeyWasPressed();
      break;
  }

}


function upKeyWasPressed() {
  return console.log('move up')
}


function leftKeyWasPressed() {
  return console.log('move left')
}


function downKeyWasPressed() {
  return console.log('move down')
}

function rightKeyWasPressed() {
  return console.log('move right')
}

function handleMovement() {

  document.addEventListener("keydown", function () {
    keyWasPressed(event);
  });

}

module.exports = handleMovement;
