var tpl = require('./protocol.html');
module.exports = {
  init: function(){
    console.log('protocol');
    this.render();
  },
  render: function() {
    $('#main').html(tpl());
  },
};