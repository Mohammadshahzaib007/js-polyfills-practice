Array.prototype.somePolyfill = function (cb, thisArgs) {
  "use strict";
  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.somePolyfill can not call on null or undefined"
    );
  }

  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${cb} is not a function`);
  }

  const length = this.length;
  let i = 0;
  let result = false;
  while (i < length) {
    if (this.hasOwnProperty(i)) {
      if (cb.call(thisArgs, this[i], i, this)) {
        result = true;
        break;
      }
    }
    i++;
  }

  return result;
};

module.exports = {
  somePolyfill: Array.prototype.somePolyfill,
};
