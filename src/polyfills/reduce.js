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

  const length = this.length;
  let i = 0;
  let result = initialValue;
  if (!initialValue && initialValue !== 0) {
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
