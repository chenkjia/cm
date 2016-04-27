var passwordTpl = _.template(require('./password.html'));
var Common = require('../../common');
module.exports = {
  view: Backbone.View.extend({
    el: '#main',
    initialize: function(){
      $('#page-title').html('修改密码');
      this.formInit();
    },
    events:{
      'submit #main-form': 'submit'
    },
    formInit:function() {
      $('#main').html(passwordTpl());
    },
    submit:function() {
      $.ajax({
        url: Common.url + 'users/'+$.cookie('userId'),
        type: 'PUT',
        dataType: 'json',
        headers:{
          "X-Parse-Session-Token":$.cookie('sessionToken')
        },
        data: {
          password: $('#main-form [name="password"]').val()
        }
      })
      .done(function(data) {
        swal({
          title: "成功!",
          text: "修改密码成功，请使用新密码重新登录!",
          type: "success",
          confirmButtonText: "重新登录" 
        },function(){
          location.href="/login.html";
        });
      })
      .fail(function(error) {
        swal({
          title: error.responseJSON.code+"!",
          text: "修改密码错误，请重新登录后再修改!",
          type: "error",
          confirmButtonText: "重新登录" 
        },function(){
          location.href="/login.html";
        });
      });
      return false;
    }
  })
};