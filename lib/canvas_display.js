'use strict';


let pacmanBoard = [ "         ",
  "  wwwww  ",
  "  wooow  ",
  "  wPwow  ",
  "  wooow  ",
  "  wwwww  ",
  "         "
];

class CanvasDisplay {

  constructor(parent, level) {
    this.canvas        = document.createElement("canvas");

    this.canvas.width  = Math.min(600, level.width * scale);
    this.canvas.height = Math.min(450, level.height * scale);

    parent.appendChild(this.canvas);

    this.context       = this.canvas.getContext("2d");

    this.level         = level;
    this.animationTime = 0;
    this.flipPlayer    = false;

    this.viewport      = {
      left:   0,
      top:    0,
      width:  this.canvas.width / scale,
      height: this.canvas.height / scale

    };

    this.drawFrame(0);
  }

  clear() {
    this.canvas.parentNode.removeChild(this.canvas);

  }

  drawFrame(step) {
    // this.animationTime += step;

    this.updateViewport();
    this.clearDisplay();
    this.drawBackground();
    this.drawActors();

  }

  updateViewport() {

    let view    = this.viewport, margin = view.width / 3;
    let player  = this.level.player;
    let center  = player.position.plus(player.size.times(0.5));

    if (center.x < view.left + margin) {
      view.left = Math.max(center.x - margin, 0);
    } else if (center.x > view.left + view.width - margin) {
      view.left = Math.min(center.x + margin - view.width,
                           this.level.width - view.width);
    }

    if (center.y < view.top + margin) {
      view.top  = Math.max(center.y - margin, 0);
    } else if (center.y > view.top + view.height - margin) {
      view.top  = Math.min(center.y + margin - view.height,
                           this.level.height - view.height);
    }

  }

  clearDisplay() {

    if (this.level.status === "won") {
      this.context.fillStyle = "rgb(68, 191, 255)";
    } else if (this.level.status === "lost") {
      this.context.fillStyle = "rgb(44, 136, 214)";
    } else {
      this.context.fillStyle = "rgb(52, 166, 251)";
    }

    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

  }

  let otherSprites = document.createElement("img");
  therSprites.src = "img/sprites.png";

  drawBackground() {
    let view   = this.viewport;
    let xStart = Math.floor(view.left);
    let xEnd   = Math.ceil(view.left + view.width);
    let yStart = Math.floor(view.top);
    let yEnd   = Math.ceil(view.top + view.height);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {

        let tile = this.level.grid[y][x];

        if (tile === null) { continue; }

        let screenX = (x - view.left) * scale;
        let screenY = (y - view.top) * scale;
        // let tileX   = tile == "lava" ? scale : 0;
        let tileX   = 0;

        this.context.drawImage(otherSprites, tileX, 0, scale, scale, screenX, screenY, scale, scale);
      }

    }

  }

  let playerSprites  = document.createElement("img");
  playerSprites.src  = "img/player.png";
  let playerXOverlap = 4;

  drawPlayer(x, y, width, height) {
    let sprite = 8, player = this.level.player;

    width += playerXOverlap * 2;
    x     -= playerXOverlap;

    if (player.speed.x !== 0) {
      this.flipPlayer = player.speed.x < 0;
    }

    if (player.speed.y !== 0) {
      sprite = 9;
    } else if (player.speed.x !== 0) {
      sprite = Math.floor(this.animationTime * 12) % 8;
    }

    this.context.save();

    if (this.flipPlayer) {
      flipHorizontally(this.context, x + width / 2);
    }

    this.context.drawImage(playerSprites, sprite * width, 0, width, height, x, y, width, height);

    this.context.restore();
  }

  drawActors() {
    this.level.actors.forEach( function(actor) {

      let width  = actor.size.x * scale;
      let height = actor.size.y * scale;

      let x      = (actor.position.x - this.viewport.left) * scale;
      let y      = (actor.position.y - this.viewport.top)  * scale;

      if (actor.type === "player") {

        this.drawPlayer(x, y, width, height);
      } else {

        let tileX = ( actor.type === "pellet" ? 2 : 1 ) * scale;

        this.context.drawImage(otherSprites, tileX, 0, width, height, x, y, width, height);
      }

    }, this);
  }

}

