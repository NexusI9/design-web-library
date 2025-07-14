// configs
const devtool = require("./config/devtool.config");
const mode = require("./config/mode.config");
const loader = require("./config/loader.config");
const resolve = require("./config/resolve.config");
const devServer = require("./config/devServer.config");

// plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

// dev only
const dev = (mode) =>
  mode == "production"
    ? {
        devtool: devtool(mode),
        devServer,
      }
    : {};

module.exports = (_, argv) => ({
  mode: mode(argv.mode),
  resolve,
  ...dev(argv.mode),
  module: loader,

  entry: {
    index: "./client/src/index.tsx",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./server/public"), // Compile into a folder called "dist"
    clean: false,
    publicPath: "auto",
  },

  // Tells Webpack to generate "index.html" and to inline "index.ts" into it
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./client/public"),
          to: path.resolve(__dirname, "./server/public"),
        },
      ],
    }),
  ],
});
