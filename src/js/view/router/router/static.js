var Table = require('../../table');
module.exports = {
  view: Backbone.View.extend(Table.view({
    label: '路由',
    sort: true,
    toolbar: ['create'],
    operation: ['delete'],
    batch: ['delete'],
    url:'/router/router/static-table.json',
    popup:{
      size: null
    },
    filter:{
      select:true
    },
    columnsPure:[{
      data: "name",
      title: "网络接口",
      popup: {
        modal:['create'],
        type: 'input',
        rule:{
          required: true
        }
      },
      filter:{
        type: 'input'
      }
    },{
      data: "ip",
      title: "目的网络",
      popup: {
        modal:['create'],
        type: 'input',
        rule:{
          required: true,
          ip: true
        }
      },
      filter:{
        type: 'input'
      }
    },{
      data: "mask",
      title: "目的掩码",
      popup: {
        modal:['create'],
        type: 'input',
        rule:{
          required: true,
          ip: true
        }
      },
      filter:{
        type: 'input'
      }
    },{
      data: "gateway",
      title: "网关地址",
      popup: {
        modal:['create'],
        type: 'input',
        rule:{
          required: true,
          ip: true
        }
      },
      filter:{
        type: 'input'
      }
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