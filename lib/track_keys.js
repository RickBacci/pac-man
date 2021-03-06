'use strict';

function trackKeys(codes) {

  let pressed = Object.create(null); function handler(event) {

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


module.exports = trackKeys;

