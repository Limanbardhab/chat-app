const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    fallback: {
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      process: require.resolve("process/browser"),
      fs: false,
      net: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
