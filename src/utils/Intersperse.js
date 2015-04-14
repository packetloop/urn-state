'use strict';

/**
 * Inject separator between every par of array elements.
 * Could be used to "join" multiple React elements with separator
 *
 * WARN: mutable!
 *
 * @param {Array} arr Array of elements
 * @param {?} sep Separator
 * @return {Array} Modified initial array
 */
function intersperse(arr, sep) {
  for (let i = arr.length - 1; i > 0; i = i - 1) {
    arr.splice(i, 0, sep);
  }
  return arr;
}


intersperse.react = function (children, callback) {
  return intersperse(children, '%%%').map((node, i) => {
    return (node === '%%%') ? callback(i) : node;
  });
};


module.exports = intersperse;
