Array.prototype.filterPolyfill = function (cb, thisArg) {
  "use strict";

  // Non-strict -	`this` is automatically replaced with the global object
  // Strict mode - `this` remains as null or undefined

  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${cb} is not a function`);
  }

  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.filterPolyfill called on null or undefined"
    );
  }

  let i = 0;
  const length = this.length;
  const result = [];
  while (i < length) {
    if (this.hasOwnProperty(i)) {
      const isTrue = cb.call(thisArg, this[i], i, this);
      if (isTrue) {
        result.push(this[i]);
      }
    }
    i++;
  }

  return result;
};

module.exports = {
  filterPolyfill: Array.prototype.filterPolyfill,
};
