'use strict';

const Level         = require('./level.js');
const CanvasDisplay = require('./canvas_display.js');

let arrowCodes = {
  37: "left",
  38: "up",
  39: "right"

};

let pacmanBoard = [
  "         ",
  "  wwwww  ",
  "  wooow  ",
  "  wPwow  ",
  "  wooow  ",
  "  wwwww  ",
  "         "
];


function trackKeys(codes) {
  let pressed = Object.create(null);
  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      let down = event.type === "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }

  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);

  return pressed;

}

function runGame(plans, Display) {

  function startLevel(n) {

    runLevel(new Level(plans[n]), Display, function(status) {
      if (status === "lost") {
        startLevel(n);
      } else if (n < plans.length - 1) {
        startLevel(n + 1);
      } else {
       console.log("You win!");
      }

    });

  }
  startLevel(0);

}


function runAnimation(frameFunc) {

  let lastTime = null;

  function frame(time) {

    let stop = false;

    if (lastTime !== null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      stop         = frameFunc(timeStep) === false;
    }

    lastTime = time;

    if (!stop) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);

}

let arrows = trackKeys(arrowCodes);

function runLevel(level, Display, andThen) {

  let display = new Display(document.body, level);

  runAnimation(function(step) {

    level.animate(step, arrows);

    display.drawFrame(step);

    if (level.isFinished()) {
      display.clear();
      if (andThen) {
        andThen(level.status);
        // possible that return false is in the wrong spot
      }
      return false;
    }

  });

}


 let simpleLevel = new Level(pacmanBoard);
 runGame(simpleLevel, new CanvasDisplay('document.body', 0));

