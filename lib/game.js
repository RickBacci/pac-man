'use strict';

const Level          = require('./level');
const DOMDisplay     = require('./dom_display.js');
const GAME_LEVELS    = require('./game_levels.js');
const trackKeys      = require('./track_keys.js');

const arrowCodes     = { 37:'left', 38:'up', 39:'right', 40:'down' };


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

let arrows = trackKeys(arrowCodes);

function runLevel(level, Display, andThen) {

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


runGame(GAME_LEVELS, DOMDisplay);

