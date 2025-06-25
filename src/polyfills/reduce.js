Array.prototype.reducePolyfill = function (cb, initialValue, thisArg) {};

module.exports = {
  reducePolyfill: Array.prototype.reduce,
};
