var Table = require('../table');
var operationTpl = require('../table/operation.html');
module.exports = {
  view: Backbone.View.extend(Table.view({
    name: '区域管理',
    label: '区域',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    url:{
      list: 'classes/area',
      create: 'classes/area',
      update: 'classes/area',
      delete: 'classes/area',
    },
    popup:{
      size: null
    },
    filter:{
      select:true
    },
    columnsPure:[
      {
        data: "name",
        title: "区域名称",
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
      },{
        data: "address",
        title: "地址",
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
      },{
        data: "remark",
        title: "备注",
        defaultContent: '',
        popup:{
          modal: ['create','update'],
          type: 'input'
        },
        filter:{
          type: 'input'
        }
      }
    ],
    customEvents:{},
    customOperation:[],
    customFunctions:{
    },
  })),
};