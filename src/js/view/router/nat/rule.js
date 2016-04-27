var tpl = require('./rule.html');
module.exports = {
  init: function(){
    console.log('rule');
    this.render();
  },
  render: function() {
    $('#main').html(tpl());
  },
};