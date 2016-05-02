import m from 'mithril';
import WaiverForm from './waiver-form';

m.route(document.body, '/', {
  '/': new WaiverForm()
});

//https://github.com/airbnb/javascript this is a good ES6+ style-guide

