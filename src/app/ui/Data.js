'use strict';

const React = require('react/addons');
const {UIComponentMixin, Link} = require('../../utils/Router');
const {PropTypes, addons: {PureRenderMixin}} = React;


const Data = React.createClass({


  mixins: [PureRenderMixin, UIComponentMixin],


  propTypes: {
    children: PropTypes.node
  },


  render() {
    return (
      <div className="uiHandler data">
        <nav>
          <ul>
            <li>
              <Link partial={this.getUIPart('users')} current={this.getUICurrent()}>Users</Link>
            </li>
            <li>
              <Link partial={this.getUIPart('groups')} current={this.getUICurrent()}>Groups</Link>
            </li>
          </ul>
        </nav>
        <div>{this.getUIHandler({xxx: 'yyy'}, this.props.children)}</div>
      </div>
    );
  }
});


module.exports = Data;
