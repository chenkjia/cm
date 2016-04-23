var tpl = require('./flow.html');
module.exports = {
  init: function(){
    console.log('flow');
    this.render();
  },
  render: function() {
    $('#main').html(tpl());
  },
};