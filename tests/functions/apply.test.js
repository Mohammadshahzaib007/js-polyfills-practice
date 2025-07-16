const { applyPolyfill } = require("../../src/polyfills/functions/apply");

beforeAll(() => {
  Function.prototype.myApply = applyPolyfill;
});

afterAll(() => {
  delete Function.prototype.myApply;
});

describe("applyPolyfill", () => {
  test("should call function with provided object context", () => {
    function getName() {
      return this.name;
    }
    const context = { name: "Shahzaib" };
    expect(getName.myApply(context)).toBe("Shahzaib");
  });

  test("should call function with primitive number context", () => {
    function getType() {
      return typeof this;
    }
    expect(getType.myApply(42)).toBe("object");
  });

  test("should call function with primitive string context", () => {
    function firstChar() {
      return this.charAt(0);
    }
    expect(firstChar.myApply("Hello")).toBe("H");
  });

  test("should call function with primitive boolean context", () => {
    function getType() {
      return typeof this;
    }
    expect(getType.myApply(true)).toBe("object");
  });

  test("should default context to globalThis when null or undefined", () => {
    function checkGlobal() {
      return this === globalThis;
    }
    expect(checkGlobal.myApply(null)).toBe(true);
    expect(checkGlobal.myApply(undefined)).toBe(true);
  });

  test("should pass arguments correctly as array", () => {
    function sum(a, b, c) {
      return a + b + c;
    }
    expect(sum.myApply(null, [1, 2, 3])).toBe(6);
  });

  test("should return correct value", () => {
    function multiply(a, b) {
      return a * b;
    }
    expect(multiply.myApply(null, [4, 5])).toBe(20);
  });

  test("should throw TypeError if called on non-function", () => {
    const notAFunction = {};
    expect(() => {
      Function.prototype.myApply.call(notAFunction, null, []);
    }).toThrow(TypeError);
  });
});
