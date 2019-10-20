const WatchExternalFilesPlugin = require("webpack-watch-files-plugin").default;
const path = require("path");

function buildConfig(inputPath) {
  const config = require("./webpack.config");

  config.output.path = path.resolve(".");

  config.plugins.unshift(
    new WatchExternalFilesPlugin({
      files: [inputPath]
    })
  );

  return config;
}

module.exports = buildConfig;
