Array.prototype.somePolyfill = function (cb, thisArgs) {};

module.exports = {
  somePolyfill: Array.prototype.some,
};
