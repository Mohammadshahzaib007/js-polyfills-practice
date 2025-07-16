Function.prototype.applyPolyfill = function (thisArg, args) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.applyPolyfill can only be called on functions"
    );
  }

  let context =
    thisArg === null || thisArg === undefined ? globalThis : thisArg;

  if (typeof thisArg === "number") {
    context = new Number(thisArg);
  } else if (typeof thisArg === "string") {
    context = new String(thisArg);
  } else if (typeof thisArg === "boolean") {
    context = new Boolean(thisArg);
  }

  const key = Symbol("temp_key");
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

module.exports = {
  applyPolyfill: Function.prototype.apply,
};
