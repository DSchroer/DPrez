var ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
var path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./index.js"),
  mode: "production",
  output: {
    path: path.resolve("./dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "null-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  performance: { hints: false },
  plugins: [
    new ScriptExtHtmlWebpackPlugin({
      inline: "index_bundle",
      defaultAttribute: "async"
    })
  ]
};
