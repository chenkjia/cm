var tpl = require('./proxy.html');
module.exports = {
  init: function(){
    this.render();
  },
  render: function() {
    $('#main').html(tpl());
  },
};