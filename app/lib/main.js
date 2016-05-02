import m from 'mithril';

import WaiverForm from './waiver-form';

m.route(document.body, '/', {
  '/': new WaiverForm()
});

