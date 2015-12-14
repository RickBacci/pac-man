'use strict';


function elt(name, className) {

  let elementName = document.createElement(name);

  if (className) { elementName.className = className; }

  return elementName;

}

function DOMDisplay(parent, level) {

  this.wrap  = parent.appendChild(elt("div", "game"));
  this.level = level;

  this.wrap.appendChild(this.drawBackground());
  this.actorLayer = null;
  this.drawFrame();
}

let scale = 20;

DOMDisplay.prototype.drawBackground = function() {

  let table = elt("table", "background");

  table.style.width = this.level.width * scale + "px";

  this.level.grid.forEach(function(row) {

    let rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";

    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });

  });

  return table;

};

DOMDisplay.prototype.drawActors = function() {
  let wrap = elt("div");
  this.level.actors.forEach(function(actor) {
    let rect = wrap.appendChild(elt("div", "actor " + actor.type));

    rect.style.width  = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left   = actor.pos.x  * scale + "px";
    rect.style.top    = actor.pos.y  * scale + "px";

  });
  return wrap;

};

DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer) {
    this.wrap.removeChild(this.actorLayer);
  }

  this.actorLayer     = this.wrap.appendChild(this.drawActors());
  this.wrap.className = "game " + (this.level.status || "");

};


DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};

module.exports = DOMDisplay;
