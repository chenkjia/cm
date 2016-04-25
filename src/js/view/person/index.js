var Table = require('../table');
var operationTpl = require('../table/operation.html');
module.exports = {
  view: Backbone.View.extend(Table.view({
    name: 'person',
    label: '住民',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    popup:{
      size: null
    },
    filter:{
      select:true
    },
    columnsPure:[
      {
        field: "name",
        title: "住民名称",
        create: true,
        update: true,
        popup:{
          modal: ['create','update'],
          type: 'input',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'input'
        },
      },
      {
        data: "line",
        title: "线路名",
        type: 'array',
        option:{
          url: 'router/connector/wan-table.json',
          value: 'id',
          label: 'name'
        },
        filter: {
          type: 'select'
        },
      }
    ],
    customEvents:{
      'click #table_wrapper .table-operation-line-btn':'operationline',
      'click #table_wrapper .table-operation-deleteLine-btn':'operationdeleteLine'
    },
    cuntomOperation:[{label:'查看线路',name:'line',icon:'eye'}],
    customFunctions:{
      operationline:function (event) {
        var el = $(event.currentTarget)
        var tr = el.parents('tr');
        var data = this.rowData(event);
        var columns = _.filter(this.settings.columns,'line');
        if(this.table.api().row(tr).child.isShown()){
          el.html('<i class="fa fa-eye"></i> 查看线路');
          this.table.api().row(tr).child.hide();
          tr.removeClass('active');
        } else {
          el.html('<i class="fa fa-eye-slash"></i> 收起线路');
          this.table.api().row(tr).child('<table id="table-line-'+data.id+'"></table>','active').show();
          var lines = _.find(this.settings.columns,['data','line']).options;
          $('#table-line-'+data.id).DataTable({
            dom: 't',
            data: _.filter(lines,function(line){
              return data.line.indexOf(line['id'])!=-1
            }),
            columns:[
              {
                data: "name",
                title: "线路名"
              },{
                name: "operation",
                title: "操作",
                filter:{
                  type: 'button'
                },
                render: function(data, type, full, meta) {
                  return operationTpl({
                    operation:[],
                    row: meta.row,
                    cuntomOperation:[{label:'移出群组',name:'deleteLine',icon:'trash-o'}]
                  });
                }
              }
            ]
          });
          tr.addClass('active');
        }
      },
      operationdeleteLine:function(event) {
        var data = this.rowData(event);
        bootbox.dialog({
          message: '确定要移除线路【'+data.name+'】吗？',
          buttons: {
            cancel: {
              label: '取消'
            },
            delete: {
              label: "移除",
              className: "btn-danger",
              callback: function() {
                console.log(data)
              }
            }
          }
        });
      }
    },
  }))
};