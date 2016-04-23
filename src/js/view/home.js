var tpl = _.template(require('./home.html'));
module.exports = {
  view: Backbone.View.extend({
    initialize: function(){
      console.log('home');
      this.render();
    },
    render: function() {
      $('#main').html(tpl());
    },
  })
};
// var Table = require('./table');
// module.exports = {
//   view: Backbone.View.extend(Table.view({
//     label: '线路',
//     toolbar: ['create'],
//     batch: ['update','delete'],
//     operation: ['watch','update','delete'],
//     url:{
//       list: 'router/connector/l2tp-table.json',
//       create: 'create',
//       update: 'update',
//     },
//     columnsPure:[
//       {
//         data: "name",
//         title: "线路名称"
//       },{
//         data: "netport",
//         title: "网络接口"
//       },{
//         data: "model",
//         title: "型号"
//       },{
//         data: "mac",
//         title: "MAC地址"
//       },{
//         data: "status",
//         title: "状态",
//         render: function(data, type, full, meta) {
//           var status = data?'启用':'禁用';
//           return status+'/'+full.speed+'/'+full.mode;
//         }
//       },{
//         data: "ip",
//         title: "IP地址"
//       },{
//         data: "extendIp",
//         title: "扩展IP"
//       }
//     ]
//   })),
// };