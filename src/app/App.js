'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;
const {RouteHandler, Link} = require('react-router');


const App = React.createClass({

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className="routeHandler app">
        <h1>App</h1>

        <nav>
          <ul>
            <li>
              <Link to="main">Main</Link>
            </li>
            <li>
              <Link to="help">Help</Link>
            </li>
          </ul>
        </nav>

        <RouteHandler {...this.props} />
      </div>
    );
  }

});


module.exports = App;
