const webpack = require('webpack');
const path    = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module:{
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [ '@babel/core' ]
      // },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      },
      // {
      //   test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf)$/,
      //   loader: 'url-loader?limit=100000'
      // },
      {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader',
         ],
       },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      }
    ]
  },
  watch : true,
  plugins: [
    new MiniCssExtractPlugin(),
  ],
}

module.exports = config;