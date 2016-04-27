var tpl = require('./port.html');
module.exports = {
  init: function(){
    this.render();
  },
  render: function() {
    $('#main').html(tpl());
  },
};