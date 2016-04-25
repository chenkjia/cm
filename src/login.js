require('bootstrap/dist/css/bootstrap.min.css')
require('./css/app.min.css')
require('./css/theme.min.css')
require('./js/libs/reset.js')
var Common = require('./js/common.js')
$(document).ready(function(){
  $('#login-form').submit(function() {
    var data = {
      username : $('#login-form-username').val(),
      password : $('#login-form-password').val()
    }
    $.ajax({
      url: Common.url+'login',
      type: 'GET',
      dataType: 'json',
      data: data,
    })
    .done(function(data) {
      if (data.sessionToken) {
        $.cookie('sessionToken',data.sessionToken)
        location.href="/";
      }
    })
    .fail(function(error) {
      console.log(error);
    });
    return false
  })
})