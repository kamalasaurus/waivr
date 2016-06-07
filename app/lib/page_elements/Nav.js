import m from 'mithril';

export default class Nav {

  constructor (contents = []) {
    // contents must be m() components
    this.contents = contents;
    this.controller = () => this;
  }

  view (controller, args) {
    return m('div.app', [m('nav.main-nav')].concat(controller.contents));
  }

}

