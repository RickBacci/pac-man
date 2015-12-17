'use strict';


const CanvasDisplay  = require('./canvas_display.js');
const GAME_LEVELS    = require('./game_levels.js');
const Level          = require('./level');
const trackKeys      = require('./track_keys.js');
const $              = require('jquery');
const stateChange    = require('./state_change.js');

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

      if (status === "in-progress") {
        startLevel(n);
      } else if (status === 'lost') {
        stateChange('Game Over');

        let lives = document.getElementById('player-lives');
        lives.innerText = 'Lives: 3';
        let score = document.getElementById('player-score');
        score.innerText = 0;
        $('#get-ready').hide();
        $('#player-lives').show();

        startLevel(0);

      } else if (n < plans.length - 1) {
        startLevel(n + 1);
      } else {
        stateChange('You win!');
      }

    });

  }
  startLevel(0);

}

$(document).ready(function() {
  let canvas =  document.getElementById('board');

  this.cx = canvas.getContext("2d");

  $('#board').hide();
  $('#player-score').hide();
  $('#get-ready').hide();

  $('#outer').on('click', function () {
    $("#landing").hide();
    $('#board').show();
    $('#player-score').show();

  stateChange('Get Ready!', 0);
  stateChange('', 3000);

  });


});

runGame(GAME_LEVELS, CanvasDisplay);

module.exports = runGame;


