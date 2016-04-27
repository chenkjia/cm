var Table = require('../table');
var operationTpl = require('../table/operation.html');
module.exports = {
  view: Backbone.View.extend(Table.view({
    name: '住户管理',
    label: '住户',
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
        title: "住户名称",
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