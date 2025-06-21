function mapPolyfill(cb, thisArg) {
  for (let i = 0; i < this.length; i++) {}
}

module.exports = {
  mapPolyfill: mapPolyfill,
};

[1, 2, 3].map((x) => x * 2);
