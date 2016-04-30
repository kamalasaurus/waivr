import m from 'mithril';

import CanvasComponent from './canvas-component';

m.route(document.body, '/', {
  '/': new CanvasComponent()
});
