var tpl = require('./local.html');
module.exports = {
  init: function(){
    console.log('local');
    this.render();
  },
  render: function() {
    $('#main').html(tpl());
  },
};