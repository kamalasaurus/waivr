import m from 'mithril';
import InputComponent from './InputComponent';
import CanvasComponent from './CanvasComponent';

export default class WaiverForm {

  // should consume an array of objects: name, type, label
  // should be generic form, WaiverForm auto includes signature before submit
  // all append submit button
  // values and validity should be on input components, getVal() and isValid()
  // for form submission.  No more two-way for form elements.  Only one-way.
  // have form_logic and form_content directories.  form_content files should
  // export default [{} ...] with the requisite fields.
  constructor (opts = {}) {
    this.values = {
      signature: m.prop(''),
      consent:   m.prop(false),
      date:      m.prop(''),
      firstname: m.prop(''),
      lastname:  m.prop(''),
      email:     m.prop(''),
    }

    this.controller = ()=> {
      return this;
    }
  }

  submit () {
    var values = JSON.stringify(this.values);
    var valid = Object.keys(this.values).every((key) => { return !!this.values[key]; });
    console.log(values);
  }

  view (controller, args) {
    let {firstname, lastname, email, date, consent, signature} = controller.values;

    return m('form.waiver', [
      new InputComponent({type: 'text', value: firstname}),
      new InputComponent({type: 'text', value: lastname}),
      new InputComponent({type: 'text', value: email}),
      new InputComponent({type: 'date', value: date}),
      new InputComponent({type: 'checkbox', value: consent}),
      new CanvasComponent({signature}),
      m('div.button.submit', {onclick: controller.submit.bind(controller)}, "Submit Waiver"),
    ]);
  }

}

