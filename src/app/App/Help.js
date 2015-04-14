'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;


const Help = React.createClass({

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className="routeHandler appHelp">
        <h1>App / Help</h1>
      </div>
    );
  }

});


module.exports = Help;
