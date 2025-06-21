Array.prototype.mapPolyfill = function (cb, thisArg) {
  if (typeof cb !== "function") {
    throw new Error(`${typeof cb} ${cb} is not a function`);
  }

  if (this == null || this === undefined) {
    throw new TypeError(
      "Array.prototype.mapPolyfill called on null or undefined"
    );
  }

  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      result[i] = cb.call(thisArg, this[i], i, this);
    }
  }
  return result;
};

module.exports = {
  mapPolyfill: Array.prototype.map,
};
