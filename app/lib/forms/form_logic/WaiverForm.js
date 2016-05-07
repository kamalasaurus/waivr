import Form from './Form';

export default class WaiverForm extends Form {
  generateForm () {
    let form = this.inputs;
    form.push(this.generateSubmit("Submit Waiver"));
    return form;
  }
}

