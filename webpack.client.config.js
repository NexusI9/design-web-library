const { devtool } = require("./config/devtool.config");
const { devServer } = require("./config/devServer.config");
const { mode } = require("./config/mode.config");
const { module } = require("./config/module.config");
const { resolve } = require("./config/resolve.config");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const { TanStackRouterWebpack } = require("@tanstack/router-plugin/webpack");
const path = require("path");

module.exports = (env, argv) => ({
  ...mode(argv.mode),

  // This is necessary because Figma's 'eval' works differently than normal eval
  ...devtool(argv.mode),

  entry: {
    // app entry point
    index: "./client/src/index.tsx",
  },
  ...module,
  ...resolve,

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"), // Compile into a folder called "dist"
    clean: true,
    publicPath: "auto",
  },

  // Tells Webpack to generate "index.html" and to inline "index.ts" into it
  plugins: [
    new MiniCssExtractPlugin(),
    TanStackRouterWebpack(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./client/public"),
          to: path.resolve(__dirname, "./client/dist"),
        },
      ],
    }),
  ],

  ...devServer
});
