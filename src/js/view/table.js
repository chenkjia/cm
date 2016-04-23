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
    var tpl = _.template('<table id="table"></table>');
    $('#main').html(tpl());
    settings.columns = this.columnsInit(settings);
    this.render(settings);
  },
  render: function(settings) {
    var that = this;
    this.settings.key = this.settings.key||'name';
    $.ajax({
      url: Common.url +'classes/'+ settings.name,
      type: 'get',
      dataType: 'json'
    })
    .done(function(data) {
      console.log(data);
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
    this.table = $('#table').bootstrapTable({
      url: Common.url +'classes/'+ settings.name,
      responseHandler:function(data) {
        return data.results
      },
      columns: settings.columns
    })
    // this.table = $('#table').bootstrapTable({
    //   ajax: {
    //     url: Common.url + settings.url.list,
    //     dataSrc: 'data'
    //   },
    //   fixedHeader: {
    //     header: false,
    //     footer: true
    //   },
    //   columns: settings.columns,
    //   initComplete: function() {
    //     that.filterInit(this.api().columns());
    //     $('#table .group-checkable,.ColVis_collection input').uniform();
    //     if (settings.toolbar) {
    //       $('#table_wrapper .dataTables-toolbar').html(toolbarTpl({
    //         label:settings.label,
    //         toolbar:settings.toolbar
    //       }));
    //     }
    //     if (settings.batch||settings.cuntomBatch) {
    //       $('#table').addClass('table-checkable');
    //       $('#table_wrapper .dataTables-batch').html(batchTpl({
    //         batch:settings.batch||[],
    //         cuntomBatch:settings.cuntomBatch||[]
    //       }));
    //     }
    //   },
    //   drawCallback: function() {
    //     Common.uniCheckbox($(this).find('.checkboxes'));
    //     if (that.settings.tooltip===true) {
    //       $('#table .table-tooltip').popover({
    //         trigger: 'hover',
    //         placement: 'top',
    //         container: 'body',
    //       });
    //     }
    //     if (that.settings.switch===true) {
    //       $('#table .table-switch').bootstrapSwitch({
    //         size: 'mini'
    //       });
    //     }
    //   }
    // });
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
  },
  validate:function(columns) {
    var rules = {};
    _.forEach(columns,function(column) {
      if (column.popup.rule) {
        rules[column.data] = column.popup.rule;
      }
    });
    var form = $('#popup-form');
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
        $.getJSON(form.attr('action')+'&'+form.serialize(), function(data) {
          console.log(data);
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
        action:  Common.url + this.settings.url.update,
        columns:columns,
        data:data,
      });
    },
    delete: function (event) {
      var data = this.rowData(event);
      bootbox.dialog({
        message: '确定要删除'+this.settings.label+'【'+data[this.settings.key]+'】吗？',
        buttons: {
          cancel: {
            label: '取消'
          },
          delete: {
            label: "删除",
            className: "btn-danger",
            callback: function() {
              console.log(data);
            }
          }
        }
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
      column['name'] = column['field'];
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
          if (column.option.value||column.option.label) {
            column.options = _.map(data.data,function (option) {
              return {
                value: option[column.option.value],
                label: option[column.option.label]
              }
            });
          }
        });
      }
      if(column.type==='select'){
        column['render'] = function(data, type, full, meta) {
          return data===null?'':_.find(meta.settings.aoColumns[meta.col].options,['value',data]).label;
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
        formatter: function(value, row, index) {
          return index+1;
        }
      });
    }
    if((settings.batch||settings.cuntomBatch)&&_.findIndex(columns,['name','checkbox'])==-1){
      columns.unshift({
        name: 'checkbox',
        data: 'objectId',
        noVis: true,
        title: '<input type="checkbox" class="group-checkable" data-set="#table tr td:first-child .checkboxes"/>',
        searchable: false,
        className: 'text-center',
        formatter: function(value, row, index) {
          return '<input type="checkbox" class="checkboxes" value="' + value + '"/>';
        }
      });
    }
    if(settings.operation||settings.cuntomOperation){
      columns.push({
        name: "operation",
        title: "操作",
        formatter: function(value, row, index) {
          return operationTpl({
            operation:settings.operation||[],
            row:index,
            cuntomOperation:settings.cuntomOperation||[]
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