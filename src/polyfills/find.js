// Note: Array.prototype.find does not skip sparse array unlike forEach, map, filter

Array.prototype.findPolyfill = function (cb, thisArg) {};

module.exports = {
  findPolyfill: Array.prototype.find,
};
