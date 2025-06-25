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

// ChatGPT solution
// Array.prototype.reducePolyfill = function (callback, initialValue) {
//   "use strict";

//   if (this === null || this === undefined) {
//     throw new TypeError("Array.prototype.reduce called on null or undefined");
//   }

//   if (typeof callback !== "function") {
//     throw new TypeError(callback + " is not a function");
//   }

//   const obj = Object(this); // Convert array-like to object
//   const len = obj.length >>> 0; // Convert to Uint32
//   let i = 0;
//   let accumulator;

//   // Determine if we have an initial value
//   if (arguments.length >= 2) {
//     accumulator = initialValue;
//   } else {
//     // Find the first defined value to use as initial
//     while (i < len && !(i in obj)) {
//       i++;
//     }
//     if (i >= len) {
//       throw new TypeError("Reduce of empty array with no initial value");
//     }
//     accumulator = obj[i++];
//   }

//   // Iterate over remaining elements
//   for (; i < len; i++) {
//     if (i in obj) {
//       accumulator = callback(accumulator, obj[i], i, obj);
//     }
//   }

//   return accumulator;
// };
