const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PROVIDER_URL': JSON.stringify(process.env.PROVIDER_URL)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      title: 'blocks.lol',
      inject: 'body'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: 'style!css!sass'
      }
    ]
  }
};