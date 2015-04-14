'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;


const Main = React.createClass({

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className="routeHandler appMain">
        <h1>App / Main</h1>
      </div>
    );
  }

});


module.exports = Main;
