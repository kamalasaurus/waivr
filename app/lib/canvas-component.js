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

  getSignature() {
    return this.signature;
  }

  down(e) {
    e.preventDefault();
    this.tapped = true;
    return false;
  }

  move(e) {
    e.preventDefault();
    if (!this.tapped) return;

    if (e.type === 'touchmove') {
      var cX = e.touches[0].clientX;
      var cY = e.touches[0].clientY;
    } else {
      var cX = e.clientX;
      var cY = e.clientY;
    }

    var rect   = this.canvas.getBoundingClientRect();
    var x      = (cX - rect.left) / (rect.right - rect.left) * this.canvas.width;
    var y      = (cY - rect.top) / (rect.bottom - rect.top) * this.canvas.height;

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
    e.preventDefault();
    this.tapped    = false;
    this.prevX     = null;
    this.prevY     = null;
    this.signature = this.canvas.toDataURL('image/png');
    return false;
  }

  drawCanvas(element, isInitialized, args) {
    if (isInitialized) return;
    this.canvas            = element;
    this.context           = element.getContext('2d');
    this.context.lineWidth = 3;

    // have to manually add touch events because mithril doesn't recognize them :(
    // probably have to manually remove to prevent memory leak if someone spams
    // refresh, but it's a really minor issue so (shrug), mithril doesn't have a
    // remove hook that I can find easily
    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', this.down.bind(this));
      element.addEventListener('touchmove',  this.move.bind(this));
      element.addEventListener('touchend',   this.up.bind(this));
    }
  }

  drawClear(element, isInitialized, args) {
    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', this.clear.bind(this));
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.signature = null;
  }

  view(controller, args /*passed in as object when instantiated*/) {
    return m('div.signature', [
      m('div.placeholder', "x"),
      m('canvas.signature[width="400"][height="250"]', {
        onmousedown: controller.down.bind(controller),
        onmousemove: controller.move.bind(controller),
        onmouseup:   controller.up.bind(controller),
        config:      controller.drawCanvas.bind(controller)
      }),
      m('div.clear-signature',  {
        onmousedown: controller.clear.bind(controller),
        config:      controller.drawClear.bind(controller)
      }, [
        m('div.fa.fa-times-circle-o')
      ], " clear")
    ]);
  }
}

