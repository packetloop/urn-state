'use strict';


function objectSort(obj, compareKeys) {
  return Object
    .keys(obj)
    .sort(compareKeys)
    .reduce((memo, key) => Object.assign({}, memo, {[key]: obj[key]}), {});
}

module.exports = objectSort;
