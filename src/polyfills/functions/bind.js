// Function.prototype.bindPolyfill = function (context, ...args) {
//   if (typeof this !== "function") {
//     throw new TypeError(
//       "Function.prototype.bindPolyfill can not call on null or undefined"
//     );
//   }

//   const orignalFn = this;
//   const ctx = Object.assign({}, context) || globalThis;
//   ctx.fn = this;
//   function boundFn(...newArgs) {
//     const result = ctx.fn(...args, ...newArgs);
//     delete ctx.fn;
//     return result;
//   }

//   if (orignalFn.prototype) {
//     boundFn.prototype = Object.create(orignalFn.prototype);
//   }

//   return boundFn;
// };

Function.prototype.bindPolyfill = function (context, ...args) {
  // 1. Case: Throws error if not called on a function
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bindPolyfill can only be called on functions"
    );
  }

  const originalFn = this; // Store the original function

  // 2. Case: Returns a new function
  function boundFn(...newArgs) {
    // This is the core logic for setting 'this' without .apply() or .call().
    // It handles two main scenarios:
    // A. When `boundFn` is called as a constructor (`new boundFn(...)`).
    //    In this case, `this` inside `originalFn` should be the new instance created by `new`.
    //    The `context` provided to `bindPolyfill` is ignored for `this`.
    // B. When `boundFn` is called as a regular function (`boundFn(...)`).
    //    In this case, `this` inside `originalFn` should be the `context` passed to `bindPolyfill`.

    let actualContext; // The 'this' context that originalFn will be executed with

    // Check if `boundFn` was called with the `new` operator
    if (new.target) {
      // Scenario A: `boundFn` is used as a constructor.
      // `this` refers to the newly created instance by the `new` operator.
      actualContext = this;

      // To run `originalFn` as a constructor on `actualContext` without .apply()/.call(),
      // we temporarily attach `originalFn` to `actualContext` under a unique key,
      // invoke it, and then remove it.
      // Using a Symbol for the key prevents potential property name collisions.
      const tempOriginalFnKey = Symbol("__tempOriginalFnForBindPolyfill");
      actualContext[tempOriginalFnKey] = originalFn;

      // Execute the original function as if it were a constructor on the new instance.
      // Combine arguments from bindPolyfill (`args`) and the bound function call (`newArgs`).
      const result = actualContext[tempOriginalFnKey](...args, ...newArgs);

      // Clean up the temporary property
      delete actualContext[tempOriginalFnKey];

      // If the original constructor returned an object, that object should be returned.
      // Otherwise, the newly created instance (`actualContext`) is returned implicitly by `new`.
      if (typeof result === "object" && result !== null) {
        return result;
      } else {
        return actualContext; // This is the instance created by `new`
      }
    } else {
      // Scenario B: `boundFn` is called as a regular function.
      // The `this` context for `originalFn` should be the `context` passed to `bindPolyfill`.
      // If `context` is null or undefined, `this` should default to `globalThis` (window in browsers).
      // Primitive values (like numbers, strings) passed as context will be coerced into objects
      // when `originalFn` is invoked as a method of `actualContext`.
      actualContext =
        context === null || context === undefined
          ? globalThis
          : Object(context);

      // Temporarily attach `originalFn` to `actualContext` to control its `this` binding.
      const tempOriginalFnKey = Symbol("__tempOriginalFnForBindPolyfill");
      actualContext[tempOriginalFnKey] = originalFn;

      // Execute the original function with the combined arguments.
      const result = actualContext[tempOriginalFnKey](...args, ...newArgs);

      // Clean up the temporary property
      delete actualContext[tempOriginalFnKey];

      return result;
    }
  }

  // 5. Case: Bound function keeps prototype chain
  // If the original function has a prototype (which is typical for constructor functions),
  // we need to set up the prototype chain for the `boundFn` so that `new boundFn()`
  // instances inherit correctly.
  if (originalFn.prototype) {
    // Create a new object whose prototype is `originalFn.prototype`.
    // This new object becomes the prototype of `boundFn`.
    boundFn.prototype = Object.create(originalFn.prototype); //Object.create gives you the right prototype chain but doesn’t copy .constructor
    // new boundFn() --> boundFn.prototype --> originalFn.prototype

    // Crucial: Restore the `constructor` property of `boundFn.prototype`.
    // `Object.create()` does not automatically set the `constructor` property.
    // Without this, `new boundFn() instanceof originalFn` would still work,
    // but `boundFn.prototype.constructor` would point to `originalFn` (inherited),
    // which can lead to unexpected behavior in some reflection scenarios.
    Object.defineProperty(boundFn.prototype, "constructor", {
      value: boundFn,
      writable: true,
      configurable: true,
    });
  }

  return boundFn;
};

module.exports = {
  bindPolyfill: Function.prototype.bindPolyfill,
};
