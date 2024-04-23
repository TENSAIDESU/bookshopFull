const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry:   path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.main.js',
    },
    mode: 'production',
    plugins: [  new MiniCssExtractPlugin(), 
                new HtmlWebpackPlugin(
                {path: path.resolve(__dirname, './dist'),
                  template: './src/html/index.pug',
                  filename: 'index.html',
                  assetModuleFilename: path.join('images', '[name].[contenthash][ext]')
                }
                ),
            ], 
    module: {
        rules: [
          {
            test: /\.scss/,
                use: [MiniCssExtractPlugin.loader,"css-loader"],
          }, 
          {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
            pretty: true
            }
          },
          {
            test: /\.(png|jpg|jpeg|)$/i,
              type: 'asset/resource',
                  },
                   {
                     test: /\.svg$/,
                     type: 'asset/resource',
                     generator: {
                       filename: path.join('icons', '[name].[contenthash][ext]'),
                     },
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