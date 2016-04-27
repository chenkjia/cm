var Common = require('../common');
var formTpl = require('./form/form.html');
module.exports = {
  initialize: function(){
    var settings = this.settings;
    settings.columns = this.columnsInit(settings);
    $('#page-title').html(settings.name);
    this.formInit(settings);
  },
  events:{
    'submit #main-form': 'submit',
    'switchChange.bootstrapSwitch #main-form .form-switch':'switch',
  },
  switch:function(event,state){
    $('#main .form-switch-off[name="'+$(event.currentTarget).attr('name')+'"]').prop('checked',!state);
  },
  submit: function(event){
    var data = $('#main-form').serializeArray();
    console.log(data);
    return false;
  },
  formRender: function(settings) {
    if (settings.form.indexOf('switch')!=-1) {
      $('#main-form .form-switch').bootstrapSwitch();
    }
  },
  formInit:function(settings){
    var render = this.formRender;
    $.ajax({
      url: settings.url.read,
      type: 'get',
      dataType: 'json'
    })
    .done(function(data) {
      $('#main').html(formTpl({
        data: data.data,
        columns: settings.columns,
        method: 'get',
        action: settings.url.update
      }));
      render(settings);
    });
  },
  columnsInit:function(settings) {
    var columns = _.clone(settings.columnsPure);
    _.map(columns,function (column) {
      column['name'] = column['data'];
    });
    return columns;
  },
  view:function(settings) {
    var that = this;
    var view = {
      el: '#main',
      settings:settings,
      initialize:this.initialize,
      formRender:this.formRender,
      formInit:this.formInit,
      columnsInit:this.columnsInit,
      events:this.events,
      switch:this.switch,
      submit:this.submit,
      // validate:this.validate,
      // helpShow:this.helpShow,
      // helpHide:this.helpHide
    };
    return view;
  }
};