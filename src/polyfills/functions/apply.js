Function.prototype.applyPolyfill = function (thisArg, args) {};

module.exports = {
  applyPolyfill: Function.prototype.apply,
};
