import m from 'mithril';
import WaiverForm from './WaiverForm';

// eventually of the form new Nav(new PageElement())
// modals w/ query parameters
// fix trailing question-mark
m.route(document.body, '/', {
  '/': new WaiverForm()
});

//https://github.com/airbnb/javascript this is a good ES6+ style-guide

