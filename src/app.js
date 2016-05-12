

// require('./css/font-awesome.min.css');
// require('./css/bootstrap.min.css');
// require('./css/bootstrap-select.min.css');
// require('./css/bootstrap-switch.min.css');
// require('./css/daterangepicker.min.css');

require('font-awesome/css/font-awesome.min.css');
require('bootstrapCss');
require('sweetalert/dist/sweetalert.css');

require('./css/bootstrap-select.min.css');
require('./css/bootstrap-switch.min.css');
require('./css/daterangepicker.min.css');
require('./css/uniform.default.css');

require('./css/components.min.css');
require('./css/plugins.min.css');
require('./css/layout.min.css');
require('./css/darkblue.min.css');
require('./css/style.css');


require('./js/libs/daterange');
require('./js/libs/jquery.uniform.min');
require('./js/libs/layout.min');
require('./js/libs/dataTables.colVis');
require('./js/libs/datatables.bootstrap');
require('./js/libs/reset');
var nav = require('./js/view/nav');
var Router = require('./js/router');

new Router();
Backbone.history.start({hashChange:true});
nav.init();