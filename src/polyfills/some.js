Array.prototype.somePolyfill = function (cb, thisArgs) {
  "use strict";
  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${cb} is not a function`);
  }

  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.somePolyfill can not call on null or undefined"
    );
  }

  const length = this.length;
  let i = 0;
  let result = false;
  while (i < length) {
    if (this.hasOwnProperty(i)) {
      const r = cb.call(thisArgs, this[i], i, this);
      if (r) {
        result = r;
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
