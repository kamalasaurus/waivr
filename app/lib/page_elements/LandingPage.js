import m from 'mithril';

export default class LandingPage {

  constructor (content = m('div', "there's nothing here")) {
    this.content = [content];
    this.controller = => this;
  }

  view (controller, args) {
    return m('div.landing-page', content);
  }

}
