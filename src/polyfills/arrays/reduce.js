Array.prototype.reducePolyfill = function (cb, initialValue) {
  "use strict";
  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.reducePolyfill can not call on null or undefined"
    );
  }

  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${cb} is not a function`);
  }

  let i = 0;
  let result;
  const length = this.length;

  if (arguments.length >= 2) {
    result = initialValue;
  } else {
    while (i < length && !(i in this)) {
      i++;
    }
    if (i >= length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    result = this[i];
    i++;
  }

  while (i < length) {
    if (this.hasOwnProperty(i)) {
      result = cb(result, this[i], i, this);
    }
    i++;
  }

  return result;
};

module.exports = {
  reducePolyfill: Array.prototype.reducePolyfill,
};
