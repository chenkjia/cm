var Table = require('../../table');
module.exports = {
  view: Backbone.View.extend(Table.view({
    label: '静态分配',
    key:'ip',
    sort: true,
    toolbar: ['create'],
    operation: ['delete'],
    batch: ['delete'],
    url:{
      list: '/router/dhcp/static-table.json',
      create: 'create',
      update: 'update',
    },
    switch:true,
    popup:{
      size: null,
      switch:true
    },
    filter:{
      select:true
    },
    columnsPure:[{
      data: "ip",
      title: "IP地址",
      popup: {
        modal:['create'],
        type: 'input',
        rule:{
          required: true,
          ip:true
        }
      },
      filter:{
        type: 'input'
      }
    },{
      data: "mac",
      title: "MAC地址",
      popup: {
        modal:['create'],
        type: 'input',
        rule:{
          required: true,
          mac: true
        }
      },
      filter:{
        type: 'input'
      }
    },{
      data: "enable",
      title: "启用状态",
      type: 'switch',
      popup: {
        modal:['create'],
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