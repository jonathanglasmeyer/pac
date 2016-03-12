const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const validateWebpackConfig = require('webpack-validator');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');


const lessModuleLoader = (prod) => {
  const cssModulesOptions = prod ? '' : '&localIdentName=[name]__[local]___[hash:base64:5]';
  const _loaders = `css?modules${cssModulesOptions}!postcss!less`;
  return {
    test: /\.less.module$/,
    loader: !prod ? `style!${_loaders}` :
      ExtractTextPlugin.extract('style', _loaders, {publicPath: ''}),
  };
};

const production = process.env.NODE_ENV === 'production';

const wrapExtractTextStyle = (loaders) => {
  return production
    ? ExtractTextPlugin.extract(loaders, {publicPath: ''})
    : `style-loader!${loaders}`;
};

const config = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src'],
  },
  entry: {
    app: production
      ? ['./src/index.js']
      : ['webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr', './src/index.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    publicPath: production ? '/dist/' : 'http://localhost:3000/dist/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /src/,
        loader: 'babel',
      },
      {
        test: /\.less$/,
        include: /src/,
        loader: wrapExtractTextStyle(`css-loader!postcss-loader!less-loader`),
      },
      {
        test: /\.(?:eot|ttf|woff2?)$/,
        loader: 'file-loader?name=[path][name]-[hash:6].[ext]&context=assets',
      },
    ].concat([
      lessModuleLoader(production),
    ]),
  },
  postcss: [
    autoprefixer({browsers: ['last 2 versions']}),
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
    }),

    // Moment.js imports the locales dynamically which is why webpack will include all 60 locales (>300kb)
    // if we don't override this behaviour.
    // Here we "whitelist" the paths that will be imported when moment/locales/* is imported
    // We tell it that we are interested in de, en-gb, da & nl. Afrikaans etc. will stay out. :)
    // This results in a bundle size reduction of 300kb / 150KB minified
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(de|en-gb|da|nl)$/),
  ].concat(production ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {drop_console: true},
      screw_ie8: true,
      sourceMap: false, // This means dropping build time from ~45 sec to ~32 sec
    }),
    new ExtractTextPlugin('style.css', {allChunks: true}),
  ] : [
  // development
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]),
  devtool: production ? 'hidden-source-map' : 'cheap-module-eval-source-map',
};

config.target = webpackTargetElectronRenderer(config);

module.exports = validateWebpackConfig(config);
