const { findPolyfill } = require("../../src/polyfills/arrays/find");

describe("findPolyfill", () => {
  beforeAll(() => {
    Array.prototype.myFind = findPolyfill;
  });

  afterAll(() => {
    delete Array.prototype.myFind;
  });

  test("finds the first matching element", () => {
    const result = [5, 12, 8, 130, 44].myFind((el) => el > 10);
    expect(result).toBe(12);
  });

  test("returns undefined if no match found", () => {
    const result = [1, 2, 3].myFind((el) => el > 10);
    expect(result).toBeUndefined();
  });

  test("throws TypeError if callback is not a function", () => {
    expect(() => {
      [1, 2, 3].myFind(null);
    }).toThrow(TypeError);
  });

  test("callback receives element, index, and array", () => {
    const mockFn = jest.fn();
    [10, 20, 30].myFind(mockFn);
    expect(mockFn).toHaveBeenCalledWith(10, 0, [10, 20, 30]);
  });

  test("respects thisArg", () => {
    const context = { num: 15 };
    const result = [5, 10, 15].myFind(function (el) {
      return el === this.num;
    }, context);
    expect(result).toBe(15);
  });

  test("works with array-like objects", () => {
    const arrayLike = {
      0: "a",
      1: "b",
      2: "c",
      length: 3,
      __proto__: Array.prototype,
    };
    const result = arrayLike.myFind((el) => el === "b");
    expect(result).toBe("b");
  });

  test("returns first truthy result and stops further calls", () => {
    const mockFn = jest.fn((el) => el === 2);
    const result = [1, 2, 3, 2].myFind(mockFn);
    expect(result).toBe(2);
    expect(mockFn).toHaveBeenCalledTimes(2); // Stops at first match
  });

  test("throws if called on null or undefined", () => {
    expect(() => {
      Array.prototype.myFind.call(null, () => true);
    }).toThrow(TypeError);
    expect(() => {
      Array.prototype.myFind.call(undefined, () => true);
    }).toThrow(TypeError);
  });
});
