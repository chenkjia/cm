require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap-table/dist/bootstrap-table.min.css');
require('font-awesome/css/font-awesome.min.css');
require('./css/app.min.css');
require('./css/theme.min.css');
require('./css/style.css');

require('bootstrap-table/dist/bootstrap-table.min');
require('./js/libs/app.min');
require('./js/libs/reset');

var nav = require('./js/view/nav');
var Router = require('./js/router');

new Router();
Backbone.history.start({hashChange:true});
nav.init();