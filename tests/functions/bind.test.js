const { bindPolyfill } = require("../../src/polyfills/functions/bind");

beforeAll(() => {
  Function.prototype.myBind = bindPolyfill;
});

afterAll(() => {
  delete Function.prototype.myBind;
});

describe("Function.prototype.myBind", () => {
  test("binds this correctly", () => {
    const obj = { x: 42 };
    function getX() {
      return this.x;
    }

    const boundGetX = getX.myBind(obj);
    expect(boundGetX()).toBe(42);
  });

  test("binds arguments correctly", () => {
    function add(a, b) {
      return a + b;
    }

    const add5 = add.myBind(null, 5);
    expect(add5(3)).toBe(8);
  });

  test("returns a new function", () => {
    function greet(name) {
      return `Hello, ${name}`;
    }

    const boundGreet = greet.myBind(null, "Shahzaib");
    expect(typeof boundGreet).toBe("function");
    expect(boundGreet()).toBe("Hello, Shahzaib");
  });

  test("can be used as a constructor", () => {
    function Person(name) {
      this.name = name;
    }

    const BoundPerson = Person.myBind(null);
    const p = new BoundPerson("Shahzaib");
    expect(p).toBeInstanceOf(Person);
    expect(p.name).toBe("Shahzaib");
  });

  test("bound function keeps prototype chain", () => {
    function Animal(name) {
      this.name = name;
    }
    Animal.prototype.speak = function () {
      return `${this.name} makes a sound.`;
    };

    const BoundAnimal = Animal.myBind(null);
    const dog = new BoundAnimal("Dog");

    expect(dog.speak()).toBe("Dog makes a sound.");
    expect(dog instanceof Animal).toBe(true);
  });

  test("throws error if not called on function", () => {
    expect(() => {
      const notAFunction = {};
      Function.prototype.myBind.call(notAFunction);
    }).toThrow(TypeError);
  });
});
