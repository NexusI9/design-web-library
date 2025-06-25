exports.module.resolve = {
  resolve: {
    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    extensions: [".tsx", ".ts", ".jsx", ".js", ".svg"],
    alias: {
      "@components": path.resolve(__dirname, "client/src/components/"),
      "@assets": path.resolve(__dirname, "client/src/assets/"),
      "@icons": path.resolve(__dirname, "client/src/assets/icons/"),
      "@styles": path.resolve(__dirname, "client/src/styles/"),
      "@lib": path.resolve(__dirname, "client/src/lib/"),
      "@ctypes": path.resolve(__dirname, "client/src/types/"),
      "@templates": path.resolve(__dirname, "client/src/templates/"),
      "@pages": path.resolve(__dirname, "client/src/pages/"),
    },
  },
};
