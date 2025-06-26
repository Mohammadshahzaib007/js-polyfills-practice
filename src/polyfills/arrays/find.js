// Note: Array.prototype.find does not skip sparse array unlike forEach, map, filter

Array.prototype.findPolyfill = function (cb, thisArg) {
  "use strict";

  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${cb} is not a function`);
  }

  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.findPolyfill called on null or undefined"
    );
  }

  let i = 0;
  let length = this.length;
  let result = undefined;
  while (i < length) {
    const isTrue = cb.call(thisArg, this[i], i, this);
    if (isTrue) {
      result = this[i];
      break;
    }
    i++;
  }

  return result;
};

module.exports = {
  findPolyfill: Array.prototype.findPolyfill,
};
