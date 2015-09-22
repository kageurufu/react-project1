var path = require('path'),
    webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/app.js',
  ],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/"
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ProvidePlugin({'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'app')},

      { test: /\.html$/,                        loader: "file?name=[name].[ext]"},
      { test: /\.css$/,                         loader: "style-loader!css-loader"},
      { test: /\.less$/,                        loader: "style!css!!less"},
      { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,  loader: "file" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,     loader: "file" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,     loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,     loader: "file" }
    ]
  }
}
