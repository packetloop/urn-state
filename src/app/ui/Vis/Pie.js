'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;


const Pie = React.createClass({

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className="uiHandler visPie">
        <h1>Vis / Pie</h1>
      </div>
    );
  }

});


module.exports = Pie;
