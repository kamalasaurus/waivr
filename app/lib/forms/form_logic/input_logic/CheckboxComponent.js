import m from 'mithril';
import InputComponent from './InputComponent';

export default class CheckboxComponent extends InputComponent {

  // might not be necessary to have a separate class for this, css should
  // handle the differences primarily, right?
  isValid () {
    return !!this.value();
  }

}

