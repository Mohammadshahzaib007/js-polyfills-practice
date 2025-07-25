# JavaScript Polyfills

A personal project to implement and test common JavaScript polyfills from scratch to better understand how they work under the hood.

## ✅ Completed Polyfills

| Method                         | Status |
| ------------------------------ | ------ |
| Arrays                         |        |
| `Array.prototype.forEach`      | ✅     |
| `Array.prototype.map`          | ✅     |
| `Array.prototype.filter`       | ✅     |
| `Array.prototype.find`         | ✅     |
| `Array.prototype.every`        | ✅     |
| `Array.prototype.some`         | ✅     |
| `Array.prototype.reduce`       | ✅     |
| `Array.prototype.flat`         | ✅     |
| Functions                      |        |
| `Function.prototype.bind`      | ✅     |
| `Function.prototype.call`      | ✅     |
| `Function.prototype.apply`     | ✅     |
| Objects                        |        |
| `Object.prototype.create`      |        |
| `Object.prototype.assign`      |        |
| `Object.prototype.entries`     |        |
| `Object.prototype.fromEntries` |        |
| `Object.prototype.values`      |        |

## 📦 Tech Stack

- JavaScript (ES6+)
- Jest for testing

## 🚀 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/js-polyfills.git
   ```

2. **Install dependencies**

```
npm install
```

3. **Run Tests**

```
npm test
```

For running a specific test file run this command 👇

```
npx jest file_name
```

**📝 Notes**
Each polyfill is implemented in its own file.

All implementations are tested using Jest.

This is a learning-focused project — no external polyfill libraries are used.
