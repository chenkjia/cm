// bootbox
bootbox.setDefaults({  
  locale: "zh_CN",  
  // show: true,
  container: '#main',
  backdrop: true, 
  animate: false, 
});

$.ajaxSetup({
  cache: true,
  headers:{
    "X-Parse-Application-Id":"cm"
  }
});
$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
  swal({
    title: jqxhr.responseJSON.code||jqxhr.responseJSON.error,
    text: jqxhr.responseJSON.error,
    type: "error",
    confirmButtonText: "确认" 
  });
});
// validator
$.extend($.validator.messages, {  
    required: "必选字段",   
    remote: "请修正该字段",   
    email: "请输入正确格式的电子邮件",   
    url: "请输入合法的网址",  
    date: "请输入合法的日期",   
    dateISO: "请输入合法的日期 (ISO).",  
    number: "请输入合法的数字",   
    digits: "只能输入整数",   
    creditcard: "请输入合法的信用卡号",   
    equalTo: "请再次输入相同的值",   
    accept: "请输入拥有合法后缀名的字符串",   
    maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),   
    minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),   
    rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),   
    range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),   
    max: $.validator.format("请输入一个最大为 {0} 的值"),  
    min: $.validator.format("请输入一个最小为 {0} 的值")
});

$.validator.addMethod("ip", function(value, element) {    
  return this.optional(element) || /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(value);    
}, "请填写正确的IP地址。");

$.validator.addMethod("mac", function(value, element) {   
  return this.optional(element) || /^([0-9a-fA-F]{2})(([/\s:-][0-9a-fA-F]{2}){5})$/.test(value);    
}, "请填写正确的MAC地址。");