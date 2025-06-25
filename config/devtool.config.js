module.exports.devtool = (mode) => ({
  devtool: mode === "production" ? false : "inline-source-map",
});
