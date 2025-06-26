// configs
const devtool = require("./config/devtool.config");
const mode = require("./config/mode.config");
const loader = require("./config/loader.config");
const resolve = require("./config/resolve.config");

// plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

const outdir = (moduleName, fileName) =>
  `modules/glm/${moduleName}/dist/${fileName}`;
const indir = (moduleName, fileName) =>
  `./client/src/components/Modules/glm/${moduleName}/${fileName}`;

module.exports = (env, argv) => ({
  mode: mode(argv.mode),
  devtool: devtool(argv.mode),
  resolve,
  module: loader,

  entry: {
    [outdir("carousel", "index")]: indir("carousel", "index.js"),
    [outdir("slideshow", "index")]: indir("slideshow", "index.js"),
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./server/public"), // Compile into a folder called "dist"
    clean: false, // important
    publicPath: "auto",
  },

  // Tells Webpack to generate "index.html" and to inline "index.ts" into it
  plugins: [new MiniCssExtractPlugin()],
});
