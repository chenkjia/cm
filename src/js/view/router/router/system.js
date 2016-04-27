var Table = require('../../table');
module.exports = {
  view: Backbone.View.extend(Table.view({
    label: '路由',
    sort: true,
    url:'/router/router/system-table.json',
    filter:{
      select:true
    },
    columnsPure:[{
      data: "ip",
      title: "目的网络",
      filter:{
        type: 'input'
      }
    },{
      data: "mask",
      title: "目的掩码",
      filter:{
        type: 'input'
      }
    },{
      data: "gateway",
      title: "网关地址",
      filter:{
        type: 'input'
      }
    },{
      data: "metric",
      title: "metric",
      filter:{
        type: 'input'
      }
    },{
      data: "mark",
      title: "标志",
      filter:{
        type: 'input'
      }
    },{
      data: "interface",
      title: "接口",
      filter:{
        type: 'input'
      }
    }]
  })),
};