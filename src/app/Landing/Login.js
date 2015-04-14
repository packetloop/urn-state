'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;


const Login = React.createClass({

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className="routeHandler landingLogin">
        <h1>Landing / Login</h1>
      </div>
    );
  }

});


module.exports = Login;
