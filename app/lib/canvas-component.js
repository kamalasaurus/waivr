import m from 'mithril';

export default class CanvasComponent {

  constructor() {
    this.signature = null;
    this.canvas    = null;
    this.context   = null;

    this.tapped    = false;
    this.isDrawn   = false;

    this.prevX = null;
    this.prevY = null;

    this.controller = ()=> {
      return this;
    }
  }

  down(e) {
    this.tapped = true;
    return false;
  }

  move(e) {
    if (!this.tapped) return;

    var rect   = this.canvas.getBoundingClientRect();
    var x      = e.clientX - rect.left;
    var y      = e.clientY - rect.top;

    if (!Number.isFinite(this.prevX) || !Number.isFinite(this.prevY)) {
      var pX = x;
      var pY = y;
    } else {
      var pX = this.prevX;
      var pY = this.prevY;
    }

    this.context.beginPath();
    this.context.moveTo(pX, pY);
    this.context.lineTo(x, y);
    this.context.stroke();

    this.prevX = x;
    this.prevY = y;
    return false;
  }

  up(e) {
    this.tapped    = false;
    this.prevX     = null;
    this.prevY     = null;
    this.signature = this.canvas.toDataURL('image/png');
    return false;
  }

  draw(element, isInitialized, args) {
    if (isInitialized) return;
    this.canvas            = element;
    this.context           = element.getContext('2d');
    this.context.lineWidth = 3;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  view(controller, args /*passed in as object when instantiated*/) {
    return m('canvas.signature[width="400"][height="250"]', {
      onmousedown: controller.down.bind(controller),
      onmousemove: controller.move.bind(controller),
      onmouseup:   controller.up.bind(controller),
      config:      controller.draw.bind(controller)
    });
  }
}

