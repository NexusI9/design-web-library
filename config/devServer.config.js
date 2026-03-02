const path = require("path");

module.exports = {
  static: {
    directory: path.resolve(__dirname, "../server/public"),
  },
  historyApiFallback: true, // Redirect all unknown routes to index.html
  compress: true,
  port: 9000,
  proxy: [{ "/api": process.env.SERVER_URL }],
  devMiddleware: {
    writeToDisk: (filePath) => {
      return !/hot-update/i.test(filePath); // you can change it to whatever you need
    },
  },
};
