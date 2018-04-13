var path = require("path")

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  externals: {
    "es6-map": {
      root: "es6Map",
      commonjs2: "es6-map",
      commonjs: "es6-map",
      amd: "es6-map",
      umd: "es6-map",
    },
    "es6-weak-map": {
      root: "es6WeakMap",
      commonjs2: "es6-weak-map",
      commonjs: "es6-weak-map",
      amd: "es6-weak-map",
      umd: "es6-weak-map",
    },
  },
}
