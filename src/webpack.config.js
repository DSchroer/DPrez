var path = require("path");
const RemovePlugin = require("remove-files-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./page/root.html"),
  mode: "production",
  output: {
    path: path.resolve("./dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          `file-loader?name=${title()}.html`,
          "extract-loader",
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          },
          "extract-loader",
          {
            loader: "html-loader",
            options: {
              interpolate: true
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["html-loader", "extract-loader", "css-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ["html-loader", "null-loader"]
      },
      { test: /\.png$/, use: ["url-loader?mimetype=image/png"] },
      { test: /\.jpg$/, use: ["url-loader?mimetype=image/jpg"] },
      { test: /\.jpeg$/, use: ["url-loader?mimetype=image/jpeg"] },
      { test: /\.gif$/, use: ["url-loader?mimetype=image/gif"] }
    ]
  },
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "./loaders")]
  },
  performance: { hints: false },
  plugins: [
    new RemovePlugin({
      after: {
        include: ["index_bundle.js"]
      }
    })
  ]
};
