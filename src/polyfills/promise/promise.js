const STATES = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
class PromisePolyfill {
  #value = void 0;
  #state = STATES.PENDING;
  #resolutionHandlers = [];
  #rejectionHandlers = [];

  constructor(executorFn) {
    this.resolve = this.#_resolve.bind(this);
    this.reject = this.#_reject.bind(this);

    try {
      executorFn(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  #_resolve(value) {
    queueMicrotask(() => {
      if (this.#state !== STATES.PENDING) return;
      this.#value = value;
      this.#state = STATES.FULFILLED;
      this.#runResolutionHandlers();
    });
  }

  #_reject(value) {
    queueMicrotask(() => {
      if (this.#state !== STATES.PENDING) return;
      this.#value = value;
      this.#state = STATES.REJECTED;
      this.#runRejectionHandlers();
    });
  }

  #runResolutionHandlers() {
    if (this.#resolutionHandlers.length) {
      this.#resolutionHandlers.forEach((handler) => handler(this.#value));
      this.#resolutionHandlers = [];
    }
  }
  #runRejectionHandlers() {
    if (this.#rejectionHandlers.length) {
      this.#rejectionHandlers.forEach((handler) => handler(this.#value));
      this.#rejectionHandlers = [];
    }
  }

  then(resolutionHandler, rejectionHandler) {
    return new PromisePolyfill((resolve, reject) => {
      const thenHandler = (result) => {
        if (!resolutionHandler) {
          return resolve(result);
        }
        try {
          const returned = resolutionHandler(result);
          if (returned instanceof PromisePolyfill) {
            returned.then(resolve, reject);
          } else {
            return resolve(returned);
          }
        } catch (error) {
          return reject(error);
        }
      };

      this.#resolutionHandlers.push(thenHandler);

      const catchHandler = (result) => {
        if (!rejectionHandler) {
          return reject(result);
        }
        try {
          const returned = rejectionHandler(result);
          if (returned instanceof PromisePolyfill) {
            returned.then(resolve, reject);
          } else {
            return resolve(returned);
          }
        } catch (error) {
          return reject(error);
        }
      };

      this.#rejectionHandlers.push(catchHandler);

      if (this.#state === STATES.FULFILLED) {
        this.#runResolutionHandlers();
      } else if (this.#state === STATES.REJECTED) {
        this.#runRejectionHandlers();
      }
    });
  }

  catch(rejectionHandler) {
    return this.then(null, rejectionHandler);
  }

  finally(onFinally) {
    return this.then(
      (value) => PromisePolyfill.resolve(onFinally()).then(() => value),
      (reason) =>
        PromisePolyfill.resolve(onFinally()).then(() => {
          throw reason;
        })
    );
  }

  static resolve(value) {
    if (value instanceof PromisePolyfill) {
      return value;
    }

    return new PromisePolyfill((resolve) => resolve(value));
  }

  static reject(reason) {
    return new PromisePolyfill((resolve, reject) => reject(reason));
  }
}

module.exports = {
  PromisePolyfill: PromisePolyfill,
};
