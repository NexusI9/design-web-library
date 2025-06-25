module.exports.devServer = {
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./client/public"),
    },
    historyApiFallback: true, // Redirect all unknown routes to index.html
    compress: true,
    port: 9000,
    devMiddleware: {
      writeToDisk: (filePath) => {
        return !/hot-update/i.test(filePath); // you can change it to whatever you need
      },
    },
  },
};
