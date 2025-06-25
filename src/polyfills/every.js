Array.prototype.everyPolyfill = function (cb, thisArg) {
  "use strict";
  if (typeof cb !== "function") {
    throw new TypeError(`${typeof cb} ${cb} is not a function`);
  }

  if (this == null || this == undefined) {
    throw new TypeError(
      "Array.prototype.everyPolyfill can not call undefined or null"
    );
  }

  let i = 0;
  const length = this.length;
  let result = true;
  while (i < length) {
    if (this.hasOwnProperty(i)) {
      const r = cb.call(thisArg, this[i], i, this);
      if (!r) {
        result = r;
        break;
      }
    }
    i++;
  }
  return result;
};

module.exports = {
  everyPolyfill: Array.prototype.everyPolyfill,
};
