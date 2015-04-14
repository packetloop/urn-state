'use strict';

let I = require('immutable');


let ImmutableStateMixin = {


  igetInitial(obj) {
    return {immutable: I.fromJS(obj)};
  },


  iget(key) {
    return key ? this.state.immutable.get(key) : this.state.immutable;
  },


  iset(obj, callback) {
    this.setState({
      immutable: this.state.immutable.merge(obj)
    }, callback);
  }
};

module.exports = ImmutableStateMixin;
