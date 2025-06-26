const { mapPolyfill } = require("../../src/polyfills/arrays/map");

describe("mapPolyfill", () => {
  test("should map over array and return correct values", () => {
    const arr = [1, 2, 3];
    const result = mapPolyfill.call(arr, (num) => num * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  test("should pass index and array as arguments", () => {
    const arr = [10, 20, 30];
    const indexes = [];
    const arrays = [];

    const result = mapPolyfill.call(arr, (value, index, array) => {
      indexes.push(index);
      arrays.push(array);
      return value;
    });

    expect(indexes).toEqual([0, 1, 2]);
    expect(arrays[0]).toBe(arr);
    expect(arrays[1]).toBe(arr);
    expect(result).toEqual(arr);
  });

  test("should respect thisArg", () => {
    const context = { multiplier: 3 };
    const arr = [1, 2, 3];

    const result = mapPolyfill.call(
      arr,
      function (num) {
        return num * this.multiplier;
      },
      context
    );

    expect(result).toEqual([3, 6, 9]);
  });

  test("should not mutate the original array", () => {
    const arr = [1, 2, 3];
    const copy = [...arr];

    mapPolyfill.call(arr, (x) => x * 10);
    expect(arr).toEqual(copy);
  });

  test("should return empty array for empty input", () => {
    const arr = [];
    const result = mapPolyfill.call(arr, (x) => x * 2);
    expect(result).toEqual([]);
  });

  test("should skip holes in sparse arrays", () => {
    const sparse = [1, , 3]; // hole at index 1
    const result = mapPolyfill.call(sparse, (v) => v * 2);
    expect(result).toEqual([2, , 6]); // hole preserved
    expect(1 in result).toBe(false); // still a hole
  });

  test("should support mapping undefined values", () => {
    const arr = [undefined, null, 0];
    const result = mapPolyfill.call(arr, (v) =>
      v === undefined ? "undef" : v
    );
    expect(result).toEqual(["undef", null, 0]);
  });

  test("should work with array-like objects", () => {
    const arrayLike = {
      0: "a",
      1: "b",
      length: 2,
      hasOwnProperty: Object.prototype.hasOwnProperty,
    };

    const result = mapPolyfill.call(arrayLike, (v) => v.toUpperCase());
    expect(result).toEqual(["A", "B"]);
  });

  test("should return new array instance", () => {
    const arr = [1, 2, 3];
    const result = mapPolyfill.call(arr, (x) => x);
    expect(result).not.toBe(arr);
  });
});
