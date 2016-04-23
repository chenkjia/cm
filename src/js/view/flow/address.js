var tpl = require('./address.html');
module.exports = {
  init: function(){
    console.log('address');
    this.render();
  },
  render: function() {
    $('#main').html(tpl());
  },
};