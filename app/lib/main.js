import m from 'mithril';

// page elements
import Nav from './page_elements/Nav';
// modal should be imported into relevant page elements, since they are dynamic
import Modal from './page_elements/Modal';
import LandingPage from './page_elements/LandingPage';

// page element content


// forms
import WaiverForm from './forms/form_logic/WaiverForm';
import ChildWaiverForm from './forms/form_logic/ChildWaiverForm';
import SignUpForm from './forms/form_logic/SignUpForm';

// TODO
// 1) figure out mithril router question mark
// 2) incorporate mocha testing
// 3) incorporate es-lint
// 4) create pdf-rendering route
// 5) create mailer route
// 6) password reset route
// 7) mongo db for pdf storage and user data; this will allow Modulus hosting service to be used

// import the content inside the logic component, they might be 1 to 1...
// form content
import WaiverFormContent from './forms/form_content/WaiverFormContent.json!';

//m.route.mode = "pathname";

// modals are better for forms on pc, but pages are better for mobile...
// is there an optimization to explore?
// login portal should be its own page; is there a way to render a modal
// depending on the client?
// yes, put the conditional on m.route(document.body, '/', {}); -> replicate routes to modals
// modals should follow a query-parameter pattern.  Maybe have a default style application if
// the route is provided through a query parameter?  What if a link is shared between the two?
// needs to redirect to the appropriate client URL :/
// so all mobile routes are base routes, since they are page oriented.  Have a ternary redirect
// if client is a pc for the requisite forms.
// Object.assign the modal routes if it's a PC
// final line should be m.route(document.body, '/', routes);

//var isNotMobile = someConditional

//var routes = { have conditional redirects in here };
//var pcmodalroutes = {};

//if (isNotMobile) Object.assign(routes, pcmodalroutes);
//m.route(document.body, '/', routes);


// modals w/ query parameters
// should have multiple navs depending on page type?
// content pages directory?  Or landing pages directory?
// fix trailing question-mark
m.route(document.getElementById('app'), '/', {
  '/':             new Nav([new LandingPage()]),
  '/waiver':       new Nav([new WaiverForm(WaiverFormContent)]),
  '/child_waiver': new Nav([new ChildWaiverForm(WaiverFormContent)]),
  '/sign_up':      new Nav([new SignUpForm(WaiverFormContent)]),
  /*'/password_reset': new Nav([new PasswordResetForm(PasswordResetFormContent)]),*/
});

//https://github.com/airbnb/javascript this is a good ES6+ style-guide

