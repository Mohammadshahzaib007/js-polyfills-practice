// map.test.js

const { mapPolyfill } = require("../src/polyfills/map");

describe("mapPolyfill", () => {
  test("applies callback to each element and returns new array", () => {
    const result = mapPolyfill.call([1, 2, 3], (x) => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  test("does not mutate the original array", () => {
    const arr = [1, 2, 3];
    mapPolyfill.call(arr, (x) => x + 1);
    expect(arr).toEqual([1, 2, 3]);
  });

  test("passes value, index, and array to callback", () => {
    const mockFn = jest.fn((x) => x);
    const arr = [5, 10];
    mapPolyfill.call(arr, mockFn);
    expect(mockFn).toHaveBeenCalledWith(5, 0, arr);
    expect(mockFn).toHaveBeenCalledWith(10, 1, arr);
  });

  test("respects thisArg inside callback", () => {
    const context = { base: 10 };
    const result = mapPolyfill.call(
      [1, 2],
      function (val) {
        return val + this.base;
      },
      context
    );
    expect(result).toEqual([11, 12]);
  });

  test("returns empty array if input is empty", () => {
    const result = mapPolyfill.call([], (x) => x * 2);
    expect(result).toEqual([]);
  });
});
