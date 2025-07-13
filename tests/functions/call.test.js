const { callPolyfill } = require("../../src/polyfills/functions/call");

beforeAll(() => {
  Function.prototype.myCall = callPolyfill;
});

afterAll(() => {
  delete Function.prototype.myCall;
});

describe("Function.prototype.myCall", () => {
  it("calls function with the given context", () => {
    function greet() {
      return `Hello, ${this.name}`;
    }
    const context = { name: "Shahzaib" };
    const result = greet.myCall(context);
    expect(result).toBe("Hello, Shahzaib");
  });

  it("passes arguments correctly", () => {
    function sum(a, b, c) {
      return this.offset + a + b + c;
    }
    const context = { offset: 5 };
    const result = sum.myCall(context, 1, 2, 3);
    expect(result).toBe(11);
  });

  it("returns the correct value", () => {
    function multiply(a, b) {
      return a * b;
    }
    const result = multiply.myCall(null, 2, 3);
    expect(result).toBe(6);
  });

  it("defaults context to globalThis if context is null", () => {
    globalThis.testValue = 42;
    function get() {
      return this.testValue;
    }
    const result = get.myCall(null);
    expect(result).toBe(42);
  });

  it("defaults context to globalThis if context is undefined", () => {
    globalThis.testValue = 100;
    function get() {
      return this.testValue;
    }
    const result = get.myCall(undefined);
    expect(result).toBe(100);
  });

  it("coerces primitive context (number) to object", () => {
    function getType() {
      return typeof this;
    }
    const result = getType.myCall(123);
    expect(result).toBe("object"); // Number primitive becomes Number object
  });

  it("coerces primitive context (string) to object", () => {
    function getConstructor() {
      return this.constructor;
    }
    const result = getConstructor.myCall("hello");
    expect(result).toBe(String); // String primitive becomes String object
  });

  it("works when context is already an object", () => {
    function who() {
      return this.id;
    }
    const context = { id: "obj1" };
    const result = who.myCall(context);
    expect(result).toBe("obj1");
  });

  it("throws TypeError when called on non-function", () => {
    const notAFunction = {};
    expect(() => {
      Function.prototype.myCall.call(notAFunction, {});
    }).toThrow(TypeError);
  });

  it("function can return object correctly", () => {
    function makeObj() {
      return { a: 1 };
    }
    const result = makeObj.myCall({});
    expect(result).toEqual({ a: 1 });
  });

  it("function can return primitive value correctly", () => {
    function getNumber() {
      return 123;
    }
    const result = getNumber.myCall({});
    expect(result).toBe(123);
  });

  it("context object can be array", () => {
    function firstItem() {
      return this[0];
    }
    const result = firstItem.myCall(["a", "b", "c"]);
    expect(result).toBe("a");
  });
});
