import m from 'mithril';

export default class InputComponent {

  constructor (opts = {}) {
    this.opts = opts;

    this.controller = ()=> {
      return this;
    }
  }

  view (controller, args) {
    const {type, value, placeholder, twoway} = controller.opts; //value is an m.prop()
    let props = {onchange: m.withAttr('value', value)};

    placeholder ? props[placeholder] = placeholder : void 0;
    twoway      ? props['value'] = value()         : void 0;

    return m('div.container', [
      m(`input[type=${type}]`, props),
    ]);
  }
}

