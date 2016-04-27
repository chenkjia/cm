var Table = require('../../table');
module.exports = {
  view: Backbone.View.extend(Table.view({
    label: '线路',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    batch: ['update','delete'],
    url:{
      list: 'router/connector/lan-table.json',
      create: 'create',
      update: 'update',
    },
    popup:{
      size: null,
      select: true,
      radio: true,
    },
    filter:{
      select:true
    },
    columnsPure:[{
      data: "name",
      title: "线路名称",
      popup: {
        modal:['create','update'],
        type: 'input',
        rule:{
          required: true
        }
      },
      filter:{
        type: 'input'
      },
    },{
      data: "netport",
      title: "网络接口",
      type: "select",
      popup: {
        modal:['create','update'],
        type: 'select'
      },
      filter:{
        type: 'select'
      },
      options:[
        { label:'eth1',value:0 },
        { label:'eth0',value:1 }
      ]
    },{
      data: "model",
      title: "型号",
      popup: {
        modal:['create','update'],
        type: 'input'
      },
      filter:{
        type: 'input'
      },
    },{
      data: "vlan",
      title: "VLAN",
      visible: false,
      defaultContent:'',
      popup: {
        modal:['create','update'],
        type: 'input',
        help: '数值或范围，例如"100"或"200-300"'
      },
      filter:{
        type: 'input'
      },
    },{
      data: "mac",
      title: "MAC地址",
      popup: {
        modal:['create','update'],
        type: 'input',
        rule:{
          required: true,
          mac: true
        }
      },
      filter:{
        type: 'input'
      },
    },{
      data: "status",
      title: "状态",
      render: function(data, type, full, meta) {
        var status = _.find(_.find(meta.settings.aoColumns,['data','status']).options,['value',data]).label;
        var speed = _.find(_.find(meta.settings.aoColumns,['data','speed']).options,['value',full.speed]).label;
        var mode = _.find(_.find(meta.settings.aoColumns,['data','mode']).options,['value',full.mode]).label;
        return status+'/'+speed+'/'+mode;
      },
      filter:{
        type: 'select'
      },
      options:[
        {label:'禁用',value:0},
        {label:'启用',value:1}
      ]
    },{
      data: "ip",
      title: "IP地址",
      popup: {
        modal:['create','update'],
        type: 'input',
        help: 'IP地址，形如 192.168.0.1',
        rule:{
          required: true,
          ip: true
        }
      },
      filter:{
        type: 'input'
      },
    },{
      data: "mask",
      title: "掩码",
      type: "select",
      visible: false,
      defaultContent: '',
      popup: {
        modal:['create','update'],
        type: 'select'
      },
      filter:{
        type: 'select'
      },
      options:[
        {label:'255.255.255.0|24',value:0},
        {label:'255.255.0.0|24',value:1}
      ]
      
    },{
      data: "extendIp",
      title: "扩展IP",
      popup: {
        modal:['create','update'],
        type: 'input',
        rule:{
          required: true,
          ip: true
        }
      }
    },{
      data: "mode",
      title: "模式",
      type: "select",
      visible: false,
      noVis:true,
      defaultContent: '',
      popup: {
        modal: ['link'],
        type: 'radio'
      },
      filter: {
        type: 'select'
      },
      options:[
        {label:'自动协商',value:0},
        {label:'强制设置',value:1}
      ]
    },{
      data: "speed",
      title: "速度",
      type: "select",
      visible: false,
      noVis:true,
      defaultContent: '',
      popup: {
        modal: ['link'],
        type: 'select'
      },
      filter:{
        type: 'select'
      },
      options:[
        {label:'1000M',value:0},
        {label:'10000M',value:1}
      ],
    }],
    // customEvents:{
    //   'click #table_wrapper .table-operation-link-btn':'operationLink'
    // },
    // cuntomOperation:[{label:'链路设置',name:'link',icon:'link'}],
    // customFunctions:{
    //   operationLink:function (event) {
    //     var data = this.rowData(event);
    //     var columns = _.filter(this.settings.columns,function(column){
    //       return column.popup&&column.popup.modal&&column.popup.modal.indexOf('link')!=-1;
    //     });
    //     this.popup({
    //       title:'链路设置【'+data.name+'】',
    //       action:'update',
    //       columns:columns,
    //       data:data,
    //     });
    //   }
    // },
  })),
};