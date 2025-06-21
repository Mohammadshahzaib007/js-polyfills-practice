const { forEachPolyfill } = require("../src/polyfills/forEach");

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

  test("should skip holes in sparse arrays", () => {
    const sparseArray = [1, , 3]; // index 1 is a hole
    const results = [];

    forEachPolyfill.call(sparseArray, (value, index) => {
      results.push({ index, value });
    });

    expect(results).toEqual([
      { index: 0, value: 1 },
      { index: 2, value: 3 },
    ]);
  });
});
