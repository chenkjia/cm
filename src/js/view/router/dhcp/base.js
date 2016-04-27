var Form = require('../../form');
module.exports = {
  view: Backbone.View.extend(Form.view({
    url:{
      read: '/router/dhcp/base-form.json',
      create: 'create',
      update: '/router/dhcp/base-submit',
    },
    form:['switch'],
    columnsPure:[{
      data: "enable",
      title: "DHCP启用状态",
      form:{
        type: 'switch'
      },
      options:[{
        label:'启用',color:"success",value:"1"
      },{
        label:'禁用',color:"danger",value:"0"
      }]
    },{
      data: "bind",
      title: "绑定IP与MAC",
      form:{
        type: 'switch',
        help: '给客户端分配IP之后，自动绑定IP和MAC'
      },
      options:[{
        label:'自动绑定',color:"success",value:"1"
      },{
        label:'不自动绑定',color:"danger",value:"0"
      }]
    }]
  })),
};