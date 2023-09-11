const Dotenv = require("dotenv-webpack");
const path = require("path"); // Add this import

module.exports = {
  mode: "development",
  devtool: "source-map",
  plugins: [new Dotenv()],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
};
