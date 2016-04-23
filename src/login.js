require('bootstrap/dist/css/bootstrap.min.css')
require('./css/app.min.css')
require('./css/theme.min.css')
$(document).ready(function(){
  $('#login-form').submit(function() {

    var data = {
      username : $('#login-form-username').val(),
      password : $('#login-form-password').val()
    }
    console.log(data)
    // $.getJSON('https://192.168.20.34/cgi-php/core.php?module=user&action=login_init',function(data) {
    //   console.log(data.data);
    //   var username, password;
    //   username = $('#login-form-username').val();
    //   password = $('#login-form-password').val();
    //   $.getJSON('https://192.168.20.34/cgi-php/core.php',{
    //     module: 'user',
    //     action: 'login',
    //     user_name: username,
    //     password: md5(username+data.data+password)
    //   },function(data) {
    //     if (data.code===0) {
    //       location.href="/";
    //     };
    //   });
    // });
    return false
  })
})