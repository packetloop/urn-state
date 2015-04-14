'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;


const Bar = React.createClass({

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className="uiHandler visBar">
        <h1>Vis / Bar</h1>
      </div>
    );
  }

});


module.exports = Bar;
