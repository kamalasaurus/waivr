import m from 'mithril';

export default class InputComponent {

  constructor (opts = {}) {
    this.opts = opts;
    this.value = m.prop('');

    this.controller = ()=> {
      return this;
    }
  }

  isValid () {
    return !!this.value;
  }

  getVal () {
    return { this.opts.name : this.value() };
  }

  view (controller, args) {
    const {type, placeholder, label} = controller.opts;
    let props = {onchange: m.withAttr('value', controller.value)};

    placeholder ? props[placeholder] = placeholder : void 0;
    //twoway      ? props['value'] = value()         : void 0;

    return m('div.container', [
      m(`input[type=${type}]`, props),
      m('label', label)
    ]);
  }
}

