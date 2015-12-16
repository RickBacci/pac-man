'use strict';

const CanvasDisplay  = require('./canvas_display.js');
const GAME_LEVELS    = require('./game_levels.js');
const Level          = require('./level');
const trackKeys      = require('./track_keys.js');

function runAnimation(frameFunc) {

  let lastTime = null;

  function frame(time) {

    let stop = false;

    if (lastTime !== null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }

    lastTime = time;

    if (!stop) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);

}

const arrowCodes = { 37:'left', 38:'up', 39:'right', 40:'down' };
let arrows       = trackKeys(arrowCodes);

function runLevel(level, Display, andThen) {
  level.generate();

  let display = new Display(document.body, level);

  runAnimation(function(step) {
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen) { andThen(level.status); }
      return false;
    }

  });

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
module.exports = runGame;



runGame(GAME_LEVELS, CanvasDisplay);

