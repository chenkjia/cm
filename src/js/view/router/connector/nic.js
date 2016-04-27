var Common = require('../../../common');
var Table = require('../../table');
module.exports = {
  view: Backbone.View.extend(Table.view({
    label: '网卡',
    key:'ifname',
    sort: true,
    operation: ['update'],
    url:{
      list: 'router/connector/nic-table.json',
      update: 'update',
      // list:Common.url+'?module=nic&action=load_nic_info',
      // update:Common.url+'?module=nic&action=set_nic_link'
    },
    switch:true,
    popup:{
      size: null,
      switch:true,
      select:true
    },
    filter:{
      select:true
    },
    columnsPure:[{
      data: "ifname",
      title: "网卡名称",
      filter:{
        type: 'input'
      },
    },{
      data: "dev",
      title: "设备名",
      popup:{
        modal:['create','update'],
        type: 'input'
      },
      filter:{
        type: 'input'
      },
    },{
      data: "enable",
      title: "启用状态",
      type: 'switch',
      popup: {
        modal:['update'],
        type: 'switch',
        switchChange:function (state) {
          $('.form-switch-off[name="enable"]').prop('checked',!state);
        }
      },
      filter:{
        type: 'select'
      },
      options:[{
        label:'启用',color:"success",value:true
      },{
        label:'禁用',color:"danger",value:false
      }]
    },{
      data: "usage",
      title: "网卡分配",
      type: 'select',
      popup:{
        modal:['update'],
        type: 'select',
      },
      filter: {
        type: 'select'
      },
      options:[
        { label:'未使用',value:'none' },
        { label:'局域网接口',value:'wan' },
        { label:'广域网接口',value:'lan' }
      ],
    },{
      data: "link_conf.auto_negotiation",
      title: "是否自动协商",
      type: 'switch',
      popup: {
        modal:['update'],
        type: 'switch',
        switchChange:function (state) {
          $('.form-switch-off[name="auto_negotiation"]').prop('checked',!state);
        }
      },
      filter:{
        type: 'select'
      },
      options:[{
        label:'自动协商',color:"success",value:true
      },{
        label:'强制设置',color:"danger",value:false
      }]

    // },{
    //   data: "assign",
    //   title: "网卡分配",
    //   type: 'select',
    //   popup:{
    //     modal:['assign'],
    //     type: 'radio',
    //   },
    //   filter: {
    //     type: 'select'
    //   },
    //   options:[
    //     { label:'局域网',value:0 },
    //     { label:'广域网',value:1 }
    //   ],
    // },{
    //   data: "mode",
    //   title: "模式",
    //   type: "select",
    //   popup: {
    //     modal: ['update'],
    //     type: 'radio'
    //   },
    //   filter: {
    //     type: 'select'
    //   },
    //   options:[
    //     {label:'自动协商',value:0},
    //     {label:'强制设置',value:1}
    //   ]
    },{
      data: "link_conf.duplex",
      title: "双工",
      type: "select",
      popup: {
        modal: ['update'],
        type: 'select'
      },
      filter:{
        type: 'select'
      },
      options:[
        {label:'半双工',value:'half'},
        {label:'全双工',value:'full'}
      ]
    // },{
    //   data: "link_conf.speed",
    //   title: "速度",
    //   popup: {
    //     modal: ['update'],
    //     type: 'input'
    //   },
    //   filter:{
    //     type: 'input'
    //   },
    // },{
    //   data: "link_conf.mtu",
    //   title: "MTU",
    //   popup: {
    //     modal: ['update'],
    //     type: 'input'
    //   },
    //   filter:{
    //     type: 'input'
    //   },
    }],
    customEvents:{
      'click #table_wrapper .table-operation-assign-btn':'operationAssign',
    },
    cuntomOperation:[{label:'网卡分配',name:'assign',icon:'usb'}],
    customFunctions:{
      operationAssign:function (event) {
        var data = this.rowData(event);
        var columns = _.filter(this.settings.columns,function(column){
          return column.popup&&column.popup.modal&&column.popup.modal.indexOf('assign')!=-1;
        });
        this.popup({
          title:'网卡【'+data[this.settings.key]+'】',
          action:'update',
          columns:columns,
          data:data,
        });
      },
    },
  })),
};