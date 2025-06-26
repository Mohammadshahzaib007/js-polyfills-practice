const { everyPolyfill } = require("../../src/polyfills/arrays/every");

describe("Array.prototype.everyPolyfill", () => {
  beforeAll(() => {
    Array.prototype.myEvery = everyPolyfill;
  });

  afterAll(() => {
    delete Array.prototype.myEvery;
  });

  test("returns true if all elements satisfy the condition", () => {
    const result = [2, 4, 6].myEvery((n) => n % 2 === 0);
    expect(result).toBe(true);
  });

  test("returns false if any element does not satisfy the condition", () => {
    const result = [2, 3, 6].myEvery((n) => n % 2 === 0);
    expect(result).toBe(false);
  });

  test("callback receives value, index, and array", () => {
    const arr = [1];
    arr.myEvery((val, i, array) => {
      expect(val).toBe(1);
      expect(i).toBe(0);
      expect(array).toEqual([1]);
      return true;
    });
  });

  test("uses thisArg correctly", () => {
    const context = { threshold: 5 };
    const result = [6, 7, 8].myEvery(function (val) {
      return val > this.threshold;
    }, context);
    expect(result).toBe(true);
  });

  test("throws if callback is not a function", () => {
    expect(() => {
      [1, 2].myEvery(null);
    }).toThrow(TypeError);
  });

  test("returns true for empty array", () => {
    const result = [].myEvery(() => false);
    expect(result).toBe(true);
  });

  test("skips sparse array holes", () => {
    const arr = [1, , 3]; // hole at index 1
    const visited = [];

    arr.myEvery((value, index) => {
      visited.push(index);
      return true;
    });

    expect(visited).toEqual([0, 2]); // index 1 is skipped
  });

  test("works with array-like objects", () => {
    const obj = { 0: 2, 1: 4, 2: 6, length: 3 };
    const result = Array.prototype.myEvery.call(obj, (n) => n % 2 === 0);
    expect(result).toBe(true);
  });

  test("throws TypeError if called on null or undefined", () => {
    expect(() => {
      Array.prototype.myEvery.call(null, () => true);
    }).toThrow(TypeError);

    expect(() => {
      Array.prototype.myEvery.call(undefined, () => true);
    }).toThrow(TypeError);
  });
});
