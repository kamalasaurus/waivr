import m from 'mithril';
import CanvasComponent from './canvas-component';

export default class WaiverForm {

  constructor () {
    this.values = {
      signature: m.prop(''),
      consent:   m.prop(false),
      date:      m.prop(''),
      name:      m.prop(''),
      email:     m.prop(''),
    }

    this.controller = ()=> {
      return this;
    }
  }

  submit () {
    var values = JSON.stringify(this.values);
    var valid = Object.keys(this.values).forEach((key) => { return ~!!this.values[key] })
    console.log(values);
  }

  view (controller, args) {
    return m('form.waiver', [
      m('input[type="text"]', {onchange: m.withAttr('value', controller.values.name)}),
      m('input[type="text"]', {onchange: m.withAttr('value', controller.values.email)}),
      m('input[type="date"]', {onchange: m.withAttr('value', controller.values.date)}),
      m('input[type="checkbox"]', {onchange: m.withAttr('value', controller.values.consent)}),
      new CanvasComponent(controller.values.signature),
      m('div.button.submit', {onclick: controller.submit.bind(controller)}, "Submit Waiver"),
    ]);
  }

}

