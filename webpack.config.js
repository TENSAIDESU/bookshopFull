const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, './index.js'),
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
  },
  mode: 'production',
  plugins: [new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin(
          {
              template: './src/html/index.pug',
              filename: 'index.html'
          }
      ),
      new CopyPlugin({
          patterns: [
            { from: "./src/images", to: "src/images" },
          ],
        }),
],
  module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
          pretty: true
          }
      }
      ],
   
  },
  optimization: {
      minimizer: [
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
    
}; 