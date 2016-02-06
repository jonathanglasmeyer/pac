var path = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src'],
  },
  entry: {
    app: [
      './src/entry.jsx'
    ]
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /src/,
        loader: 'babel'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version"]}!less-loader'
      },
      {
        test: /\.(?:eot|ttf|woff2?)$/,
        loader: 'file-loader?name=[path][name]-[hash:6].[ext]&context=assets'
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
        Radium: 'radium',
        "_": 'lodash',
    })
  ],
  devtool: 'eval-source-map'
};
