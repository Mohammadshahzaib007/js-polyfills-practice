Function.prototype.bindPolyfill = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bindPolyfill can not call on null or undefined"
    );
  }

  const orignalFn = this;
  const ctx = Object.assign({}, context) || globalThis;
  ctx.fn = this;
  function boundFn(...newArgs) {
    const result = ctx.fn(...args, ...newArgs);
    delete ctx.fn;
    return result;
  }

  if (orignalFn.prototype) {
    boundFn.prototype = Object.create(orignalFn.prototype);
  }

  return boundFn;
};

module.exports = {
  bindPolyfill: Function.prototype.bindPolyfill,
};
