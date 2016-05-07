import m from 'mithril';
import Nav from './page_elements/Nav';

// modals are better for forms on pc, but pages are better for mobile...
// is there an optimization to explore?
// login portal should be its own page; is there a way to render a modal
// depending on the client?
// yes, put the conditional on m.route(document.body, '/', {}); -> replicate routes to modals
// modals should follow a query-parameter pattern.  Maybe have a default style application if
// the route is provided through a query parameter?  What if a link is shared between the two?
// needs to redirect to the appropriate client URL :/
import WaiverForm from './forms/form_logic/WaiverForm';
import ChildWaiverForm from './forms/form_logic/ChildWaiverForm';
import SignUpForm from './forms/form_logic/SignUpForm';

import WaiverFormContent from './forms/form_content/WaiverFormContent.json';

// modals w/ query parameters
// have a page elements directory with nav, modal, landing
// should have multiple navs depending on page type?
// content pages directory?  Or landing pages directory?
// fix trailing question-mark
m.route(document.body, '/', {
  '/':             new Nav(),
  '/waiver':       new Nav([new WaiverForm(WaiverFormContent)]),
  '/child_waiver': new Nav([new ChildWaiverForm(WaiverFormContent)]),
  '/sign_up':      new Nav([new SignUpForm(WaiverFormContent)]),
});

//https://github.com/airbnb/javascript this is a good ES6+ style-guide

