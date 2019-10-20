const WatchExternalFilesPlugin = require("webpack-watch-files-plugin").default;
const path = require("path");

function buildConfig(outPath) {
  const config = require("./webpack.config");

  config.output.path = path.resolve(".");

  config.plugins.unshift(
    new WatchExternalFilesPlugin({
      files: [outPath]
    })
  );

  return config;
}

module.exports = buildConfig;
