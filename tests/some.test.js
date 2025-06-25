const { somePolyfill } = require("../src/polyfills/some");

beforeAll(() => {
  Array.prototype.mySome = somePolyfill;
});

afterAll(() => {
  delete Array.prototype.mySome;
});

test("returns true if at least one element passes the test", () => {
  const arr = [1, 2, 3, 4];
  const result = arr.mySome((n) => n > 2);
  expect(result).toBe(true);
});

test("returns false if no elements pass the test", () => {
  const arr = [1, 2, 3, 4];
  const result = arr.mySome((n) => n > 10);
  expect(result).toBe(false);
});

test("stops iteration after finding a matching element", () => {
  const arr = [1, 2, 3, 4];
  const visited = [];
  arr.mySome((n) => {
    visited.push(n);
    return n === 2;
  });
  expect(visited).toEqual([1, 2]);
});

test("uses the provided thisArg", () => {
  const arr = [10];
  const context = {
    threshold: 5,
  };

  const result = arr.mySome(function (n) {
    return n > this.threshold;
  }, context);

  expect(result).toBe(true);
});

test("throws if callback is not a function", () => {
  expect(() => {
    [1, 2, 3].mySome(null);
  }).toThrow(TypeError);
});

test("throws if called on null or undefined", () => {
  expect(() => {
    Array.prototype.mySome.call(null, () => true);
  }).toThrow(TypeError);

  expect(() => {
    Array.prototype.mySome.call(undefined, () => true);
  }).toThrow(TypeError);
});

test("skips sparse array holes", () => {
  const arr = [1, , 3]; // hole at index 1
  const visited = [];

  arr.mySome((value, index) => {
    visited.push(index);
    return false;
  });

  expect(visited).toEqual([0, 2]); // skips index 1
});
