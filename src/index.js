'use strict';


require('babel-core/polyfill');
require('./utils/reset.css');
require('./utils/base.css');


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;
const {run, Route, DefaultRoute, NotFoundRoute, HashLocation,
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

const PartialRoute = React.createClass({
  render() {
    return false;
  }
});

// PartialRoute is not yet working.
// Just a proposal of declarative configuration
const DataUsers = require('./app/ui/Data/Users');
const DataGroups = require('./app/ui/Data/Groups');
const VisBar = require('./app/ui/Vis/Bar');
const VisPie = require('./app/ui/Vis/Pie');

const routes = (
  <Route handler={AppContainer}>

    <Route name="landing" path="landing" handler={Landing}>
      <Route name="login" path="login" handler={LandingLogin} />
      <Route name="menu" path="menu" handler={LandingMenu} />
    </Route>

    <Route name="app" path="app" handler={App}>

      <Route name="main" path="/app" handler={AppMain}>

        <PartialRoute group="mainData" path="tab" value="users" handler={DataUsers} />
        <PartialRoute group="mainData" path="tab" value="groups" handler={DataGroups} />

        <PartialRoute group="mainVis" path="type" value="bar" handler={VisBar} />
        <PartialRoute group="mainVis" path="type" value="pie" handler={VisPie} />

      </Route>

      <Route name="help" path="/help" handler={AppHelp}>

        <PartialRoute group="helpData" path="tab" value="users" handler={DataUsers} />
        <PartialRoute group="helpData" path="tab" value="groups" handler={DataGroups} />

      </Route>

    </Route>

    <DefaultRoute handler={Landing} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);


run(routes, HashLocation, function (Handler, state) {
  React.render(<Handler {...state} />, document.querySelector('#app'));
});
