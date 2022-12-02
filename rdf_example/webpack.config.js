const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {index: './src/index.js'},
//   watch: true,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './src/dist'),
    clean: true,
    publicPath: "",
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
        title: "Index",
        filename: "index.html",
        template: "./src/index.html",
        chunks: ["index"],
      }),
    new webpack.DefinePlugin({
        process: {env: {}}
    })
  ],
//   resolve: {
//     alias: {
//         process: "process/browser"
//     }
//   }
};