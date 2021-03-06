'use strict';


const React = require('react/addons');
const {addons: {PureRenderMixin}} = React;
const {UIStateMixin} = require('../../utils/Router');


const Data = require('../ui/Data');
const Vis = require('../ui/Vis');


const dataConfig = {
  mainData: {
    tab: {
      users: require('../ui/Data/Users'),
      groups: require('../ui/Data/Groups')
    }
  }
};
const visConfig = {
  mainVis: {
    type: {
      bar: require('../ui/Vis/Bar'),
      pie: require('../ui/Vis/Pie')
    }
  }
};


const Main = React.createClass({

  mixins: [PureRenderMixin, UIStateMixin],

  render: function () {
    return (
      <div className="routeHandler appMain">
        <h1>App / Main</h1>


        <div style={{paddingBottom: '2em'}}>
          <Vis uiConfig={visConfig} type="bar" {...(this.uiState('mainVis'))} />
        </div>
        <div style={{paddingBottom: '2em'}}>
          <Data uiConfig={dataConfig} tab="users" {...(this.uiState('mainData'))} />
        </div>

      </div>
    );
  }

});


module.exports = Main;
