const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  rules: [
    // Converts TypeScript code to JavaScript
    { test: /\.(t|j)sx?$/, use: ["ts-loader"] },

    // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
    {
      test: /\.(png|jpg|gif|webp)$/,
      loader: "url-loader",
    },

    // Enables including CSS by doing "import './file.css'" in your TypeScript code
    {
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: { url: false },
        },
        "sass-loader",
      ],
    },

    // Handle SVG loading
    {
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },

    // Include GLSL
    {
      test: /\.(glsl|vert|frag)$/,
      loader: "webpack-glsl-loader",
    },
  ],
};
