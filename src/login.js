require('font-awesome/css/font-awesome.min.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('sweetalert/dist/sweetalert.css');

require('./css/components.min.css');
require('./css/layout.min.css');
require('./css/darkblue.min.css');
require('./css/login.css');

require('./js/libs/reset');
var Common = require('./js/common');

$(document).ready(function(){
  $('#login-form-password-watch').on('click', function() {
    if ($('#login-form-password').attr('type') === 'password') {
      $('#login-form-password-watch i').addClass('fa-eye-slash');
      return $('#login-form-password').attr('type', 'text');
    } else {
      $('#login-form-password-watch i').removeClass('fa-eye-slash');
      return $('#login-form-password').attr('type', 'password');
    }
  });
  $('#login-form').submit(function() {
    var data = {
      username : $('#login-form-username').val(),
      password : $('#login-form-password').val()
    };
    $.ajax({
      url: Common.url+'login',
      type: 'GET',
      dataType: 'json',
      data: data,
    })
    .done(function(data) {
      if (data.sessionToken) {
        $.cookie('userId',data.objectId)
        $.cookie('sessionToken',data.sessionToken)
        location.href="/";
      }
    });
    return false;
  })
});