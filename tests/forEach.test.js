const { forEachPolyfill } = require("../src/polyfills/forEach");
// const forEachPolyfill = Array.prototype.forEach;

describe("forEachPolyfill", () => {
  test("calls callback for each element in the array", () => {
    const mockCallback = jest.fn();
    const arr = [1, 2, 3];

    forEachPolyfill.call(arr, mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenCalledWith(1, 0, arr);
    expect(mockCallback).toHaveBeenCalledWith(2, 1, arr);
    expect(mockCallback).toHaveBeenCalledWith(3, 2, arr);
  });

  test("works with thisArg", () => {
    const context = { multiplier: 2 };
    const arr = [1, 2];
    const results = [];

    function cb(value) {
      results.push(value * this.multiplier);
    }

    forEachPolyfill.call(arr, cb, context);

    expect(results).toEqual([2, 4]);
  });
});
