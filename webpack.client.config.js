// configs
const devtool = require("./config/devtool.config");
const mode = require("./config/mode.config");
const loader = require("./config/loader.config");
const resolve = require("./config/resolve.config");
const devServer = require("./config/devServer.config");

// plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = (env, argv) => ({
  mode: mode(argv.mode),
  devtool: devtool(argv.mode),
  resolve,
  devServer,
  module: loader,

  entry: {
    index: "./client/src/index.tsx",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./client/dist"), // Compile into a folder called "dist"
    clean: true,
    publicPath: "auto",
  },

  // Tells Webpack to generate "index.html" and to inline "index.ts" into it
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./client/public"),
          to: path.resolve(__dirname, "./client/dist"),
        },
      ],
    }),
  ],
});
