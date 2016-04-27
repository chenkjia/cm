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
      list: 'classes/dev',
      create: 'classes/dev',
      update: 'classes/dev',
      delete: 'classes/dev',
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
        create: true,
        update: true,
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
      }
    ],
    customEvents:{},
    cuntomOperation:[],
    customFunctions:{
    },
  })),
};