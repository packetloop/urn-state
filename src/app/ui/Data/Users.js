'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;


const Users = React.createClass({

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className="uiHandler dataUsers">
        <h1>Data / Users</h1>
      </div>
    );
  }

});


module.exports = Users;
