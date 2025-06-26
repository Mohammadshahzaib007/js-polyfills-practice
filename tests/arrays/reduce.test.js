const { reducePolyfill } = require("../../src/polyfills/arrays/reduce");

beforeAll(() => {
  Array.prototype.myReduce = reducePolyfill;
});

afterAll(() => {
  delete Array.prototype.myReduce;
});

describe("Array.prototype.myReduce", () => {
  test("reduces array of numbers to a sum", () => {
    const result = [1, 2, 3, 4].myReduce((acc, val) => acc + val, 0);
    expect(result).toBe(10);
  });

  test("works without initial value", () => {
    const result = [1, 2, 3, 4].myReduce((acc, val) => acc + val);
    expect(result).toBe(10);
  });

  test("works with initial value", () => {
    const result = [1, 2, 3].myReduce((acc, val) => acc + val, 5);
    expect(result).toBe(11);
  });

  test("throws if called on null or undefined", () => {
    expect(() => {
      Array.prototype.myReduce.call(null, () => {});
    }).toThrow(TypeError);

    expect(() => {
      Array.prototype.myReduce.call(undefined, () => {});
    }).toThrow(TypeError);
  });

  test("throws if callback is not a function", () => {
    expect(() => {
      [1, 2, 3].myReduce(null);
    }).toThrow(TypeError);
  });

  test("throws if no initial value and array is empty", () => {
    expect(() => {
      [].myReduce(() => {});
    }).toThrow(TypeError);
  });

  test("returns initial value if array is empty and initial value is provided", () => {
    const result = [].myReduce(() => {}, 100);
    expect(result).toBe(100);
  });

  test("works with sparse arrays", () => {
    const arr = [1, , 3]; // hole at index 1
    const result = arr.myReduce((acc, val) => acc + val, 0);
    expect(result).toBe(4);
  });

  test("passes correct arguments to callback", () => {
    const mockFn = jest.fn((acc, val) => acc + val);
    [10, 20].myReduce(mockFn, 0);
    expect(mockFn).toHaveBeenCalledWith(0, 10, 0, [10, 20]);
    expect(mockFn).toHaveBeenCalledWith(10, 20, 1, [10, 20]);
  });

  test("handles array-like objects", () => {
    const obj = {
      0: "a",
      1: "b",
      length: 2,
    };
    const result = Array.prototype.myReduce.call(
      obj,
      (acc, val) => acc + val,
      ""
    );
    expect(result).toBe("ab");
  });
});
