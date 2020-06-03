const WatchExternalFilesPlugin = require("webpack-watch-files-plugin").default;
const path = require("path");

function buildConfig(inputPaths) {
  const config = require("./webpack-base");

  config.output.path = path.resolve(".");

  config.plugins.unshift(
    new WatchExternalFilesPlugin({
      files: inputPaths
    })
  );

  return config;
}

module.exports = buildConfig;
