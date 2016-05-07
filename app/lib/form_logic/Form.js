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

    this.inputs = fields.map(this.generateInput);

    this.controller = ()=> {
      return this;
    }
  }

  generateInput (opts) {
    return this.inputMap[field['type']](opts);
  }

  generateSumbit (text = "Submit") {
    return m('div.button.submit', {onclick: this.submit.bind(this)}, text);
  }

  generateForm () {
    let form = this.inputs;
    //override end elements here / change submit button or something
    form.push(this.generateSubmit());
    //override beginning elements
    //form.unshift(element)
    return form;
  }

  submit () {
    const isValid = this.inputs.every((el) => el.isValid(); );
    const values = this.inputs.reduce((o, el)=> {
      const val = o.getVal();
      o[val.name] = val.value;
      return o;
    }, {});
    isValid ? console.log(values) : console.log("invalid fields!");
  }

  view (controller, args) {
    return m('form.waiver', controller.generateForm.call(controller));
  }

}
