const { filterPolyfill } = require("../../src/polyfills/arrays/filter");

describe("filterPolyfill", () => {
  beforeAll(() => {
    Array.prototype.myFilter = filterPolyfill;
  });

  afterAll(() => {
    delete Array.prototype.myFilter;
  });

  test("filters values correctly based on condition", () => {
    const arr = [1, 2, 3, 4];
    const result = arr.myFilter((n) => n % 2 === 0);
    expect(result).toEqual([2, 4]);
  });

  test("returns empty array if no elements match", () => {
    const arr = [1, 3, 5];
    const result = arr.myFilter((n) => n % 2 === 0);
    expect(result).toEqual([]);
  });

  test("throws if callback is not a function", () => {
    expect(() => {
      [1, 2].myFilter(null);
    }).toThrow(TypeError);
  });

  test("callback receives correct arguments", () => {
    const callback = jest.fn();
    const arr = ["a", "b"];
    arr.myFilter(callback);
    expect(callback).toHaveBeenCalledWith("a", 0, arr);
    expect(callback).toHaveBeenCalledWith("b", 1, arr);
  });

  test("respects thisArg correctly", () => {
    const context = { allowed: [2, 4] };
    const arr = [1, 2, 3, 4];
    const result = arr.myFilter(function (n) {
      return this.allowed.includes(n);
    }, context);
    expect(result).toEqual([2, 4]);
  });

  test("works with sparse arrays and skips holes", () => {
    const arr = [1, , 3]; // hole at index 1
    const result = arr.myFilter((n) => true);
    expect(result).toEqual([1, 3]);
  });

  test("callback is not called for holes", () => {
    const arr = [1, , 3];
    const callback = jest.fn(() => true);
    arr.myFilter(callback);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test("does not mutate the original array", () => {
    const arr = [1, 2, 3];
    arr.myFilter(() => true);
    expect(arr).toEqual([1, 2, 3]);
  });

  test("returns empty array for empty input", () => {
    expect([].myFilter(() => true)).toEqual([]);
  });

  test("works on array-like objects", () => {
    const arrayLike = {
      0: "a",
      1: "bb",
      2: "ccc",
      length: 3,
      __proto__: {
        myFilter: filterPolyfill,
      },
    };

    const result = arrayLike.myFilter((x) => x.length > 1);
    expect(result).toEqual(["bb", "ccc"]);
  });

  test("throws TypeError if this is null or undefined", () => {
    expect(() => {
      Array.prototype.myFilter.call(null, () => true);
    }).toThrow(TypeError);

    expect(() => {
      Array.prototype.myFilter.call(undefined, () => true);
    }).toThrow(TypeError);
  });
});
