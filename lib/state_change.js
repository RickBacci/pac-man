'use strict';

const $ = require('jquery');


function stateChange(msg, time) {
  setTimeout(function () {
    $("#get-ready").text(msg).show();
  }, time);

   $("#get-ready").text('');

    $("#get-ready").hide();
}


module.exports = stateChange;
