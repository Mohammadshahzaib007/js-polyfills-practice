// Note: The arrow function has not been used here because, they don’t have their own this
// they inherit this from their surrounding (lexical) scope.
// so in this case the value of this will be inherit from global scope
// here the value of this will be {} in case of node enviroment, and it will be window object
// in case of browser enviroment

// In a Node.js module (CommonJS), the top-level this is {} (an empty object), not global

Array.prototype.myForEach = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new Error(`${typeof callback} ${callback} is not a function`);
  }

  // 'this' refers to the array on which myForEach is called
  for (let i = 0; i < this.length; i++) {
    // .call is used to bind 'thisArg' as the 'this' value inside the callback,
    // replicating how Array.prototype.forEach passes 'thisArg' to the callback function.
    if (this.hasOwnProperty(i)) {
      callback.call(thisArg, this[i], i, this);
    }
  }
};

module.exports = {
  forEachPolyfill: Array.prototype.myForEach,
};
