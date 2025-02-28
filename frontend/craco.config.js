

 const webpack = {
  configure: (webpackConfig) => {
    webpackConfig.resolve.fallback = {
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      assert: require.resolve("assert/"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
      process: require.resolve("process/"),
      fs: false,
      net: false,
    };
    return webpackConfig;
  },
};
