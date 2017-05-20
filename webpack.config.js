const path = require('path');
const webpack = require('webpack');

const debug = process.env.NODE_ENV !== "production";

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: ['./js/index.js', './styles/main.scss'],
  output: {
    path: __dirname + "/src/",
    filename: "main.min.js"
  },
  module: {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
            }
        },
        {
            test: /\.scss$/,
            loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }
    ]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ],
};