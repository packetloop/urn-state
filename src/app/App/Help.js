'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;
const {UIStateMixin} = require('../../utils/Router');


const Data = require('../ui/Data');


const dataConfig = {
  helpData: {
    tab: {
      users: require('../ui/Data/Users'),
      groups: require('../ui/Data/Groups')
    }
  }
};


const Help = React.createClass({

  mixins: [PureRenderMixin, UIStateMixin],

  render: function () {
    return (
      <div className="routeHandler appHelp">
        <h1>App / Help</h1>

        <div style={{paddingBottom: '2em'}}>
          <Data uiConfig={dataConfig} tab="users" {...(this.uiState('helpData'))} />
        </div>

      </div>
    );
  }

});


module.exports = Help;
