Function.prototype.callPolyfill = function () {};

module.exports = {
  callPolyfill: Function.prototype.call,
};
