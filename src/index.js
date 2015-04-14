'use strict';


require('babel-core/polyfill');
require('./utils/reset.css');
require('./utils/base.css');


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;
const {run, Route, DefaultRoute, NotFoundRoute, HistoryLocation,
  RouteHandler, Link} = require('./utils/Router');


const NotFound = React.createClass({
  render() {
    return <h1>404. Not Found</h1>;
  }
});


const App = require('./app/App');
const AppMain = require('./app/App/Main');
const AppHelp = require('./app/App/Help');

const Landing = require('./app/Landing');
const LandingLogin = require('./app/Landing/Login');
const LandingMenu = require('./app/Landing/Menu');


const AppContainer = React.createClass({


  mixins: [PureRenderMixin],


  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="landing">Landing</Link>
            </li>
            <li>
              <Link to="app">App</Link>
            </li>
          </ul>
        </nav>

        <RouteHandler {...this.props} />
      </div>
    );
  }
});


const routes = (
  <Route handler={AppContainer}>

    <Route name="landing" path="landing" handler={Landing}>
      <Route name="login" path="login" handler={LandingLogin} />
      <Route name="menu" path="menu" handler={LandingMenu} />
    </Route>

    <Route name="app" path="app" handler={App}>
      <Route name="main" path="/app" handler={AppMain} />
      <Route name="help" path="/help" handler={AppHelp} />
    </Route>

    <DefaultRoute handler={Landing} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);


run(routes, HistoryLocation, function (Handler, state) {
  React.render(<Handler {...state} />, document.querySelector('#app'));
});
