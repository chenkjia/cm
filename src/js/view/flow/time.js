var tpl = require('./time.html');
module.exports = {
  init: function(){
    console.log('time');
    this.render();
  },
  render: function() {
    $('#main').html(tpl());
  },
};