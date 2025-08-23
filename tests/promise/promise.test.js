const { PromisePolyfill } = require("../../src/polyfills/promise/promise.js");

beforeAll(() => {
  global.MyPromise = PromisePolyfill;
});

afterAll(() => {
  delete global.MyPromise;
});

describe("PromisePolyfill", () => {
  test("resolves with a value", (done) => {
    const promise = new MyPromise((resolve) => {
      resolve(42);
    });
    promise.then((value) => {
      expect(value).toBe(42);
      done();
    });
  });

  test("rejects with a reason", (done) => {
    const promise = new MyPromise((_, reject) => {
      reject("error");
    });
    promise.catch((reason) => {
      expect(reason).toBe("error");
      done();
    });
  });

  test("supports chaining with then", (done) => {
    new MyPromise((resolve) => resolve(1))
      .then((v) => v + 1)
      .then((v) => v * 2)
      .then((v) => {
        expect(v).toBe(4);
        done();
      });
  });

  test("catch handles rejection", (done) => {
    new MyPromise((_, reject) => reject("fail"))
      .then(() => {
        throw new Error("Should not be called");
      })
      .catch((err) => {
        expect(err).toBe("fail");
        done();
      });
  });

  test("finally is called after resolve", (done) => {
    let flag = false;
    new MyPromise((resolve) => resolve("ok"))
      .finally(() => {
        flag = true;
      })
      .then((value) => {
        expect(value).toBe("ok");
        expect(flag).toBe(true);
        done();
      });
  });

  test("finally is called after reject", (done) => {
    let flag = false;
    new MyPromise((_, reject) => reject("oops"))
      .finally(() => {
        flag = true;
      })
      .catch((reason) => {
        expect(reason).toBe("oops");
        expect(flag).toBe(true);
        done();
      });
  });

  // ---- Static Methods ----
  test("PromisePolyfill.resolve works", (done) => {
    MyPromise.resolve(99).then((value) => {
      expect(value).toBe(99);
      done();
    });
  });

  test("PromisePolyfill.reject works", (done) => {
    MyPromise.reject("bad").catch((reason) => {
      expect(reason).toBe("bad");
      done();
    });
  });

  test("PromisePolyfill.all resolves array", (done) => {
    MyPromise.all([
      MyPromise.resolve(1),
      MyPromise.resolve(2),
      MyPromise.resolve(3),
    ]).then((values) => {
      expect(values).toEqual([1, 2, 3]);
      done();
    });
  });

  test("PromisePolyfill.all rejects if one fails", (done) => {
    MyPromise.all([
      MyPromise.resolve(1),
      MyPromise.reject("fail"),
      MyPromise.resolve(3),
    ]).catch((err) => {
      expect(err).toBe("fail");
      done();
    });
  });

  test("PromisePolyfill.race resolves with first value", (done) => {
    MyPromise.race([
      new MyPromise((resolve) => setTimeout(() => resolve(10), 50)),
      new MyPromise((resolve) => setTimeout(() => resolve(20), 10)),
    ]).then((value) => {
      expect(value).toBe(20);
      done();
    });
  });

  test("PromisePolyfill.race rejects with first rejection", (done) => {
    MyPromise.race([
      new MyPromise((_, reject) => setTimeout(() => reject("err"), 10)),
      new MyPromise((resolve) => setTimeout(() => resolve(100), 50)),
    ]).catch((err) => {
      expect(err).toBe("err");
      done();
    });
  });
});
