'use strict';

const {List} = require('immutable');
const Constants = require('../constants/Constants');
const Dispatcher = require('../dispatcher/Dispatcher');
const EventEmitter = require('events').EventEmitter;

let log = List();
const CHANGE_EVENT = 'change';


function setState(message) {
  log = log.slice(0, 10000).unshift((new Date()) + ': ' + message);
}


function restore(messages) {
  log = messages;
}


function clear() {
  log = List();

  return log;
}


const LogStore = Object.assign({}, EventEmitter.prototype, {


  /**
   * Get log.
   * @return {List} Log
   */
  get() {
    return log;
  },


  emitChange() {
    this.emit(CHANGE_EVENT);
  },


  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },


  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});


// Register callback to handle all updates
LogStore.dispatchToken = Dispatcher.register(({actionType, state}) => {
  switch (actionType) {

    case Constants.SET_STATE:
      setState(state);
      LogStore.emitChange();
      break;

    default:
    // empty
  }
});


module.exports = LogStore;
