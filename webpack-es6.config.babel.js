'use strict';
import webpack from 'webpack';

export default {
  output: {
    filename: 'fcts-ext-daterange-es6.min.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
