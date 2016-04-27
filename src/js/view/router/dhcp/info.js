var tpl = require('./info.html');
module.exports = {
  init: function(){
    this.render();
  },
  render: function() {
    $('#main').html(tpl());
  },
};