Array.prototype.flatPolyfill = function (depth) {
  "use strict";
  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.flatPolyfill can not call on null or undefined"
    );
  }

  function flat(arr, d = 1) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr.hasOwnProperty(i)) {
        if (Array.isArray(arr[i]) && d > 0) {
          result.push(...flat(arr[i], d - 1));
        } else {
          result.push(arr[i]);
        }
      }
    }
    return result;
  }

  return flat(this, depth);
};

module.exports = {
  flatPolyfill: Array.prototype.flatPolyfill,
};
