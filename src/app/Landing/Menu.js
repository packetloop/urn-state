'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;


const Menu = React.createClass({

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className="routeHandler landingMenu">
        <h1>Landing / Menu</h1>
      </div>
    );
  }

});


module.exports = Menu;
