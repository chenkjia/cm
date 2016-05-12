
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
    vendors: ['font-awesome','jquery','moment','bootstrap','bootbox','backbone','lodash','jquery.cookie','jquery-validation','pinyin','bootstrap-select','bootstrap-switch','sweetalert','datatables','common']
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
    ],
    noParse: [/moment-with-locales/]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  resolve: {
    alias: {
        "backbone":"backbone/backbone-min.js",
        "bootbox":"bootbox/bootbox.min.js",
        "bootstrap": "bootstrap/dist/js/bootstrap.min.js",
        "bootstrapCss": "bootstrap/../../css/bootstrap.min.css",
        "bootstrap-select":"bootstrap-select/dist/js/bootstrap-select.min.js",
        "bootstrap-switch":"bootstrap-switch/dist/js/bootstrap-switch.min.js",
        "common":APP_PATH+"/js/common.js",
        "datatables":"datatables/media/js/jquery.dataTables.min.js",
        "font-awesome": "font-awesome/css/font-awesome.min.css",
        "lodash": "lodash/lodash.min.js",
        "moment": "moment/min/moment-with-locales.min.js",
        "jquery": "jquery/dist/jquery.min.js",
        "sweetalertCss": "sweetalert/dist/sweetalert.css"
    }
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
