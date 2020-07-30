const webpack = require('webpack');
const path    = require('path');


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
        use: [ 'style-loader', 'css-loader' ]
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
  watch : true
}

module.exports = config;