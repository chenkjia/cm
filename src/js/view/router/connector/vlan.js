var Table = require('../../table');
module.exports = {
  view: Backbone.View.extend(Table.view({
    label: 'VLAN',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    url:{
      list: 'router/connector/vlan-table.json',
      create: 'create',
      update: 'update',
    },
    popup:{
      size: null,
      select:true
    },
    filter:{
      select:true
    },
    columnsPure:[
      {
        data: "name",
        title: "网口名称",
        popup:{
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
        data: "type",
        title: "类型",
        type: 'select',
        popup: {
          modal:['create','update'],
          type: 'select'
        },
        filter: {
          type: 'select'
        },
        options:[{
          value: 1,
          label: 'VLAN(用于扩展物理接口)'
        },{
          value: 2,
          label: 'VLAN(用于扩展物理接口)2'
        }],
      },{
        data: "port",
        title: "网口",
        popup:{
          modal:['create','update'],
          type: 'input',
        },
        filter:{
          type: 'input'
        },
      },{
        data: "remark",
        title: "备注",
        popup:{
          modal:['create','update'],
          type: 'input',
        },
        filter:{
          type: 'input'
        },
      }
    ]
  })),
};