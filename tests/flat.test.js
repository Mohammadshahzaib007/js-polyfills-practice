const { flatPolyfill } = require("../src/polyfills/flat.js");

beforeAll(() => {
  Array.prototype.myFlat = flatPolyfill;
});

afterAll(() => {
  delete Array.prototype.myFlat;
});

test("flattens nested arrays by 1 level by default", () => {
  const arr = [1, [2, [3, [4]]]];
  expect(arr.myFlat()).toEqual([1, 2, [3, [4]]]);
});

test("flattens nested arrays by specified depth", () => {
  const arr = [1, [2, [3, [4]]]];
  expect(arr.myFlat(2)).toEqual([1, 2, 3, [4]]);
});

test("flattens nested arrays completely with Infinity depth", () => {
  const arr = [1, [2, [3, [4]]]];
  expect(arr.myFlat(Infinity)).toEqual([1, 2, 3, 4]);
});

test("returns shallow copy for non-nested arrays", () => {
  const arr = [1, 2, 3];
  expect(arr.myFlat()).toEqual([1, 2, 3]);
});

test("handles sparse arrays (holes)", () => {
  const arr = [1, , 3, [4, , 6]];
  const result = arr.myFlat();
  expect(result).toEqual([1, 3, 4, 6]); // skips holes like native flat
});

test("returns a new array", () => {
  const arr = [1, [2]];
  const flat = arr.myFlat();
  expect(flat).not.toBe(arr);
});

test("flattens mixed data types correctly", () => {
  const arr = [1, ["a", [true, null]], undefined];
  expect(arr.myFlat(2)).toEqual([1, "a", true, null, undefined]);
});

test("throws if called on null or undefined", () => {
  expect(() => Array.prototype.myFlat.call(null)).toThrow(TypeError);
  expect(() => Array.prototype.myFlat.call(undefined)).toThrow(TypeError);
});
