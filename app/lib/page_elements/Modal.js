import m from 'mithril';

export default class Modal {

  constructor (content = m('div', "there's nothing here")) {
    this.content = [content];
    this.controller = () => this;
  }

  view (controller, args) {
    return m('div.modal', this.content);
  }

}

