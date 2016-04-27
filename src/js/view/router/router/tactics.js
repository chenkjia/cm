var Table = require('../../table');
module.exports = {
  view: Backbone.View.extend(Table.view({
    label: '路由',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    batch: ['update','delete'],
    url:'/router/router/tactics-table.json',
    switch:true,
    popup:{
      size: null,
      select:true,
      radio:true,
      switch:true
    },
    filter:{
      select:true
    },
    columnsPure:[{
      data: "type",
      title: "协议类型",
      type: 'select',
      popup: {
        modal:['create','update'],
        type: 'select',
        rule:{
          required:true
        },
        handleChange:function(status){
          if(status==='1'||status==='2'){
            $('#popup-form [name="sourcePort"],#popup-form [name="targetPort"]').prop('disabled',false).parents('.form-group').show();
          } else {
            $('#popup-form [name="sourcePort"],#popup-form [name="targetPort"]').prop('disabled',true).parents('.form-group').hide();
          }
        }
      },
      filter: {
        type: 'select'
      },
      options:[{
        label:'All',value:"0"
      },{
        label:'TCP',value:"1"
      },{
        label:'UDP',value:"2"
      },{
        label:'ICMP',value:"3"
      }]
    },{
      data: "sourceType",
      title: "源网段/运营商",
      render: function(data, type, full, meta) {
        if (data==='1') {
          return full.sourceNetwork;
        }else{
          return _.find(_.find(meta.settings.aoColumns,['data','sourceISP']).options,['value',full.sourceISP]).label;
        }
      },
      popup: {
        modal:['create','update'],
        type: 'radio',
        handleChange:function(status){
          switch(status){
            case '1':
              $('#popup-form [name="sourceNetwork"]').prop('disabled',false).parents('.form-group').show();
              $('#popup-form [name="sourceISP"]').prop('disabled',true).parents('.form-group').hide();
              break;
            case '2':
              $('#popup-form [name="sourceNetwork"]').prop('disabled',true).parents('.form-group').hide();
              $('#popup-form [name="sourceISP"]').prop('disabled',false).parents('.form-group').show();
              break;
            default:
              $('#popup-form [name="sourceNetwork"],#popup-form [name="sourceISP"]').prop('disabled',true).parents('.form-group').hide();
          }
        }
      },
      filter:{
        type: 'input'
      },
      options:[{
        label:'网段',value:"1"
      },{
        label:'运营商',value:"2"
      }]
    },{
      data: "sourceNetwork",
      title: "源网段",
      visible: false,
      defaultContent:'',
      noVis:true,
      popup: {
        modal:['create','update'],
        type: 'input'
      }
    },{
      data: "sourceISP",
      title: "源运营商",
      type: 'select',
      visible: false,
      defaultContent:'',
      noVis:true,
      popup: {
        modal:['create','update'],
        type: 'select'
      },
      options:[{
        label:'中国电信',value:"1"
      },{
        label:'中国联通',value:"2"
      },{
        label:'中国移动',value:"3"
      }]
    },{
      data: "sourcePort",
      title: "源端口",
      popup: {
        modal:['create','update'],
        type: 'input'
      },
      filter:{
        type: 'input',
        size: '50px',
      }
    },{
      data: "targetType",
      title: "目的网段/运营商",
      render: function(data, type, full, meta) {
        if (data==='1') {
          return full.targetNetwork;
        }else{
          return _.find(_.find(meta.settings.aoColumns,['data','targetISP']).options,['value',full.targetISP]).label;
        }
      },
      popup: {
        modal:['create','update'],
        type: 'radio',
        handleChange:function(status){
          switch(status){
            case '1':
              $('#popup-form [name="targetNetwork"]').prop('disabled',false).parents('.form-group').show();
              $('#popup-form [name="targetISP"]').prop('disabled',true).parents('.form-group').hide();
              break;
            case '2':
              $('#popup-form [name="targetNetwork"]').prop('disabled',true).parents('.form-group').hide();
              $('#popup-form [name="targetISP"]').prop('disabled',false).parents('.form-group').show();
              break;
            default:
              $('#popup-form [name="targetNetwork"],#popup-form [name="targetISP"]').prop('disabled',true).parents('.form-group').hide();
          }
        }
      },
      filter:{
        type: 'input'
      },
      options:[{
        label:'网段',value:"1"
      },{
        label:'运营商',value:"2"
      }]
    },{
      data: "targetNetwork",
      title: "目的网段",
      visible: false,
      defaultContent:'',
      noVis:true,
      popup: {
        modal:['create','update'],
        type: 'input'
      }
    },{
      data: "targetISP",
      title: "目的运营商",
      type: 'select',
      visible: false,
      defaultContent:'',
      noVis:true,
      popup: {
        modal:['create','update'],
        type: 'select'
      },
      options:[{
        label:'中国电信',value:"1"
      },{
        label:'中国联通',value:"2"
      },{
        label:'中国移动',value:"3"
      }]
    },{
      data: "targetPort",
      title: "目的端口",
      popup: {
        modal:['create','update'],
        type: 'input'
      },
      filter:{
        type: 'input',
        size: '50px'
      }
    },{
      data: "dscp",
      title: "DSCP",
      visible: false,
      defaultContent:'',
      popup: {
        modal:['create','update'],
        type: 'input',
        help: '0 ~ 63，0表示忽略',
        rule:{
          min: 0,
          max: 63
        }
      },
      filter:{
        type: 'input'
      }
    },{
      data: "balanced",
      title: "均衡策略",
      type: 'select',
      visible: false,
      defaultContent:'',
      popup: {
        modal:['create','update'],
        type: 'select'
      },
      filter:{
        type: 'select'
      },
      options:[{
        label:'智能',value:"1"
      },{
        label:'PCC',value:"2"
      },{
        label:'会话数',value:"3"
      }]
    },{
      data: "enable",
      title: "启用状态",
      type: 'switch',
      popup: {
        modal:['create','update'],
        type: 'switch',
        switchChange:function (state) {
          $('.form-switch-off[name="enable"]').prop('checked',!state);
        }
      },
      filter:{
        type: 'select'
      },
      options:[{
        label:'启用',color:"success",value:"1"
      },{
        label:'禁用',color:"danger",value:"0"
      }]
    },{
      data: "remark",
      title: "备注",
      popup:{
        modal:['create'],
        type: 'input',
      },
      filter:{
        type: 'input'
      }
    }]
  })),
};