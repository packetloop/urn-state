'use strict';


// TODO: this all to be heavily refactored


let {fromJS} = require('immutable');
let ImmutableStateMixin = require('../mixins/ImmutableStateMixin');

let React = require('react/addons');
let {PropTypes} = React;

let ReactRouter = require('react-router');
let {Link} = ReactRouter;

let objectSort = require('./objectSort');


let UIStateMixin = {
  uiState(component) {
    return Object.assign({query: this.props.query}, this.props.query[component]);
  }
};

let UIComponentMixin = {

  getInitialState() {
    return this.getUIState(this.props);
  },


  componentWillReceiveProps(nextProps) {
    this.setState(this.getUIState(nextProps));
  },


  getUIState(props) {
    let config = this.props.uiConfig;
    let state = {};

    if (!config) {
      return state;
    }

    Object.keys(config).forEach(key => {
      Object.keys(config[key]).forEach(key2 => {
        state[key2] = props[key2];
      });
    });
    return state;
  },


  getUIPart(name) {
    let config = this.props.uiConfig;
    let part = {};

    if (!config) {
      return part;
    }

    Object.keys(config).forEach(key => {
      part[key] = {};
      Object.keys(config[key]).forEach(key2 => {
        if (config[key][key2][name]) {
          part[key][key2] = name;
        }
      });
    });
    return part;
  },

  getUIParts() {
    let config = this.props.uiConfig;
    let parts = [];

    if (!config) {
      return parts;
    }

    Object.keys(config).forEach(key => {
      Object.keys(config[key]).forEach(key2 => {
        parts = Object.keys(config[key][key2]);
      });
    });
    return parts;
  },

  getUICurrent() {
    let config = this.props.uiConfig;
    let state = this.state;
    let current = {};

    if (!config) {
      return current;
    }

    Object.keys(config).forEach(key => {
      current[key] = {};
      Object.keys(config[key]).forEach(key2 => {
        if (state[key2]) {
          current[key][key2] = state[key2];
        }
      });
    });
    return current;
  },

  getUICurrentPart() {
    let config = this.props.uiConfig;
    let state = this.state;
    let current = null;

    if (!config) {
      return current;
    }

    Object.keys(config).forEach(key => {
      Object.keys(config[key]).forEach(key2 => {
        if (state[key2]) {
          current = key2;
        }
      });
    });
    return current;
  },

  getUIHandler(...args) {
    let config = this.props.uiConfig;
    let state = this.state;
    let handler;


    if (!config) {
      return handler;
    }


    Object.keys(config).forEach(key => {
      Object.keys(config[key]).forEach(key2 => {
        if (state[key2]) {
          handler = config[key][key2][state[key2]];
        }
      });
    });
    return React.createElement(handler, ...args);
  }


};


let UIStateLink = React.createClass({


  mixins: [ImmutableStateMixin, ReactRouter.State],


  propTypes: {
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    to: PropTypes.string,
    query: PropTypes.object,
    partial: PropTypes.object,
    params: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.node
  },


  getDefaultProps() {
    return {
      activeClassName: 'active',
      partial: {},
      current: {}
    };
  },


  getInitialState() {
    return this.igetInitial({
      to: this.getTo(),
      query: this.getSortedQuery(),
      className: this.getIsActive() || this.getIsCurrent(this.props) ?
        [this.props.activeClassName, this.props.className].join(' ') : this.props.className
    });
  },


  shouldComponentUpdate(nextProps, nextState) {
    let isStateEqual = this.state.immutable.equals(nextState.immutable);
    let isPropsEqual = fromJS(this.props).equals(fromJS(nextProps));
    return !isStateEqual || !isPropsEqual;
  },


  componentWillReceiveProps(nextProps) {
    let to = this.getTo();
    let query = this.getSortedQuery();
    let className = this.getIsActive() || this.getIsCurrent(nextProps) ?
      [this.props.activeClassName, this.props.className].join(' ') : this.props.className;

    this.iset({to, query, className});
  },


  isPartial() {
    return Object.keys(this.props.partial).length > 0;
  },


  getPartial() {
    return fromJS(this.props.partial);
  },


  getTo() {
    return this.isPartial() ? this.context.router.getCurrentPathname() : this.props.to;
  },


  getIsActive() {
    let isActive = this.context.router.isActive(this.getTo(),
      this.context.router.getCurrentParams(), {});

    if (this.isPartial()) {
      let currentQuery = fromJS(this.context.router.getCurrentQuery());
      isActive = currentQuery.equals(currentQuery.merge(this.getPartial()));
    }
    return isActive;
  },

  getIsCurrent(props) {
    return this.isPartial() && fromJS(props.current).equals(fromJS(props.partial));
  },


  getSortedQuery() {
    return fromJS(this.isPartial() ?
      objectSort(Object.assign({}, this.context.router.getCurrentQuery(), this.props.partial)) :
      objectSort(this.props.query || {}));
  },


  render() {
    return (
      <Link
        activeClassName=""
        className={this.iget('className')}
        to={this.iget('to')}
        params={this.props.params}
        query={this.iget('query').toJS()}
        onClick={this.props.onClick}
        children={this.props.children} />
    );
  }

});


module.exports = Object.assign({}, ReactRouter, {
  Link: UIStateLink,
  UIComponentMixin,
  UIStateMixin
});
