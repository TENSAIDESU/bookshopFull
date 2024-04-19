const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ESLintPlugin =require('eslint-webpack-plugin');

module.exports = {
    entry:   path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.main.js',
    },
   
        }