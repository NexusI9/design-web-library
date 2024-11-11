const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      { test: /\.(t|j)sx?$/, use: ['ts-loader']  },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      { test: /\.(png|jpg|gif|webp)$/, loader: 'url-loader' },

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
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    clean: true
  },

  // Tells Webpack to generate "index.html" and to inline "index.ts" into it
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      cache: false //refresh html on watch
    }),
    TanStackRouterWebpack()
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
});