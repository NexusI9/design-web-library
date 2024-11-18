const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const { TanStackRouterWebpack } = require('@tanstack/router-plugin/webpack');
const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    index: './src/index.tsx', // The entry point for your code
  },
  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      { test: /\.(t|j)sx?$/, use: ['ts-loader'] },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      { 
        test: /\.(png|jpg|gif|webp)$/, 
        loader: 'url-loader'
      },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      { test: /\.s?css$/, use: [
        MiniCssExtractPlugin.loader, 
        {
          loader: 'css-loader',
          options: { url: false }
        }, 
        'sass-loader'] },

      {
        test: /\.svg$/,
        use: [{
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                }
              }]
            }
          }
        }]
      },
    ],
  },


  resolve: {
    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.svg'],
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@icons": path.resolve(__dirname, "src/assets/icons/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@lib": path.resolve(__dirname, "src/lib/"),
      "@ctypes": path.resolve(__dirname, "src/types/"),
    }
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'), // Compile into a folder called "dist"
    clean: true,
    publicPath: "auto"
  },

  // Tells Webpack to generate "index.html" and to inline "index.ts" into it
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      cache: false //refresh html on watch
    }),
    new MiniCssExtractPlugin(),
    TanStackRouterWebpack(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "../public"), to: path.resolve(__dirname, "../dist") }
      ]
    })
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
    historyApiFallback: true, // Redirect all unknown routes to index.html
    compress: true,
    port: 9000,
    devMiddleware: {
      writeToDisk: (filePath) => {
        return !/hot-update/i.test(filePath); // you can change it to whatever you need
      }
    }
  },
});