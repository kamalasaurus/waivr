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

    this.inputs = fields.map(this.generateInput.bind(this));

    this.controller = () => this;
  }

  generateInput (opts) {
    return this.inputMap[opts['type']](opts);
  }

  generateSubmit (text = "Submit") {
    return m('div.button.submit', {onclick: this.submit.bind(this)}, text);
  }

  generateForm () {
    // modify trailing elements via form.push, beginning elements via form.unshift
    let form = this.inputs;
    form.push(this.generateSubmit());
    return form;
  }

  submit () {
    //const isValid = this.inputs.every((el) => el.isValid(); );
    //const values = this.inputs.reduce((o, el) => {
      //Object.assign(o, el.getVal());
      //return o;
    //}, {});
    //// red outlines can be conditional, but the invalid printout might
    //// flip a flag which mutates the form to indicate invalidity?
    //isValid ? console.log(values) : console.log("invalid fields!");
  }

  view (controller, args) {
    return m('form.waiver', controller.generateForm.call(controller));
  }

}

