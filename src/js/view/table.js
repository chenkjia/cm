var Common = require('../common');
var filter = require('./table/filter');
var popupTpl = _.template(require('./table/popup.html'));
var operationTpl = _.template(require('./table/operation.html'));
var toolbarTpl = _.template(require('./table/toolbar.html'));
var batchTpl = _.template(require('./table/batch.html'));
module.exports = {
  functionlist : ['toolbar','batch','operation'],
  initialize: function(){
    var settings = this.settings;
    $('#page-title').html(settings.name);
    var tpl = _.template('<form id="table-filter"><table id="table"></table></form>');
    $('#main').html(tpl());
    settings.columns = this.columnsInit(settings);
    this.render(settings);
    $('.table-scrollable').css('min-height',$(window).height()-224);
  },
  render: function(settings) {
    var that = this;
    this.settings.key = this.settings.key||'name';
    this.table = $('#table').dataTable({
      ajax: {
        url: Common.url + settings.url.list,
        dataSrc: 'results'
      },
      columns: settings.columns,
      initComplete: function() {
        that.filterInit(this.api().columns());
        $('#table .group-checkable,.ColVis_collection input').uniform();
        if (settings.toolbar) {
          $('#table_wrapper .dataTables-toolbar').html(toolbarTpl({
            label:settings.label,
            toolbar:settings.toolbar
          }));
        }
        if (settings.batch||settings.customBatch) {
          $('#table').addClass('table-checkable');
          $('#table_wrapper .dataTables-batch').html(batchTpl({
            batch:settings.batch||[],
            customBatch:settings.customBatch||[]
          }));
        }
      },
      drawCallback: function() {
        Common.uniCheckbox($(this).find('.checkboxes'));
        $('#table_wrapper [name="table_length"]').selectpicker({width:'auto'});
        if (that.settings.tooltip===true) {
          $('#table .table-tooltip').popover({
            trigger: 'hover',
            placement: 'top',
            container: 'body',
          });
        }
        if (that.settings.switch===true) {
          $('#table .table-switch').bootstrapSwitch({
            size: 'mini'
          });
        }
      }
    });
  },
  events:function(settings) {
    var events = settings.customEvents||{};
    events['change #table .group-checkable'] = 'checkGroup';
    events['submit #table-filter'] = 'filterSubmit';
    events['click #table .filter-cancel'] = 'filterReset';
    _.forEach(this.functionlist, function(el) {
      _.forEach(settings[el], function(item) {
        events['click #table_wrapper .table-'+el+'-'+item+'-btn'] = el+item;
      });
    });
    return events;
  },
  popup:function(popup) {
    var that = this;
    bootbox.dialog({
      size: popup.size,
      title: popup.title,
      message: popupTpl(popup),
      buttons: {
        cancel: {
          label: '取消'
        },
        submit: {
          label: '提交',
          className: 'green',
          callback: function(event) {
            $('#popup-form').submit();
            return false;
          }
        }
      }
    });
    that.popupRender(that.settings.popup);
    $('#popup-form input,#popup-form select').on('focus',this.helpShow).on('blur',this.helpHide);
    _.forEach(popup.columns,function(column){
      if(column.popup.handleChange){
        $('#popup-form [name="'+column.name+'"]').on('change',function() {
          column.popup.handleChange($(this).val());
        });
        column.popup.handleChange(popup.data[column.name]);
      }
      if(column.popup.switchChange){
        $('#popup-form [name="'+column.name+'"]').on('switchChange.bootstrapSwitch',function(event,state) {
          column.popup.switchChange(state);
        });
        column.popup.switchChange(popup.data[column.name]);
      }
    });
    that.validate(popup.columns);
  },
  popupRender: function(popup){
    if(popup.radio){
      $('#popup-form .form-radio').uniform();
    }
    if(popup.select){
      $('#popup-form .form-select').selectpicker();
    }
    if(popup.switch){
      $('#popup-form .form-switch').bootstrapSwitch();
    }
    if(popup.date){
      $('#popup-form .form-date').daterangepicker({
          "singleDatePicker": true,
          "maxDate":moment().format('YYYY-MM-DD')
      });
    }
  },
  validate:function(columns) {
    var rules = {};
    var form = $('#popup-form');
    _.forEach(columns,function(column) {
      if (column.popup.rule) {
        rules[column.data] = column.popup.rule;
      }
    });
    var that = this;
    return form.validate({
      errorElement: 'span',
      errorClass: 'help-block',
      focusInvalid: false,
      ignore: "",
      rules: rules,
      highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
      },
      unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
      },
      submitHandler: function() {
        var params = Common.formFormat(form.serializeArray());
        _.forEach(columns,function(column) {
          if (column.pointer) {
            params[column.data] = {
              "__type": "Pointer",
              "className": column.pointer,
              "objectId": params[column.data]
            };
          }
        });
        $.ajax({
          url: form.attr('action'),
          type: form.attr('method'),
          contentType:'application/json',
          dataType: 'json',
          data: JSON.stringify(params)
        })
        .done(function(data) {
          that.table.api().ajax.reload(null,false);
          $('.bootbox').modal('hide');
        });
        return false;
      }
    });
  },
  helpShow:function() {
    $(this).parents('.form-group').find('.help').show();
  },
  helpHide:function() {
    $(this).parents('.form-group').find('.help').hide();
  },
  rowData: function(event) {
    var data, tr;
    tr = $(event.currentTarget).attr('data-row');
    data = this.table.api().context[0].aoData[tr]._aData;
    return data;
  },
  toolbar:{
    create: function (event) {
      var columns = _.filter(this.settings.columns,function(column){
        return column.popup&&column.popup.modal&&column.popup.modal.indexOf('create')!=-1;
      });
      this.popup({
        size: this.settings.popup.size,
        title:'添加新'+this.settings.label,
        method: 'post',
        action: Common.url + this.settings.url.create,
        columns:columns,
        data:{},
      });
    },
  },
  operation:{
    update: function (event) {
      var data = this.rowData(event);
      var columns = _.filter(this.settings.columns,function(column){
        return column.popup&&column.popup.modal&&column.popup.modal.indexOf('update')!=-1;
      });
      this.popup({
        size: this.settings.popup.size,
        title:'编辑'+this.settings.label+'【'+data[this.settings.key]+'】',
        method: 'put',
        action:  Common.url + this.settings.url.update + '/'+data.objectId,
        columns: columns,
        data: data,
      });
    },
    delete: function (event) {
      var data = this.rowData(event);
      var that = this;
      swal({
        title: '确定要删除吗？',
        text: '确定要删除'+this.settings.label+'【'+data[this.settings.key]+'】吗？',
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "不, 别删除!",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "是的, 删除!"
      }, function(){
        $.ajax({
          url: Common.url + that.settings.url.delete + '/'+data.objectId,
          type: 'DELETE',
          dataType: 'json'
        })
        .done(function() {
          that.table.api().ajax.reload(null,false);
        })
      });
    },
  },
  batch:{
    update: function (event) {
      var columns = _.filter(this.settings.columns,'popup');
      this.popup({title:'编辑'+this.settings.label,columns:columns});
      var data = this.rowData(event);
    },
    delete: function (event) {
      console.log('batchdelete');
    },
  },
  columnsInit:function(settings) {
    var columns = _.clone(settings.columnsPure);
    _.map(columns,function (column) {
      column['name'] = column['data'];
      if(column.option&&!column.options){
        $.ajax({
          url:  Common.url + column.option.url,
          async: false,
          type: 'get'
        })
        .done(function(data) {
          if(!_.isObject(data)){
            data = JSON.parse(data);
          }
          var value = column.option.value||'value';
          var label = column.option.label||'label';
          column.options = _.map(data.results,function (option) {
            option.value = option[value];
            option.label = option[label];
            option.subtext = _.join(pinyin(option[label],{style: pinyin.STYLE_FIRST_LETTER}),'');
            return option
          });
        });
      }
      if(column.type==='select'){
        column['render'] = function(data, type, full, meta) {
          var column = meta.settings.aoColumns[meta.col];
          return data===null?'':_.find(column.options,['value',column.pointer?data.objectId:data]).label;
        };
      }
      if(column.type==='switch'){
        column['render'] = function(data, type, full, meta) {
          var options = meta.settings.aoColumns[meta.col].options;
          var check = data===options[0].value?"checked":"";
          return '<input type="checkbox" class="table-switch" data-on-color="'+options[0].color+'" data-off-color="'+options[1].color+'" data-on-text="'+options[0].label+'" data-off-text="'+options[1].label+'" '+check+' />';
        };
      }
      if(column.type==='date'){
        column['render'] = function(data, type, full, meta) {
          return moment.unix(data).format('YYYY-MM-DD HH:mm:ss');
        };
      }
      if(column.type==='array'){
        column['render'] = function(data, type, full, meta) {
          var list = _.filter(meta.settings.aoColumns[meta.col].options,function(item) {
            return data.indexOf(item.value)!=-1;
          });
          var html = '';
          _.forEach(list,function(item){
            html+= '，'+item.label;
          });
          return html.substr(1);
        };
      }
    });
    if(settings.sort&&_.findIndex(columns,['name','sort'])==-1){
      columns.unshift({
        name: 'sort',
        title: '序号',
        searchable: false,
        className: 'text-center',
        render: function(data, type, full, meta) {
          return meta.row + 1;
        }
      });
    }
    if((settings.batch||settings.customBatch)&&_.findIndex(columns,['name','checkbox'])==-1){
      columns.unshift({
        name: 'checkbox',
        data: 'id',
        noVis: true,
        title: '<input type="checkbox" class="group-checkable" data-set="#table tr td:first-child .checkboxes"/>',
        searchable: false,
        className: 'text-center',
        render: function(data, type, full, meta) {
          return '<input type="checkbox" class="checkboxes" value="' + data + '"/>';
        }
      });
    }
    if(settings.operation||settings.customOperation){
      columns.push({
        name: "operation",
        title: "操作",
        noVis: true,
        filter:{
          type: 'button'
        },
        render: function(data, type, full, meta) {
          return operationTpl({
            operation:settings.operation||[],
            row:meta.row,
            customOperation:settings.customOperation||[]
          });
        }
      });
    }
    return columns;
  },
  checkGroup: function(event) {
    return Common.checkGroup($(event.currentTarget));
  },
  view:function(settings) {
    var customView = settings.customFunctions||{};
    var that = this;
    var view = _.assign(customView,{
      el: '#main',
      settings:settings,
      events:this.events(settings),
      initialize:this.initialize,
      render:this.render,
      columnsInit:this.columnsInit,
      checkGroup:this.checkGroup,
      popup:this.popup,
      popupRender:this.popupRender,
      validate:this.validate,
      rowData:this.rowData,
      helpShow:this.helpShow,
      helpHide:this.helpHide,
      filterInit:filter.filterInit,
      filterReset:filter.filterReset,
      filterSubmit:filter.filterSubmit,
    });
    _.forEach(this.functionlist, function(el) {
      _.forEach(settings[el], function(item) {
        view[el+item] = that[el][item];
      });
    });
    return view;
  }
};