import m from 'mithril';

export default class CanvasComponent {

  constructor (opts = {}) {

    this.opts = opts;

    this.value   = m.prop('');
    this.canvas  = null;
    this.context = null;

    this.tapped  = false;
    this.isDrawn = false;

    this.prevX = null;
    this.prevY = null;

    this.controller = () => this;
  }

  down (e) {
    // prevent screen drag, enable drawing
    e.preventDefault();
    this.tapped = true;
    return this;
  }

  move (e) {
    e.preventDefault();
    if (!this.tapped) return;

    // starting conditions
    var isTouch      = e.type === 'touchmove';
    var isFirstTouch = (!Number.isFinite(this.prevX) || !Number.isFinite(this.prevY));
    var rect   = this.canvas.getBoundingClientRect();

    // position on screen
    var cX = isTouch ? e.touches[0].clientX : e.clientX;
    var cY = isTouch ? e.touches[0].clientY : e.clientY;

    // previous position on canvas
    var pX = isFirstTouch ? x : this.prevX;
    var pY = isFirstTouch ? y : this.prevY;

    // position on canvas, normalize for style size and declared size of canvas
    var x = (cX - rect.left) / (rect.right - rect.left) * this.canvas.width;
    var y = (cY - rect.top) / (rect.bottom - rect.top) * this.canvas.height;

    // draw line from previous position to current position
    this.context.beginPath();
    this.context.moveTo(pX, pY);
    this.context.lineTo(x, y);
    this.context.stroke();

    // set current value for the next previous value
    this.prevX = x;
    this.prevY = y;
    return this;
  }

  up (e) {
    // disable drawing, clear conditions, write signature as image data in prop
    e.preventDefault();
    this.tapped    = false;
    this.prevX     = null;
    this.prevY     = null;
    this.value(this.canvas.toDataURL('image/png'));
    return this;
  }

  drawCanvas (element, isInitialized, args) {
    if (isInitialized) return;
    // enable access to DOM element after rendering, configure context properties
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

  drawClear (element, isInitialized, args) {
    // enable touch interaction for clear button, might be simpler if it was button, not div
    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', this.clear.bind(this));
    }
  }

  clear () {
    // clear canvas contents, erase signature data
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.value('');
    return this;
  }

  isValid () {
    return !!this.value();
  }

  getVal () {
    return {
      [this.opts.name] : this.value()
    };
  }

  view (controller, args /*passed in as object when instantiated*/) {
    return m('div.signature', [
      m('div.placeholder', [
        m('div.placeholder-line', "x")
      ]),
      m('canvas.signature[width="400"][height="250"]', {
        onmousedown: controller.down.bind(controller),
        onmousemove: controller.move.bind(controller),
        onmouseup:   controller.up.bind(controller),
        config:      controller.drawCanvas.bind(controller)
      }),
      m('div.clear-container', [
        m('div.button.clear-signature',  {
          onmousedown: controller.clear.bind(controller)
        }, " clear")
      ]),
    ]);
  }
}

