import m from 'mithril';
import InputComponent from './input_logic/InputComponent';
import DateComponent from './input_logic/DateComponent';
import CheckboxComponent from './input_logic/CheckboxComponent';
import CanvasComponent from './input_logic/CanvasComponent';

export default class Form {

  constructor (fields = []) {

    this.inputMap = {
      'text': (opts) => { return new InputComponent(opts); },
      'date': (opts) => { return new DateComponent(opts); },
      'checkbox': (opts) => { return new CheckboxComponent(opts); },
      'canvas': (opts) => { return new CanvasComponent(opts); }
    };

    var inputs = fields.map(this.generateInput.bind(this));
    console.log(inputs);
    var clone = inputs.slice(0);
    this.form = this.generateForm.call(this, clone);
    this.inputs = inputs;
    console.log(this.form);
    console.log(this.inputs);

    this.controller = () => this;
  }

  generateInput (opts) {
    return this.inputMap[opts['type']](opts);
  }

  generateSubmit (text = "Submit") {
    return m('div.button.submit', {onclick: this.submit.bind(this)}, text);
  }

  generateForm (input_dup) {
    // modify trailing elements via form.concat
    let fullform = input_dup.push(this.generateSubmit.call(this));
    return fullform;
  }

  submit () {
    const isValid = this.inputs.every((el) => {
      return el.isValid();
    });
    const values = this.inputs.reduce((o, el) => {
      console.log(el);
      Object.assign(o, el.getVal());
      return o;
    }, {});
    // red outlines can be conditional, but the invalid printout might
    // flip a flag which mutates the form to indicate invalidity?
    isValid ? console.log(values) : console.log("invalid fields!");
  }

  view (controller, args) {
    return m('form.waiver', this.form);
  }

}

