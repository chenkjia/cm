
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'template');

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'app.js'),
    login: path.resolve(APP_PATH, 'login.js'),
    vendors: ['jquery','moment','bootstrap','bootbox','backbone','lodash','datatables','jquery.cookie','jquery-validation','pinyin','bootstrap-select','bootstrap-switch','bootstrap-daterangepicker','sweetalert']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.html$/,loader: 'html'},
      { test: /\.css$/,loaders: ['style', 'css']},
      { test: /\.(png|jpg)$/,loader: 'url?limit=40000'},
      { test: /\.(woff|svg|eot|ttf)\??.*$/,loader: 'url'}
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    // new HtmlwebpackPlugin({
    //   title: 'Hello Woapp'
    // }),
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: path.resolve(TEM_PATH, 'login.html'),
      filename: 'login.html',
      chunks: ['login', 'vendors'],
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery',
      bootbox: 'bootbox',
      backbone: 'backbone',
      _: 'lodash',
      pinyin:'pinyin',
      moment:'moment',
      swal:'sweetalert',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};
