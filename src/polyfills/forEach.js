Array.prototype.myForEach = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    // .call is used to bind 'thisArg' as the 'this' value inside the callback,
    // replicating how Array.prototype.forEach passes 'thisArg' to the callback function.
    callback.call(thisArg, this[i], i, this);
  }
};

module.exports = {
  forEachPolyfill: Array.prototype.forEach,
};
