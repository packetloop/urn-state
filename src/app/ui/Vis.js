'use strict';

const React = require('react/addons');
const {UIComponentMixin, Link} = require('../../utils/Router');
const {PropTypes, addons: {PureRenderMixin}} = React;


const Vis = React.createClass({


  mixins: [PureRenderMixin, UIComponentMixin],


  propTypes: {
    children: PropTypes.node
  },


  render() {
    return (
      <div className="uiHandler vis">
        <nav>
          <ul>
            <li>
              <Link partial={this.getUIPart('bar')} current={this.getUICurrent()}>Bar</Link>
            </li>
            <li>
              <Link partial={this.getUIPart('pie')} current={this.getUICurrent()}>Pie</Link>
            </li>
          </ul>
        </nav>
        <div>{this.getUIHandler({xxx: 'zzz'}, this.props.children)}</div>
      </div>
    );
  }
});


module.exports = Vis;
