'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;


const Groups = React.createClass({

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className="uiHandler dataGroups">
        <h1>Data / Groups</h1>
      </div>
    );
  }

});


module.exports = Groups;
