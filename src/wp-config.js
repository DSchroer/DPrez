const HtmlWebpackPlugin = require("html-webpack-plugin");
const WatchExternalFilesPlugin = require("webpack-watch-files-plugin").default;
const path = require("path");

function buildConfig(slides, outPath) {
  const config = require("./webpack.config");

  config.output.path = path.resolve(".");
  config.plugins.unshift(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.ejs"),
      filename: path.relative(".", outPath),
      templateParameters: {
        slides: slides
      }
    })
  );

  config.plugins.unshift(
    new WatchExternalFilesPlugin({
      files: ["./slides.md"]
    })
  );

  return config;
}

module.exports = buildConfig;
