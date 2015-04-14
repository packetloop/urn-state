'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;
const {RouteHandler, Link} = require('react-router');


const Landing = React.createClass({

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className="routeHandler landing">
        <h1>Landing</h1>

        <nav>
          <ul>
            <li>
              <Link to="menu">Menu</Link>
            </li>
            <li>
              <Link to="login">Login</Link>
            </li>
          </ul>
        </nav>


        <RouteHandler {...this.props} />
      </div>
    );
  }

});


module.exports = Landing;
