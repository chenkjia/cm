var tpl = require('./service.html');
module.exports = {
  init: function(){
    console.log('service');
    this.render();
  },
  render: function() {
    $('#main').html(tpl());
  },
};