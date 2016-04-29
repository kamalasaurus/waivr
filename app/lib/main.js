import m from 'mithril';

import ExampleComponent from './example-component';

m.route(document.body, '/', {
  '/': new ExampleComponent()
});
