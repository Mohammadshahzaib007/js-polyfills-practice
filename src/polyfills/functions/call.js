Function.prototype.callPolyfill = function (thisArg, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.callPloyfill can only be called on functions"
    );
  }

  let context = thisArg || globalThis;

  if (typeof thisArg === "number") {
    context = new Number(thisArg);
  }
  if (typeof thisArg === "string") {
    context = new String(thisArg);
  }
  const key = Symbol("temp_key");
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

module.exports = {
  callPolyfill: Function.prototype.callPolyfill,
};
