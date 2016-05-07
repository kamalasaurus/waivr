import m from 'mithril';
import InputComponent from './InputComponent';

export default class DateComponent extends InputComponent {

  //need this to be a birthday component?  Is valid if birthday > 18 years?
  isValid () {
    return !!this.value();
  }

}

